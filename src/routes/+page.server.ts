export const load = async ({ locals }) => {
  try {
    if (!locals.supabase) {
      console.error("supabase instance missing from locals");
      return {
        profile: null,
        testimonials: [],
      };
    }

    const { data: profile, error: profileError } = await locals.supabase
      .from("company_profile")
      .select("*")
      .limit(1)
      .maybeSingle();

    if (profileError) {
      console.error("Profile fetch error:", profileError.message);
    }

    const { data: testimonials, error: testimonialsError } =
      await locals.supabase
        .from("testimonials")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: false });

    if (testimonialsError) {
      console.error("Testimonials fetch error:", testimonialsError.message);
    }

    return {
      profile: profile ?? null,
      testimonials: testimonials ?? [],
    };
  } catch (error) {
    console.error("Fatal Server Load Error:", error);
    return {
      profile: null,
      testimonials: [],
    };
  }
};
