"use client";

import { Flex, HStack, Icon, Image, Text, VStack } from "@chakra-ui/react";
import { LuMessageCircle } from "react-icons/lu";
import { backgrounds } from "@/data/backgrounds";
import { ChatInput } from "./ChatInput";
import { ChatView } from "./ChatView";
import { useFilm } from "./FilmContext";
import { QuickActions } from "./QuickActions";
import { useChat } from "./useChat";

// Vergrößert Startbereich und Chat gleichmäßig – wirkt im Film besser.
// Sidebar und Top-Bar bleiben unverändert.
const contentZoom = 1.25;

export function MainArea() {
	const { appInfo, userProfile, background } = useFilm();
	const { messages, isTyping, nextPrompt, send } = useChat();
	const hasMessages = messages.length > 0;

	return (
		<Flex
			direction="column"
			flex="1"
			h="100vh"
			bg="#262624"
			position="relative"
			style={backgrounds[background ?? "dots"]}
		>
			{/* Top bar */}
			<Flex
				align="center"
				justify="center"
				py="3"
				position="relative"
				flexShrink="0"
			>
				<HStack gap="2" fontSize="sm" color="gray.400">
					<Text>{appInfo.planLabel}</Text>
					<Text color="gray.600">·</Text>
					<Text color="blue.300" cursor="pointer">
						{appInfo.upgradeLabel}
					</Text>
				</HStack>
				<Icon
					as={LuMessageCircle}
					boxSize="4"
					color="gray.400"
					position="absolute"
					right="5"
					top="4"
				/>
			</Flex>

			{hasMessages ? (
				<>
					<ChatView messages={messages} isTyping={isTyping} zoom={contentZoom} />
					<Flex
						justify="center"
						px="6"
						pb="6"
						flexShrink="0"
						style={{ zoom: contentZoom }}
					>
						<ChatInput
							onSend={send}
							scriptedPrompt={nextPrompt}
							placeholder="Antwort an CrossGPT ..."
							disabled={isTyping}
						/>
					</Flex>
				</>
			) : (
				<Flex
					direction="column"
					flex="1"
					align="center"
					justify="center"
					px="6"
				>
					<VStack gap="8" w="full" maxW="720px" style={{ zoom: contentZoom }}>
						<VStack gap="3">
							<HStack gap="4">
								<Image
									src="/app/red-dot.png"
									alt="CrossGPT"
									boxSize="12"
									objectFit="contain"
								/>
								<Text
									fontSize="5xl"
									fontWeight="light"
									color="gray.100"
									lineHeight="1.1"
								>
									{appInfo.greeting}, {userProfile.name}
								</Text>
							</HStack>
							{appInfo.quote && (
								<Text fontSize="xl" color="gray.400" textAlign="center">
									{appInfo.quote}
								</Text>
							)}
						</VStack>

						<ChatInput onSend={send} scriptedPrompt={nextPrompt} />

						<QuickActions />
					</VStack>
				</Flex>
			)}
		</Flex>
	);
}
