import { Button } from "@/components/ui/CardButton";
import { Badge } from "@/components/ui/CategoryBadge";
import {
	Card,
	CardContent,
	CardFooter,
} from "@/components/ui/PhotographerCard";
import supabase from "@/lib/supabase/server";
import { IProfile } from "@/types/photographer.type";
import { getSupabaseImageUrl } from "@/lib/utils";
import { ArrowRightIcon, StarIcon } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Explore Fotografer Profesional",
	description:
		"Jelajahi galeri fotografer berbakat dari berbagai kategori dan lokasi di seluruh Indonesia. Temukan gaya yang paling sesuai dengan kebutuhan Anda.",
	keywords:
		"explore fotografer, galeri fotografer, portofolio fotografer, cari fotografer, fotografer Indonesia, fotografer pernikahan, fotografer fashion, fotografer produk",
};

async function getPhotographers(page: number, perPage: number) {
	const from = (page - 1) * perPage;
	const to = from + perPage - 1;

	const { data, error, count } = await supabase
		.from("profiles")
		.select(
			`
        *,
        photographer_profiles (
            *,
            photographer_categories (
                *,
                categories (id, slug, name)
            )
        )
    `,
			{ count: "exact" }
		)
		.eq("is_photographer", true)
		.range(from, to);

	if (error) {
		console.error("Error fetching photographers:", error);
		return { data: [], count: 0 };
	}

	return { data: data as IProfile[], count: count || 0 };
}
export default async function ExplorePage({
  	searchParams,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  searchParams?: any
}) {
	const perPage = 8;
	const page =
		typeof searchParams?.page === "string" ? parseInt(searchParams.page) : 1;
	const { data: photographers, count } = await getPhotographers(page, perPage);
	const totalPages = Math.ceil(count / perPage);

	return (
		<>
			<div className="flex flex-col justify-center items-center bg-black pt-[140px] pb-20 text-white w-full">
				<div className="flex flex-col w-[678px] gap-6 justify-center items-center">
					<h1 className="text-[40px] font-normal text-center">
						Temukan Fotografer Terbaik untuk Momen Spesial Anda
					</h1>
					<span className="w-[600px] text-center">
						Jelajahi fotografer berpengalaman dari berbagai kategori dan lokasi.
						Bandingkan, pilih, dan booking dengan mudah.
					</span>
				</div>
			</div>
			<div className="flex flex-col w-full gap-20 px-10 py-20 justify-center max-w-[1440px]">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					{photographers &&
						photographers.map((photographer) => (
							<Link
								href={`/photographer/${photographer.id}`}
								key={photographer.id}
							>
								<Card className="relative flex flex-col h-[500px] items-center justify-between p-4 flex-1 rounded-[32px] overflow-hidden border-8 border-solid border-[#f2f2f2]">
									<Image
										src={
											getSupabaseImageUrl(photographer.avatar_url) ||
											"/assets/image/john-cena.jpg"
										}
										alt={`Foto profil ${photographer.full_name}`}
										fill
										style={{ objectFit: "cover" }}
										className="z-0"
									/>
									<div className="z-10 w-full h-full flex flex-col justify-between">
										<CardContent className="flex items-start gap-1 p-0 w-full">
											{photographer.photographer_profiles.photographer_categories.map(
												(category, index) => (
													<Badge
														key={index}
														className="bg-[#ffffff2b] text-white border border-solid border-white backdrop-blur-[10px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(10px)_brightness(100%)]"
														variant="outline"
													>
														<span className="[font-family:'Geist',Helvetica] font-normal text-xs leading-[18px]">
															{category.categories.slug}
														</span>
													</Badge>
												)
											)}
										</CardContent>

										<CardFooter className="flex flex-col items-start gap-4 pt-4 pb-3 px-5 w-full bg-[#ffffff03] rounded-[20px] backdrop-blur-[10px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(10px)_brightness(100%)]">
											<div className="flex flex-col items-start gap-1 w-full">
												<div className="[font-family:'Geist',Helvetica] font-medium text-white text-base leading-6 whitespace-nowrap">
													{photographer.full_name}
												</div>

												<div className="flex items-center gap-3 w-full">
													<div className="inline-flex items-center gap-1">
														<StarIcon className="w-5 h-5 text-[#bebebd]" />
														<div className="[font-family:'Geist',Helvetica] font-normal text-[#bebebd] text-sm leading-6 whitespace-nowrap">
															{
																photographer.photographer_profiles
																	.location
															}
														</div>
													</div>
												</div>
											</div>

											<div className="flex items-center justify-between w-full">
												<div className="inline-flex items-center gap-2">
													<div className="[font-family:'Geist',Helvetica] font-normal text-[#bebebd] text-sm leading-6 whitespace-nowrap">
														Mulai dari
													</div>

													<div className="[font-family:'Geist',Helvetica] font-medium text-white text-base leading-7 whitespace-nowrap">
														{
															photographer.photographer_profiles
																.hourly_rate
														}
													</div>
												</div>

												<Button
													size="icon"
													variant="outline"
													className="p-2 rounded-full border border-solid border-white bg-transparent"
												>
													<ArrowRightIcon className="w-5 h-5 text-white" />
												</Button>
											</div>
										</CardFooter>
									</div>
								</Card>
							</Link>
						))}
				</div>
				<div className="flex justify-center gap-2 pt-10">
					{Array.from({ length: totalPages }).map((_, i) => (
						<Link
							href={`/explore?page=${i + 1}`}
							key={i}
							className={`px-3 py-1 rounded-full ${
								page === i + 1 ? "bg-black text-white" : "bg-gray-200"
							}`}
						>
							{i + 1}
						</Link>
					))}
				</div>
			</div>
		</>
	);
}
