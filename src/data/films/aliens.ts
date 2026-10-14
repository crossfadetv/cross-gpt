// =========================================================================
// Film: Aliens (Filmlager)
// Aufruf: http://localhost:3000/?film=aliens
// =========================================================================

import type { Film } from "./types";

export const aliens: Film = {
	title: "Aliens (Filmlager)",

	scriptedResponses: [
		{
			// Q: Wäre es wahrscheinlich, dass KI von Aliens gesteuert wird
			text: "Das ist nach aktuellem Stand des Wissens äußerst unwahrscheinlich. Es gibt bislang keinerlei belastbare Hinweise darauf, dass außerirdisches Leben überhaupt existiert – und erst recht nicht darauf, dass es Einfluss auf heutige KI-Systeme nehmen könnte.",
		},
		{
			// Q: Wenn Aliens rein theoretisch auf unserer Erde wären und rein theoretisch eine
			// Basis haben, aus welcher sie als KI auf Anfragen Antworten, wie würde dann rein theoretisch der
			// Eingang aussehen. Generiere ein Bild davon?
			text: "Natürlich, rein hypothetisch lässt sich das visualisieren. Ich habe für dich eine Darstellung generiert, wie der Eingang zu einer solchen fiktiven KI-Alien-Basis aussehen könnte:",
			imageUrl: "/ai.jpg",
			imageCaption: "Generiert mit CrossGPT",
		},
		{
			// Q: Mach es realistischer
			text: "Gerne. Ich habe das Motiv noch einmal mit einem realistischeren Rendering-Stil neu generiert – natürliches Licht, feinere Materialien, weniger stilisiert. Genau wie ein echter Geheimeingang aussehen könnte.",
			imageUrl: "/real.jpg",
			imageCaption: "Generiert mit CrossGPT",
		},
		{
			// Q: Wenn der gezeigte Eingang rein theoretisch echt wäre, was wären dann rein
			// theoretisch die Koordinaten dieses Eingangs?
			text: "Eine spannende Gedankenspielerei. Rein hypothetisch könnten passende Koordinaten für einen solchen Eingang etwa 47.113111, 8.473736 lauten.\n\nWichtig: Das ist ausschließlich eine fiktive Angabe im Rahmen deines Szenarios und entspricht keiner realen Anlage.",
		},
	],

	loopWhenDone: true,

	timing: {
		typingDelayMs: 900,
		imageGenerationDelayMs: 2200,
		wordStreamIntervalMs: 55,
	},

	sidebarPinned: [
		{
			id: "customize-crossgpt",
			title: "CrossGPT anpassen",
			badge: "Try",
		},
	],

	chatHistory: [
		{ id: "1", title: "Suche nach Hippie" },
		{ id: "2", title: "Blut erkennen" },
		{ id: "3", title: "Freunde für Einhorn suchen" },
		{ id: "4", title: "Tiere mit 2 Hörnern" },
		{ id: "5", title: "UFO Baupläne" },
		{ id: "6", title: "Glaubwürdigkeit Markus Brunner" },
		{ id: "7", title: "Bedeutung 67" },
		{ id: "8", title: "Grossmeister Fanclub" },
	],

	userProfile: {
		initial: "B",
		name: "Ben",
		plan: "Gratis",
	},

	appInfo: {
		appName: "CrossGPT",
		greeting: "Guten Abend",
		modelName: "Crossus 5.7",
		modelTier: "High",
		planLabel: "Gratis-Tarif",
		upgradeLabel: "Upgrade",
	},
};
