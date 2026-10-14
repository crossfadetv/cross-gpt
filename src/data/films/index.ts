// =========================================================================
// Film-Verzeichnis
//
// Neuen Film anlegen:
//   1. `aliens.ts` kopieren, z.B. nach `meinfilm.ts`, und Inhalte anpassen.
//   2. Unten importieren und in `films` eintragen.
//   3. Aufrufen mit http://localhost:3000/?film=meinfilm
//
// Ohne `?film=` wird `defaultFilmId` verwendet.
// =========================================================================

import { aliens } from "./aliens";
import type { Film } from "./types";

export const films: Record<string, Film> = {
	aliens,
};

export const defaultFilmId = "aliens";

export function getFilm(id: string | undefined): Film | undefined {
	return films[id ?? defaultFilmId];
}
