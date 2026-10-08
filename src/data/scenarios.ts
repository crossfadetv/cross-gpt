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
		text: "Klar, ich helfe dir gerne. Erzähl mir mehr über dein Projekt.",
	},
	{
		text: "Spannend! Hier sind drei erste Ideen, mit denen wir arbeiten können:\n\n1. Ein ruhiger, atmosphärischer Einstieg\n2. Ein harter Schnitt mitten in die Action\n3. Eine Rückblende aus Sicht einer Nebenfigur\n\nWelche Richtung spricht dich an?",
	},
	{
		text: "Perfekt. Ich entwerfe dir dazu ein Stimmungsbild – einen Moment bitte, ich generiere es für dich.",
		imageUrl:
			"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80",
		imageCaption: "Generiert mit CrossGPT · Stimmungsbild",
	},
	{
		text: 'Was den Dialog betrifft: Halte die ersten Sätze kurz. Der Protagonist sollte nicht erklären, sondern andeuten. Zum Beispiel: "Du bist zu spät." – "Ich weiß."',
	},
	{
		text: "Hier noch eine zweite Bildvariante, falls dir die erste zu düster war:",
		imageUrl:
			"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900&q=80",
		imageCaption: "Generiert mit CrossGPT · Alternative",
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
