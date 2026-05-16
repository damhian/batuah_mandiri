import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import nodemailer from 'nodemailer';
import { env } from '$env/dynamic/private';

export const actions: Actions = {
	default: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const identity = formData.get('identity') as string;
		const email = formData.get('email') as string;
		const subject = formData.get('subject') as string;
		const requirements = formData.get('requirements') as string;

		if (!identity || !email || !requirements || !subject) {
			return fail(400, { 
				message: 'ALL TRANSMISSION FIELDS ARE REQUIRED',
				error: true 
			});
		}

		// Inject subject into requirements so we don't break the existing DB schema
		const fullRequirements = `[SUBJECT: ${subject.toUpperCase()}]\n\n${requirements}`;

		const { error } = await supabase
			.from('contact_submissions')
			.insert({
				sender_identity: identity,
				sender_email: email,
				requirements: fullRequirements
			});

		if (error && error.code !== '42P01') {
			console.error('Submission Error:', error);
			return fail(500, { 
				message: 'SYSTEM MALFUNCTION: UNABLE TO STORE TRANSMISSION',
				error: true 
			});
		}

		// Email Dispatch via Nodemailer
		try {
			if (env.SMTP_USER && env.SMTP_PASS) {
				const transporter = nodemailer.createTransport({
					host: env.SMTP_HOST || 'smtp.gmail.com',
					port: parseInt(env.SMTP_PORT || '587'),
					secure: env.SMTP_PORT === '465',
					auth: {
						user: env.SMTP_USER,
						pass: env.SMTP_PASS
					}
				});

				await transporter.sendMail({
					from: `"PT Batuah Mandiri" <${env.SMTP_USER}>`,
					to: ['batuah@batuahmandiri.id', 'batuahmandiripersada@gmail.com'],
					replyTo: email,
					subject: `BMP Inquiry: ${subject} - ${identity}`,
					text: `NEW PROJECT TRANSMISSION RECEIVED\n\nSUBJECT: ${subject.toUpperCase()}\nIDENTITY: ${identity}\nCOMMUNICATION PORT (EMAIL): ${email}\n\nSPECIFICATIONS:\n${requirements}\n\n---\nSent automatically from Batuah Mandiri Persada Contact Form.`
				});
			} else {
				console.warn('SMTP credentials missing in .env. Skipping email dispatch.');
			}
		} catch (mailError) {
			console.error('Email dispatch failed (Check .env SMTP settings):', mailError);
		}

		return { 
			success: true,
			message: 'TRANSMISSION RECEIVED. OUR TEAM WILL CONTACT YOU SOON.' 
		};
	}
};
