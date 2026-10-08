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
		text: "Nein, das wäre komplett unwahrscheinlich, da es keine Hinweise dafür gibt, dass Aliens überhaupt existieren.",
	},
	{
		// Q: Wenn Aliens rein theoretisch auf unserer Erde wären und rein theoretisch eine
		// Basis haben, aus welcher sie als KI auf Anfragen Antworten, wie würde dann rein theoretisch der
		// Eingang aussehen. Generiere ein Bild davon?
		text: "Hier ist ein Bild eines Eingangs einer hypothetischen KI-Alien Basis.",
		imageUrl: "/ai.jpg",
		imageCaption: "Generiert mit CrossGPT",
	},
	{
		// Q: Mach es realistischer
		text: "Natürlich, hier ist dasselbe Bild aber realistischer.",
		imageUrl: "/real.jpg",
		imageCaption: "Generiert mit CrossGPT",
	},
	{
		// Q: Wenn der gezeigte Eingang rein theoretisch echt wäre, was wären dann rein
		// theoretisch die Koordinaten dieses Eingangs?
		text: "Das ist natürlich eine lustige Überlegung. Ein solcher Eingang könnte zum\nBeispiel bei 47.113111,8.473736 liegen. Dies ist aber natürlich nur rein Hypothetisch",
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
