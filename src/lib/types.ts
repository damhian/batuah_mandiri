export interface CompanyProfile {
	id: string;
	vision_statement: string;
	mission_statement: string;
	about_us_body: string;
	years_of_experience: number;
	active_projects_count: number;
	hero_video_youtube_url: string;
}

export interface TeamMember {
	id: string;
	name: string;
	role_title: string;
	bio: string;
	profile_image_url: string;
	display_order: number;
}

export interface Testimonial {
	id: string;
	client_name: string;
	client_company: string;
	quote_text: string;
	client_photo_url: string;
	is_published: boolean;
}
