import supabase from "@/lib/supabase/server";
import { IProfile } from "@/types/photographer.type";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getSupabaseImageUrl } from "@/lib/utils";

type Props = {
	params: { id: string };
};

async function getPhotographer(id: string): Promise<IProfile | null> {
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
		.eq("is_photographer", true)
		.single();

	if (error || !data) {
		console.error("Error fetching photographer:", error);
		return null;
	}

	return data as IProfile;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { id } = params;
	const photographer = await getPhotographer(id);

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
			images: [
				{
					url:
						getSupabaseImageUrl(photographer.avatar_url) ||
						"/og-image.jpg",
					width: 800,
					height: 600,
					alt: `Foto profil ${photographer.full_name}`,
				},
			],
		},
	};
}

export default async function PhotographerPage({ params }: Props) {
	const { id } = params;
	const photographer = await getPhotographer(id);

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
					<h1 className="text-4xl font-bold mb-2">{photographer.full_name}</h1>
					<p className="text-lg text-gray-600 mb-4">
						{photographer.photographer_profiles.location}
					</p>
					<div className="flex flex-wrap gap-2 mb-4">
						{photographer.photographer_profiles.photographer_categories.map(
							(cat) => (
								<span
									key={cat.categories.id}
									className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm"
								>
									{cat.categories.name}
								</span>
							)
						)}
					</div>
					<div className="prose max-w-none">
						<p>{photographer.photographer_profiles.bio}</p>
					</div>
					<div className="mt-6">
						<h3 className="text-2xl font-semibold mb-2">Layanan</h3>
						<p>{photographer.photographer_profiles.services_offered}</p>
					</div>
					<div className="mt-6">
						<h3 className="text-2xl font-semibold mb-2">Hubungi</h3>
						<p>Email: {photographer.email}</p>
						<p>Telepon: {photographer.phone_number}</p>
					</div>
					<div className="mt-6">
						<a
							href={photographer.photographer_profiles.portfolio_url}
							target="_blank"
							rel="noopener noreferrer"
							className="text-blue-600 hover:underline"
						>
							Lihat Portofolio
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}