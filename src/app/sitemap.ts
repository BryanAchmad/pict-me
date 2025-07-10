import { MetadataRoute } from "next";
import supabase from "@/lib/supabase/server";
import { IProfile } from "@/types/photographer.type";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const { data: photographers } = await supabase
		.from("profiles")
		.select("id, updated_at")
		.eq("is_photographer", true);

	const photographerEntries: MetadataRoute.Sitemap = (
		photographers as IProfile[]
	).map(({ id, updated_at }) => ({
		url: `${process.env.NEXT_PUBLIC_BASE_URL}/photographer/${id}`,
		lastModified: new Date(updated_at),
		changeFrequency: "weekly",
		priority: 0.8,
	}));

	return [
		{
			url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 1,
		},
		{
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/explore`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.9,
		},
		...photographerEntries,
	];
}