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
	{ id: "2", title: "Kameraeinstellungen" },
	{ id: "3", title: "Rechercheliste: Zeitgeist der 80er" },
	{ id: "4", title: "Charakterprofil" },
	{ id: "5", title: "Locations in Berlin für Außenaufnahmen" },
	{ id: "6", title: "Budgetplanung Staffel 1" },
	{ id: "7", title: "Soundtrack-Ideen für die Eröffnungsszene" },
	{ id: "8", title: "Kostümreferenzen Film Noir" },
	{ id: "9", title: "Produktionsplan KW 42" },
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
	modelTier: "Medium",
	planLabel: "Gratis-Tarif",
	upgradeLabel: "Upgrade",
};
