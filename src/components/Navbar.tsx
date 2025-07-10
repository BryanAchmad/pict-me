// components/Navbar.tsx
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import ButtonIcon from "@/assets/icons/Left.svg";
import Link from "next/link";

interface NavbarProps {
	transparentOnTopOnly?: boolean;
}

export default function Navbar({ transparentOnTopOnly = false }: NavbarProps) {
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		if (!transparentOnTopOnly) return;

		const handleScroll = () => {
			console.log("window.scrollY", window.scrollY); // 👈 debug
			setIsScrolled(window.scrollY > 50);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [transparentOnTopOnly]);

	const backgroundClass = transparentOnTopOnly
		? isScrolled
			? "bg-black shadow-md text-[#FFFFFF]"
			: "bg-transparent"
		: "bg-black text-white";

	return (
		<header
			className={`
                fixed w-full top-0 left-0 z-50 
                transition-colors duration-300 ease-in-out
                ${backgroundClass}
            `}
		>
			<nav className="container max-w-[1440px] mx-auto flex items-center justify-between p-4">
				<a
					className="items-center justify-center sm:h-12 px-4 sm:px-5"
					href="https://vercel.com/new"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Image
						className="dark:invert"
						src="/vercel.svg"
						alt="Vercel logomark"
						width={20}
						height={20}
					/>
				</a>
				<ul className="flex space-x-4 list-none m-0 p-0 gap-10">
					<li><Link href="/">Beranda</Link></li>
					<li><Link href="/explore">Explore</Link></li>
					<li><Link href="/artikel">Artikel</Link></li>
				</ul>
				<button className="flex flex-row gap-2 px-4 py-2 rounded-[44px] bg-white">
					<Image
						src={ButtonIcon.src}
						alt="Back Icon"
						width={ButtonIcon.width}
						height={ButtonIcon.height}
					/>
					<span className="text-[16px] leading-6 font-normal text-[#000000]">
						Daftar Sebagai Fotografer
					</span>
				</button>
			</nav>
		</header>
	);
}
