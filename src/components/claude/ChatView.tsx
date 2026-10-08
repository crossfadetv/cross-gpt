"use client";

import { Box, Flex, HStack, Icon, Image, Text, VStack } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { LuSparkles } from "react-icons/lu";
import { userProfile } from "@/data/chatHistory";
import { timing } from "@/data/scenarios";
import type { ChatMessage } from "./useChat";

type Props = {
	messages: ChatMessage[];
	isTyping: boolean;
};

function AssistantAvatar() {
	return (
		<Flex
			align="center"
			justify="center"
			w="7"
			h="7"
			rounded="full"
			bg="orange.600"
			color="white"
			flexShrink="0"
		>
			<Icon as={LuSparkles} boxSize="3.5" />
		</Flex>
	);
}

function UserAvatar() {
	return (
		<Flex
			align="center"
			justify="center"
			w="7"
			h="7"
			rounded="full"
			bg="gray.600"
			color="white"
			fontSize="xs"
			fontWeight="bold"
			flexShrink="0"
		>
			{userProfile.initial}
		</Flex>
	);
}

function GeneratingImage({
	src,
	alt,
	pending,
}: {
	src: string;
	alt: string;
	pending: boolean;
}) {
	// Dauer, über die der Blur abgebaut wird. Nutzt denselben Wert wie
	// die simulierte Generierung, damit es synchron läuft.
	const durationMs = timing.imageGenerationDelayMs;

	return (
		<Box position="relative" w="full" minH="200px" overflow="hidden">
			<Image
				src={src}
				alt={alt}
				w="full"
				h="auto"
				display="block"
				style={{
					filter: pending
						? "blur(28px) saturate(1.4) brightness(0.75)"
						: "blur(0px) saturate(1) brightness(1)",
					transform: pending ? "scale(1.08)" : "scale(1)",
					transition: `filter ${durationMs}ms ease-out, transform ${durationMs}ms ease-out`,
					willChange: "filter, transform",
				}}
			/>
			{/* Schimmer-Überlagerung während der "Generierung" */}
			<Box
				position="absolute"
				inset="0"
				pointerEvents="none"
				style={{
					opacity: pending ? 1 : 0,
					transition: `opacity ${Math.round(durationMs / 2)}ms ease-out`,
					background:
						"linear-gradient(110deg, rgba(255,255,255,0) 30%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0) 70%)",
					backgroundSize: "200% 100%",
					animation: pending ? "shimmer 1.6s linear infinite" : undefined,
				}}
			/>
			{/* Dezentes Label während der Generierung */}
			{pending && (
				<Flex
					position="absolute"
					bottom="2"
					left="2"
					align="center"
					gap="2"
					px="2"
					py="1"
					rounded="md"
					bg="blackAlpha.600"
					color="gray.100"
					fontSize="xs"
				>
					<Icon as={LuSparkles} boxSize="3" color="orange.300" />
					<Text>Generiere Bild …</Text>
				</Flex>
			)}
		</Box>
	);
}

function MessageBubble({ message }: { message: ChatMessage }) {
	const isUser = message.role === "user";
	return (
		<HStack align="flex-start" gap="3" w="full">
			{isUser ? <UserAvatar /> : <AssistantAvatar />}
			<VStack align="flex-start" gap="2" flex="1" minW="0">
				<Text fontSize="sm" color="gray.400" fontWeight="semibold">
					{isUser ? userProfile.name : "CrossGPT"}
				</Text>
				{(message.text || message.streaming) && (
					<Text
						fontSize="sm"
						color="gray.100"
						whiteSpace="pre-wrap"
						lineHeight="1.6"
					>
						{message.text}
						{message.streaming && (
							<Box
								as="span"
								display="inline-block"
								w="2"
								h="4"
								ml="1"
								bg="gray.100"
								verticalAlign="text-bottom"
								animation="blink 1s steps(1) infinite"
							/>
						)}
					</Text>
				)}
				{message.imageUrl && (
					<Box
						mt="1"
						rounded="lg"
						overflow="hidden"
						borderWidth="1px"
						borderColor="whiteAlpha.100"
						maxW="420px"
						w="full"
						bg="#1f1f1e"
					>
						<GeneratingImage
							src={message.imageUrl}
							alt={message.imageCaption ?? "Generiertes Bild"}
							pending={Boolean(message.imagePending)}
						/>
						{message.imageCaption && (
							<Text
								fontSize="xs"
								color="gray.500"
								px="3"
								py="2"
								borderTopWidth="1px"
								borderColor="whiteAlpha.100"
							>
								{message.imageCaption}
							</Text>
						)}
					</Box>
				)}
			</VStack>
		</HStack>
	);
}

function TypingIndicator() {
	return (
		<HStack align="flex-start" gap="3" w="full">
			<AssistantAvatar />
			<VStack align="flex-start" gap="2" flex="1">
				<Text fontSize="sm" color="gray.400" fontWeight="semibold">
					CrossGPT
				</Text>
				<HStack gap="1" h="5" align="center">
					<Box
						w="2"
						h="2"
						rounded="full"
						bg="gray.500"
						animation="pulse 1.4s ease-in-out infinite"
					/>
					<Box
						w="2"
						h="2"
						rounded="full"
						bg="gray.500"
						animation="pulse 1.4s ease-in-out 0.2s infinite"
					/>
					<Box
						w="2"
						h="2"
						rounded="full"
						bg="gray.500"
						animation="pulse 1.4s ease-in-out 0.4s infinite"
					/>
				</HStack>
			</VStack>
		</HStack>
	);
}

export function ChatView({ messages, isTyping }: Props) {
	const bottomRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages, isTyping]);

	return (
		<Box flex="1" overflowY="auto" w="full">
			<VStack
				gap="6"
				align="stretch"
				w="full"
				maxW="760px"
				mx="auto"
				px="6"
				py="8"
			>
				{messages.map((m) => (
					<MessageBubble key={m.id} message={m} />
				))}
				{isTyping && <TypingIndicator />}
				<div ref={bottomRef} />
			</VStack>
		</Box>
	);
}
