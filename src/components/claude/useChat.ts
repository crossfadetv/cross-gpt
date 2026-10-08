"use client";

import { useCallback, useRef, useState } from "react";
import {
	type AssistantMessageContent,
	loopWhenDone,
	scriptedResponses,
	timing,
} from "@/data/scenarios";

export type ChatMessage = {
	id: string;
	role: "user" | "assistant";
	text?: string;
	imageUrl?: string;
	imageCaption?: string;
	// Während "generiert" wird, ist das Bild noch nicht sichtbar.
	imagePending?: boolean;
	// Nachricht wird gerade Wort für Wort gestreamt.
	streaming?: boolean;
};

function makeId() {
	return Math.random().toString(36).slice(2);
}

export function useChat() {
	const [messages, setMessages] = useState<ChatMessage[]>([]);
	const [isTyping, setIsTyping] = useState(false);
	const responseIndex = useRef(0);

	const pickNextResponse = useCallback((): AssistantMessageContent => {
		const i = responseIndex.current;
		if (i < scriptedResponses.length) {
			responseIndex.current += 1;
			return scriptedResponses[i];
		}
		if (loopWhenDone && scriptedResponses.length > 0) {
			return scriptedResponses[scriptedResponses.length - 1];
		}
		return { text: "..." };
	}, []);

	const send = useCallback(
		(text: string) => {
			const trimmed = text.trim();
			if (!trimmed) return;

			const userMsg: ChatMessage = {
				id: makeId(),
				role: "user",
				text: trimmed,
			};
			setMessages((prev) => [...prev, userMsg]);

			const next = pickNextResponse();
			const hasImage = Boolean(next.imageUrl);
			const hasText = Boolean(next.text && next.text.length > 0);

			// Vor der Antwort: kurze "Denkpause". Wenn nur ein Bild (ohne Text)
			// kommt, nutzen wir direkt den längeren Image-Delay.
			const initialDelay =
				hasImage && !hasText
					? timing.imageGenerationDelayMs
					: timing.typingDelayMs;

			setIsTyping(true);

			window.setTimeout(() => {
				const assistantId = makeId();
				const fullText = next.text ?? "";

				// Startet die Bild-"Generierung": zeigt zuerst den Spinner,
				// nach `imageGenerationDelayMs` erscheint das echte Bild.
				const startImageGeneration = () => {
					if (!hasImage) return;
					setMessages((prev) =>
						prev.map((m) =>
							m.id === assistantId
								? {
										...m,
										imageUrl: next.imageUrl,
										imageCaption: next.imageCaption,
										imagePending: true,
									}
								: m,
						),
					);
					window.setTimeout(() => {
						setMessages((prev) =>
							prev.map((m) =>
								m.id === assistantId ? { ...m, imagePending: false } : m,
							),
						);
					}, timing.imageGenerationDelayMs);
				};

				// Nachricht einfügen – Bild bleibt zunächst versteckt,
				// damit erst der Text fertig gestreamt werden kann.
				setMessages((prev) => [
					...prev,
					{
						id: assistantId,
						role: "assistant",
						text: "",
						streaming: hasText,
					},
				]);
				setIsTyping(false);

				if (hasText) {
					// Text Wort für Wort einstreamen. Whitespace bleibt erhalten.
					const tokens = fullText.match(/\s+|\S+/g) ?? [];
					let shown = "";
					let i = 0;

					const tick = () => {
						if (i >= tokens.length) {
							setMessages((prev) =>
								prev.map((m) =>
									m.id === assistantId ? { ...m, streaming: false } : m,
								),
							);
							// Erst JETZT die Bild-Generierung starten.
							startImageGeneration();
							return;
						}
						shown += tokens[i];
						i += 1;
						const snapshot = shown;
						setMessages((prev) =>
							prev.map((m) =>
								m.id === assistantId ? { ...m, text: snapshot } : m,
							),
						);
						window.setTimeout(tick, timing.wordStreamIntervalMs);
					};

					window.setTimeout(tick, timing.wordStreamIntervalMs);
				} else {
					// Kein Text: Bild (falls vorhanden) direkt "generieren".
					startImageGeneration();
				}
			}, initialDelay);
		},
		[pickNextResponse],
	);

	const reset = useCallback(() => {
		setMessages([]);
		responseIndex.current = 0;
		setIsTyping(false);
	}, []);

	return { messages, isTyping, send, reset };
}
