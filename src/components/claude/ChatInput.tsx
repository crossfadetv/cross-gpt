"use client";

import { Box, Flex, HStack, Icon, Textarea } from "@chakra-ui/react";
import { type KeyboardEvent, useEffect, useRef, useState } from "react";
import {
	LuArrowUp,
	LuAudioLines,
	LuChevronDown,
	LuMic,
	LuPlus,
} from "react-icons/lu";
import { useFilm } from "./FilmContext";

type Props = {
	onSend: (text: string) => void;
	// Vorgefertigter Prompt: Enter im leeren Feld tippt ihn Zeichen für Zeichen ein.
	scriptedPrompt?: string;
	placeholder?: string;
	disabled?: boolean;
};

// Pause vor dem nächsten Zeichen. Schwankt zufällig und ist nach Wörtern
// und Satzzeichen länger, damit es wie ein Mensch am Keyboard wirkt.
function humanKeyDelay(prevChar: string, baseMs: number) {
	let delay = baseMs * (0.5 + Math.random());
	if (prevChar === " ") delay += baseMs * 0.8;
	if (/[.,!?;:]/.test(prevChar)) delay += baseMs * 3;
	if (Math.random() < 0.03) delay += baseMs * 6; // kurz überlegen
	return delay;
}

export function ChatInput({
	onSend,
	scriptedPrompt,
	placeholder = "Wie kann ich dir heute helfen?",
	disabled,
}: Props) {
	const { appInfo, timing } = useFilm();
	const [value, setValue] = useState("");
	const [autoTyping, setAutoTyping] = useState(false);
	const typingTimer = useRef<number | undefined>(undefined);

	useEffect(() => () => window.clearTimeout(typingTimer.current), []);

	const typePrompt = (prompt: string) => {
		const baseMs = timing.promptTypingIntervalMs ?? 70;
		let i = 0;
		setAutoTyping(true);

		const tick = () => {
			i += 1;
			setValue(prompt.slice(0, i));
			if (i >= prompt.length) {
				setAutoTyping(false);
				return;
			}
			typingTimer.current = window.setTimeout(
				tick,
				humanKeyDelay(prompt[i - 1], baseMs),
			);
		};

		typingTimer.current = window.setTimeout(tick, baseMs);
	};

	const submit = () => {
		const text = value.trim();
		if (!text || disabled || autoTyping) return;
		onSend(text);
		setValue("");
	};

	const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			if (autoTyping) return;
			if (!value.trim() && scriptedPrompt && !disabled) {
				typePrompt(scriptedPrompt);
				return;
			}
			submit();
		}
	};

	return (
		<Box
			w="full"
			maxW="720px"
			bg="#2a2a28"
			borderWidth="1px"
			borderColor="whiteAlpha.100"
			rounded="xl"
			px="4"
			py="3"
			shadow="lg"
		>
			<Textarea
				value={value}
				onChange={(e) => setValue(e.target.value)}
				readOnly={autoTyping}
				onKeyDown={onKeyDown}
				placeholder={placeholder}
				variant="outline"
				border="none"
				outline="none"
				bg="transparent"
				color="gray.100"
				fontSize="sm"
				resize="none"
				minH="28px"
				maxH="180px"
				p="0"
				mb="3"
				rows={1}
				// Feld wächst mit dem Text (bis maxH), damit lange Prompts sichtbar bleiben.
				css={{ fieldSizing: "content" }}
				_focus={{ boxShadow: "none", outline: "none" }}
				_placeholder={{ color: "gray.500" }}
			/>

			<Flex align="center" justify="space-between">
				<HStack gap="2">
					<Flex
						align="center"
						justify="center"
						w="7"
						h="7"
						rounded="md"
						bg="whiteAlpha.100"
						color="gray.300"
						cursor="pointer"
						_hover={{ bg: "whiteAlpha.200" }}
					>
						<Icon as={LuPlus} boxSize="4" />
					</Flex>

					<Box
						px="3"
						py="1"
						rounded="md"
						bg="whiteAlpha.100"
						color="gray.100"
						fontSize="sm"
						cursor="pointer"
					>
						Chat
					</Box>
					<Box
						px="3"
						py="1"
						rounded="md"
						color="gray.400"
						fontSize="sm"
						cursor="pointer"
						_hover={{ bg: "whiteAlpha.50" }}
					>
						Cowork
					</Box>
				</HStack>

				<HStack gap="3" color="gray.400" fontSize="sm">
					<HStack gap="1" cursor="pointer">
						<Box>{appInfo.modelName}</Box>
						<Box color="gray.500">{appInfo.modelTier}</Box>
					</HStack>
					<Icon as={LuMic} boxSize="4" />
					<HStack gap="1" cursor="pointer">
						<Icon as={LuAudioLines} boxSize="4" />
						<Icon as={LuChevronDown} boxSize="3" />
					</HStack>
					<button
						type="button"
						onClick={submit}
						disabled={!value.trim() || disabled}
						style={{
							display: "inline-flex",
							alignItems: "center",
							justifyContent: "center",
							width: "28px",
							height: "28px",
							borderRadius: "6px",
							border: "none",
							background: value.trim()
								? "var(--chakra-colors-orange-500, #dd6b20)"
								: "rgba(255,255,255,0.1)",
							color: value.trim()
								? "white"
								: "var(--chakra-colors-gray-500, #a0aec0)",
							cursor: value.trim() ? "pointer" : "not-allowed",
							transition: "background 0.15s ease",
						}}
					>
						<Icon as={LuArrowUp} boxSize="4" />
					</button>
				</HStack>
			</Flex>
		</Box>
	);
}
