"use client";

import { Flex, HStack, Icon, Image, Text, VStack } from "@chakra-ui/react";
import { LuMessageCircle } from "react-icons/lu";
import { ChatInput } from "./ChatInput";
import { ChatView } from "./ChatView";
import { useFilm } from "./FilmContext";
import { QuickActions } from "./QuickActions";
import { useChat } from "./useChat";

export function MainArea() {
	const { appInfo, userProfile } = useFilm();
	const { messages, isTyping, send } = useChat();
	const hasMessages = messages.length > 0;

	return (
		<Flex
			direction="column"
			flex="1"
			h="100vh"
			bg="#262624"
			position="relative"
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
					<ChatView messages={messages} isTyping={isTyping} />
					<Flex justify="center" px="6" pb="6" flexShrink="0">
						<ChatInput
							onSend={send}
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
					<VStack gap="8" w="full" maxW="720px">
						<HStack gap="3">
							<Image
								src="/red-dot-transparent.png"
								alt="CrossGPT"
								boxSize="8"
								objectFit="contain"
							/>
							<Text fontSize="3xl" fontWeight="light" color="gray.100">
								{appInfo.greeting}, {userProfile.name}
							</Text>
						</HStack>

						<ChatInput onSend={send} />

						<QuickActions />
					</VStack>
				</Flex>
			)}
		</Flex>
	);
}
