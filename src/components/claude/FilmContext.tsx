"use client";

import { createContext, useContext } from "react";
import { getFilm } from "@/data/films";
import type { Film } from "@/data/films/types";

const FilmContext = createContext<Film | null>(null);

export function FilmProvider({
	filmId,
	children,
}: {
	filmId: string;
	children: React.ReactNode;
}) {
	const film = getFilm(filmId);
	if (!film) throw new Error(`Unbekannter Film: ${filmId}`);
	return <FilmContext.Provider value={film}>{children}</FilmContext.Provider>;
}

export function useFilm(): Film {
	const film = useContext(FilmContext);
	if (!film) throw new Error("useFilm muss innerhalb von FilmProvider stehen");
	return film;
}
