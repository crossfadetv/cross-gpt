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
		text: "Perfekt. Ich entwerfe dir dazu ein Stimmungsbild – einen Moment bitte, ich generiere es für dich.",
		imageUrl: "/ai.jpg",
		imageCaption: "Generiert mit CrossGPT",
	},
	{
		text: "Hier noch eine zweite Bildvariante, falls dir die erste zu düster war:",
		imageUrl: "/real.jpg",
		imageCaption: "Generiert mit CrossGPT",
	},
	{
		text: "Zusammengefasst: Wir haben Ton, Bild und Dialog grob skizziert. Soll ich daraus ein kurzes Treatment formulieren, das du deinem Team zeigen kannst?",
	},
	{
		text: "Alles klar – ich halte das für dich fest. Melde dich, wenn wir an der nächsten Szene weiterarbeiten.",
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
