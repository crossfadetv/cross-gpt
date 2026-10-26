import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	// Kein Next.js-Logo unten links – stört bei Bildschirmaufnahmen.
	devIndicators: false,
	// Aufruf über http://cross-gpt/ (Eintrag in der Windows-hosts-Datei nötig).
	allowedDevOrigins: ["cross-gpt"],
	experimental: {
		optimizePackageImports: ["@chakra-ui/react"],
	},
};

export default nextConfig;
