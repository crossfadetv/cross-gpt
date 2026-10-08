// Chat-Historie für die CrossGPT Film-Requisite.
// Einfach die Einträge in `chatHistory` anpassen oder neue hinzufügen.
// `pinned` steht ganz oben in der Sidebar.

export type ChatEntry = {
	id: string;
	title: string;
	pinned?: boolean;
	badge?: string; // optionaler Tag wie "Neu", "Try", ...
};

export const sidebarPinned: ChatEntry[] = [
	{
		id: "customize-crossgpt",
		title: "CrossGPT anpassen",
		badge: "Try",
	},
];

export const chatHistory: ChatEntry[] = [
	{ id: "1", title: "Suche nach Hippie" },
	{ id: "2", title: "Blut erkennen" },
	{ id: "3", title: "Freunde für Einhorn suchen" },
	{ id: "4", title: "Tiere mit 2 Hörnern" },
	{ id: "5", title: "UFO Baupläne" },
	{ id: "6", title: "Glaubwürdigkeit Markus Brunner" },
	{ id: "7", title: "Bedeutung 67" },
	{ id: "8", title: "Grossmeister Fanclub" },
];

export const userProfile = {
	initial: "B",
	name: "Ben",
	plan: "Gratis",
};

export const appInfo = {
	appName: "CrossGPT",
	greeting: "Guten Abend",
	modelName: "Crossus 5.7",
	modelTier: "High",
	planLabel: "Gratis-Tarif",
	upgradeLabel: "Upgrade",
};
