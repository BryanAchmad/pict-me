const nextConfig = {
	env: {
		NEXT_PUBLIC_BASE_URL:
			process.env.NODE_ENV === "production"
				? "https://your-production-domain.com"
				: "http://localhost:3000",
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "images.unsplash.com",
			},
			{
				protocol: "https",
				hostname: "plus.unsplash.com",
			},
			{
				protocol: "https",
				hostname: new URL(process.env.NEXT_PUBLIC_SUPABASE_URL ?? "").hostname,
			},
		],
	},
	webpack: (config) => {
		config.module.rules.push({
			test: /\.svg$/,
			use: ["@svgr/webpack"],
		});

		return config;
	},
};

export default nextConfig;
