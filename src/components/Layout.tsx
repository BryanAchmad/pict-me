// components/Layout.tsx
"use client";

import Navbar from "@/components/Navbar";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: ReactNode }) {
	const pathname = usePathname();
	const isHomePage = pathname === "/";

	return (
		<div className="bg-white flex flex-col items-center w-full min-h-screen">
			<div className="bg-white w-full">
				<Navbar transparentOnTopOnly={isHomePage} />
				<main className="flex flex-col justify-center items-center w-full">{children}</main>
				<footer className="flex flex-wrap p-10 justify-between">
					© 2025 Logo Foto. Semua hak dilindungi undang-undang
				</footer>
			</div>
		</div>
	);
}
