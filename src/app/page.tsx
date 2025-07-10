import { ArrowRightIcon, StarIcon } from "lucide-react";
import {
	Card,
	CardContent,
	CardFooter,
} from "@/components/ui/PhotographerCard";
import { Badge } from "@/components/ui/CategoryBadge";
import { Button } from "@/components/ui/CardButton";
import supabase from "@/lib/supabase/server";
import { IProfile } from "@/types/photographer.type";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getSupabaseImageUrl } from "@/lib/utils";

async function getPhotographers() {
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
		.eq("is_photographer", true);

	if (error) {
		console.error("Error fetching photographers:", error);
		return [];
	}

	return data as IProfile[];
}

export const metadata: Metadata = {
	title: "Temukan Fotografer Terbaik di Indonesia | Logo Foto",
	description:
		"Pilih dari ribuan fotografer berbakat di seluruh Indonesia. Lihat portofolio, bandingkan harga, dan booking jasa fotografi untuk berbagai acara dengan mudah.",
	keywords:
		"fotografer, jasa fotografi, fotografer pernikahan, fotografer prewedding, fotografer produk, cari fotografer, booking fotografer, Indonesia",
};

export default async function Home() {
	const photographers = await getPhotographers();

	return (
		<>
			<div className="relative w-full">
				{/* 1) Video sizes the wrapper (w-full + h-auto) */}
				<video
					className="w-full h-svh object-cover"
					src="/assets/video/hero.mp4"
					autoPlay
					muted
					loop
				/>

				{/* 3) Your content, absolute fill = same height as video */}
				<div className="absolute inset-0 z-10 flex flex-row justify-between items-end text-center px-10 pb-[46px]">
					<div className="max-w-[645px] font-normal text-start text-white text-[64px] tracking-[-1px] leading-[76px]">
						Pilih Fotografer Terbaikmu
					</div>
					<div className="flex flex-col items-start gap-6 max-w-[444px]">
						<p className="text-[#efefef] font-normal text-xl leading-8 text-start">
							Terhubunglah dengan fotografer berbakat untuk berbagai acara,
							mulai dari pernikahan hingga potret. Telusuri portofolio,
							bandingkan harga, dan pesan sesi Anda dengan mudah.
						</p>
						<a
							href="#get-started"
							className="inline-block bg-background hover:bg-blue-700 text-foreground font-normal py-3 px-6 rounded-[44px] transition"
						>
							Cari Fotografer
						</a>
					</div>
				</div>
			</div>
			<div className="flex flex-col w-full gap-20 px-10 py-20 justify-center max-w-[1440px]">
				<div className="flex justify-between w-full">
					<h4 className="w-fit h-fit leading-9 tracking-normal">
						[Fotografer Pilihan Kami]
					</h4>
					<div className="flex flex-col w-[500px] text-wrap p-0 gap-4">
						<h2 className="font-[400] text-[36px] tracking-[0.1px] leading-[48px]">
							Jasa Fotografi yang Terpercaya & Terjangkau
						</h2>
						<span className="text-xl leading-7 tracking-[0.2px] font-[400] text-[#91939B]">
							Bandingkan harga, lihat portofolio, dan booking dengan mudah.
							Semua fotografer telah diverifikasi.
						</span>
					</div>
				</div>
				<div className="flex items-center gap-5 w-full">
					{photographers &&
						photographers.map((photographer) => (
							<Link
								href={`/photographer/${photographer.id}`}
								key={photographer.id}
								className="flex-1"
							>
								<Card className="relative flex flex-col h-[500px] items-center justify-between p-4 rounded-[32px] overflow-hidden border-8 border-solid border-[#f2f2f2]">
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

													<div className="[font-family:'Geist',Helvetica] font-normal text-[#bebebd] text-xl leading-6 whitespace-nowrap">
														•
													</div>

													<div className="[font-family:'Geist',Helvetica] font-normal text-[#bebebd] text-sm leading-6 whitespace-nowrap">
														{
															photographer.photographer_profiles
																.location
														}
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
			</div>
			<div className="flex flex-col bg-[#F8FAFB] py-20 px-10 gap-20 max-w-[1440px]">
				<div className="flex flex-col gap-6 w-[524px]">
					<h4 className="font-normal text-[40px] leading-[52px]">
						Cara Booking Fotografer
					</h4>
					<span className="text-[#91939B] text-xl font-normal">
						Booking fotografer kini lebih mudah! Ikuti langkah-langkah
						berikut untuk menemukan dan memesan fotografer sesuai
						kebutuhanmu:
					</span>
				</div>
				<div className="grid grid-cols-3 gap-x-[24px]">
					<div className="flex flex-col px-10 py-8 gap-8 rounded-3xl bg-white">
						<div className="border rounded-full h-[52px] w-[52px] flex items-center justify-center">
							<h2 className="text-2xl leading-7 font-normal">1</h2>
						</div>
						<div className="flex flex-col gap-3">
							<h3 className="text-[24px] leading-8 font-normal">
								Telusuri Daftar Fotografer
							</h3>
							<span className="text-[18px] text-[#91939B] leading-[26px] font-normal">
								Lihat daftar fotografer. Setiap fotografer memiliki
								informasi lengkap tentang lokasi, keahlian, dan gaya foto.
							</span>
						</div>
					</div>
					<div className="flex flex-col px-10 py-8 gap-8 rounded-3xl bg-white">
						<div className="border rounded-full h-[52px] w-[52px] flex items-center justify-center">
							<h2 className="text-2xl leading-7 font-normal">2</h2>
						</div>
						<div className="flex flex-col gap-3">
							<h3 className="text-[24px] leading-8 font-normal">
								Cek Paket & Portofolio
							</h3>
							<span className="text-[18px] text-[#91939B] leading-[26px] font-normal">
								Buka halaman detail untuk melihat paket harga, jenis
								layanan, dan contoh hasil foto dari masing-masing
								fotografer.{" "}
							</span>
						</div>
					</div>
					<div className="flex flex-col px-10 py-8 gap-8 rounded-3xl bg-white">
						<div className="border rounded-full h-[52px] w-[52px] flex items-center justify-center">
							<h2 className="text-2xl leading-7 font-normal">3</h2>
						</div>
						<div className="flex flex-col gap-3">
							<h3 className="text-[24px] leading-8 font-normal">
								Hubungi & Booking
							</h3>
							<span className="text-[18px] text-[#91939B] leading-[26px] font-normal">
								Klik tombol &quot;Hubungi&quot; untuk mulai ngobrol, tanya
								ketersediaan, dan lanjutkan proses booking sesuai
								kebutuhanmu.
							</span>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
