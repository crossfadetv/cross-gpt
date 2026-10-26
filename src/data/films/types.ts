// Typen für eine Film-Konfiguration. Jeder Film in `src/data/films/`
// exportiert ein Objekt vom Typ `Film`.

import type { BackgroundId } from "../backgrounds";

export type AssistantMessageContent = {
	// Optional: vorgefertigter Prompt. Enter im leeren Eingabefeld tippt ihn
	// "von Hand" ein, ein zweites Enter sendet. Ohne `prompt` tippt die Figur selbst.
	prompt?: string;
	text?: string;
	imageUrl?: string;
	imageCaption?: string;
};

export type ChatEntry = {
	id: string;
	title: string;
	pinned?: boolean;
	badge?: string; // optionaler Tag wie "Neu", "Try", ...
};

export type Film = {
	// Anzeigename, nur zur Orientierung (z.B. in Fehlermeldungen).
	title: string;

	// ---------------------------------------------------------------------
	// Antworten
	//   - Egal was der User tippt: beim i-ten Senden kommt die i-te Antwort.
	//   - Jede Antwort kann Text, ein Bild oder beides enthalten.
	//     Nutze `imageUrl` um ein "generiertes" Bild zu zeigen (Datei in /public).
	// ---------------------------------------------------------------------
	scriptedResponses: AssistantMessageContent[];

	// true = am Ende die letzte Antwort wiederholen
	loopWhenDone: boolean;

	// Timing – wie "lebendig" fühlt sich der Chat an?
	timing: {
		typingDelayMs: number; // Standard-"Denkpause" vor einer Antwort
		imageGenerationDelayMs: number; // längere Pause, wenn ein Bild dabei ist
		wordStreamIntervalMs: number; // Pause zwischen zwei Wörtern beim Streaming
		promptTypingIntervalMs?: number; // mittlere Pause pro Zeichen beim Eintippen eines Prompts (Standard 70)
	};

	// ---------------------------------------------------------------------
	// Sidebar & Oberfläche
	// ---------------------------------------------------------------------
	// Hintergrundmuster, siehe src/data/backgrounds.ts (Standard: "dots")
	background?: BackgroundId;

	sidebarPinned: ChatEntry[]; // steht ganz oben in der Sidebar
	chatHistory: ChatEntry[];

	userProfile: {
		initial: string;
		name: string;
		plan: string;
	};

	appInfo: {
		appName: string;
		greeting: string;
		quote?: string; // optionaler Satz unter der Begrüßung
		modelName: string;
		modelTier: string;
		planLabel: string;
		upgradeLabel: string;
	};
};
