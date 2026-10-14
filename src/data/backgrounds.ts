// =========================================================================
// Hintergrundmuster für den Hauptbereich. Ein Film wählt eines über
// `background` in seiner Film-Datei aus.
//
// Muster bewusst grob halten: feine Linien/Punkte flimmern im Video (Moiré).
// =========================================================================

import type { CSSProperties } from "react";

export type BackgroundId = "plain" | "dots";

// Leichtes rotes Leuchten hinter der Begrüßung, passend zum roten Punkt.
const redGlow =
	"radial-gradient(ellipse 60% 45% at 50% 30%, rgba(255, 60, 40, 0.07), transparent 70%)";

export const backgrounds: Record<BackgroundId, CSSProperties> = {
	plain: {},
	dots: {
		backgroundImage: [
			redGlow,
			"radial-gradient(rgba(255, 255, 255, 0.07) 1.5px, transparent 1.5px)",
		].join(", "),
		backgroundSize: "100% 100%, 28px 28px",
	},
};
