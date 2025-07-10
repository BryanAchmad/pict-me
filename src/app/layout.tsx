import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Layout from "@/components/Layout";

const geistSans = Geist({
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
	title: {
		default: "Logo Foto - Temukan Fotografer Profesional",
		template: "%s | Logo Foto",
	},
	description:
		"Platform untuk menemukan dan memesan fotografer profesional di seluruh Indonesia untuk berbagai acara, mulai dari pernikahan, prewedding, event, hingga produk.",
	keywords: [
		"fotografer",
		"jasa foto",
		"fotografer profesional",
		"fotografer pernikahan",
		"fotografer prewedding",
		"fotografer event",
		"fotografer produk",
		"booking fotografer",
		"platform fotografer",
		"Indonesia",
	],
	authors: [{ name: "Logo Foto Team" }],
	openGraph: {
		title: "Logo Foto - Temukan Fotografer Profesional",
		description:
			"Temukan dan pesan fotografer terbaik untuk momen spesial Anda.",
		url: "https://your-domain.com", // Ganti dengan domain Anda
		siteName: "Logo Foto",
		images: [
			{
				url: "https://your-domain.com/og-image.jpg", // Ganti dengan URL gambar OG Anda
				width: 1200,
				height: 630,
			},
		],
		locale: "id_ID",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Logo Foto - Temukan Fotografer Profesional",
		description:
			"Temukan dan pesan fotografer terbaik untuk momen spesial Anda.",
		// siteId: "YourTwitterSiteID", // Ganti dengan ID Twitter Anda
		// creator: "@YourTwitterHandle", // Ganti dengan handle Twitter Anda
		// creatorId: "YourTwitterCreatorID", // Ganti dengan ID kreator Twitter Anda
		images: ["https://your-domain.com/twitter-image.jpg"], // Ganti dengan URL gambar Twitter Anda
	},
	robots: {
		index: true,
		follow: true,
		nocache: true,
		googleBot: {
			index: true,
			follow: true,
			noimageindex: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={`${geistSans.className} ${geistMono.variable}`}>
			<body>
				<Layout>{children}</Layout>
			</body>
		</html>
	);
}
