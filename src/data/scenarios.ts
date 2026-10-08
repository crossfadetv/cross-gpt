// =========================================================================
// Antwort-Szenarien für die CrossGPT Film-Requisite.
//
// Funktionsweise:
//   - `scriptedResponses` ist eine Liste von Antworten.
//   - Egal was der User tippt: beim i-ten Senden kommt die i-te Antwort.
//   - Jede Antwort kann Text, ein Bild oder beides enthalten.
//     Nutze `imageUrl` um ein "generiertes" Bild zu zeigen.
//   - Ist das Ende erreicht, wird die letzte Antwort wiederholt
//     (siehe `loopWhenDone`).
// =========================================================================

export type AssistantMessageContent = {
	text?: string;
	imageUrl?: string;
	imageCaption?: string;
};

// -------------------------------------------------------------------------
// Die Reihenfolge der Antworten – hier anpassen für die Szene.
// -------------------------------------------------------------------------
export const scriptedResponses: AssistantMessageContent[] = [
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
];

// -------------------------------------------------------------------------
// Verhalten, wenn die Liste zu Ende ist.
// -------------------------------------------------------------------------
export const loopWhenDone = true; // true = letzte Antwort wiederholen

// -------------------------------------------------------------------------
// Timing – wie "lebendig" fühlt sich der Chat an?
// -------------------------------------------------------------------------
export const timing = {
	typingDelayMs: 900, // Standard-"Denkpause" vor einer Antwort
	imageGenerationDelayMs: 2200, // längere Pause, wenn ein Bild dabei ist
	wordStreamIntervalMs: 55, // Pause zwischen zwei Wörtern beim Streaming
};
