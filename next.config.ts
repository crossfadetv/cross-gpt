import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	// Kein Next.js-Logo unten links – stört bei Bildschirmaufnahmen.
	devIndicators: false,
	experimental: {
		optimizePackageImports: ["@chakra-ui/react"],
	},
};

export default nextConfig;
