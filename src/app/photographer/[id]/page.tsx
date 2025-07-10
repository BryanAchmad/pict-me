/* eslint-disable @typescript-eslint/no-explicit-any */
import supabase from "@/lib/supabase/server";
import { IProfile } from "@/types/photographer.type";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getSupabaseImageUrl } from "@/lib/utils";
import { cache } from "react";

const getPhotographer = cache(
	async (id: string): Promise<IProfile | null> => {
		const { data, error } = await supabase
			.from("profiles")
			.select(
				`
      *,
      photographer_profiles (
        *,
        photographer_categories (
          *,
          categories (
            id,
            slug,
            name
          )
        )
      )
    `
			)
			.eq("id", id)
			.single();

		if (error) {
			console.error("Error fetching photographer:", error);
			return null;
		}

		return data as IProfile;
	}
);

type GenerateMetadataProps = {
	params: { id: string };
};

export async function generateMetadata(
	{ params }: GenerateMetadataProps
): Promise<Metadata> {
	const photographer = await getPhotographer(params.id);

	if (!photographer) {
		return {
			title: "Fotografer Tidak Ditemukan",
		};
	}

	return {
		title: `${photographer.full_name} - Fotografer Profesional`,
		description:
			photographer.photographer_profiles.bio ||
			`Portofolio dan layanan dari ${photographer.full_name}, seorang fotografer profesional.`,
		openGraph: {
			title: `${photographer.full_name} - Fotografer Profesional`,
			description:
				photographer.photographer_profiles.bio ||
				`Portofolio dan layanan dari ${photographer.full_name}.`,
		},
	};
}

type PageProps = {
	params: { id: string };
	searchParams?: Record<string, string | string[] | undefined>;
};

export default async function PhotographerPage(
	{ params }: PageProps
) {
	const photographer = await getPhotographer(params.id);

	if (!photographer) {
		notFound();
	}

	return (
		<div className="container mx-auto px-4 py-24">
			<div className="flex flex-col md:flex-row gap-8">
				<div className="md:w-1/3">
					<Image
						src={
							getSupabaseImageUrl(photographer.avatar_url) ||
							"/assets/image/john-cena.jpg"
						}
						alt={`Foto profil ${photographer.full_name}`}
						width={400}
						height={400}
						className="rounded-lg w-full h-auto"
						style={{ objectFit: "cover" }}
					/>
				</div>
				<div className="md:w-2/3">
					<h1 className="text-3xl font-bold mb-4">{photographer.full_name}</h1>
					<p className="text-gray-600 mb-6">
						{photographer.photographer_profiles.bio}
					</p>
					<div className="mb-6">
						<h2 className="text-xl font-semibold mb-2">Lokasi</h2>
						<p>{photographer.photographer_profiles.location}</p>
					</div>
					<div className="mb-6">
						<h2 className="text-xl font-semibold mb-2">Tarif per Jam</h2>
						<p>Rp {photographer.photographer_profiles.hourly_rate.toLocaleString()}</p>
					</div>
					<div className="mb-6">
						<h2 className="text-xl font-semibold mb-2">Layanan</h2>
						<p>{photographer.photographer_profiles.services_offered}</p>
					</div>
					<div className="mb-6">
						<h2 className="text-xl font-semibold mb-2">Kategori</h2>
						<div className="flex flex-wrap gap-2">
							{photographer.photographer_profiles.photographer_categories.map(
								(category) => (
									<span
										key={category.categories.id}
										className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm"
									>
										{category.categories.name}
									</span>
								)
							)}
						</div>
					</div>
					<div className="mb-6">
						<h2 className="text-xl font-semibold mb-2">Portfolio</h2>
						<a
							href={photographer.photographer_profiles.portfolio_url}
							target="_blank"
							rel="noopener noreferrer"
							className="text-blue-600 hover:underline"
						>
							Lihat Portfolio
						</a>
					</div>
					<button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
						Hubungi Fotografer
					</button>
				</div>
			</div>
		</div>
	);
}