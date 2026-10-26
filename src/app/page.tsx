import { Flex } from "@chakra-ui/react";
import type { Metadata } from "next";
import { FilmProvider } from "@/components/claude/FilmContext";
import { MainArea } from "@/components/claude/MainArea";
import { Sidebar } from "@/components/claude/Sidebar";
import { defaultFilmId, films } from "@/data/films";

async function resolveFilmId(props: PageProps<"/">) {
	const { film } = await props.searchParams;
	return typeof film === "string" ? film : defaultFilmId;
}

// Tab-Titel = App-Name des Films (z.B. "CrossGPT"), damit im Browser-Tab
// nicht die nackte Adresse steht.
export async function generateMetadata(
	props: PageProps<"/">,
): Promise<Metadata> {
	const filmId = await resolveFilmId(props);
	return { title: films[filmId]?.appInfo.appName ?? "Unbekannter Film" };
}

export default async function Home(props: PageProps<"/">) {
	const filmId = await resolveFilmId(props);

	if (!films[filmId]) {
		return (
			<div style={{ color: "#eee", fontFamily: "sans-serif", padding: 32 }}>
				<h1>Unbekannter Film: „{filmId}“</h1>
				<p>Verfügbare Filme:</p>
				<ul>
					{Object.entries(films).map(([id, f]) => (
						<li key={id}>
							<a href={`/?film=${id}`} style={{ color: "#8ab4f8" }}>
								{id}
							</a>{" "}
							– {f.title}
						</li>
					))}
				</ul>
			</div>
		);
	}

	return (
		<FilmProvider filmId={filmId}>
			<Flex h="100vh" w="100vw" bg="#262624" overflow="hidden">
				<Sidebar />
				<MainArea />
			</Flex>
		</FilmProvider>
	);
}
