"use client";

import { Badge, Box, Flex, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import {
	LuBookmark,
	LuBox,
	LuCode,
	LuLayoutGrid,
	LuMessageSquare,
	LuPanelLeft,
	LuPlus,
	LuSearch,
	LuSettings2,
	LuSlidersHorizontal,
	LuSparkles,
} from "react-icons/lu";
import type { ChatEntry } from "@/data/films/types";
import { useFilm } from "./FilmContext";

type NavItem = {
	icon: React.ElementType;
	label: string;
	badge?: string;
	active?: boolean;
};

const navItems: NavItem[] = [
	{ icon: LuPlus, label: "Neu", active: true },
	{ icon: LuBox, label: "Projekte" },
	{ icon: LuBookmark, label: "Artefakte" },
	{ icon: LuCode, label: "Code", badge: "Upgrade" },
	{ icon: LuSettings2, label: "Anpassen" },
];

function NavRow({ item }: { item: NavItem }) {
	return (
		<Flex
			as="button"
			align="center"
			justify="space-between"
			w="full"
			px="2.5"
			py="1.5"
			rounded="md"
			cursor="pointer"
			bg={item.active ? "whiteAlpha.100" : "transparent"}
			_hover={{ bg: "whiteAlpha.100" }}
			color="gray.200"
		>
			<HStack gap="2.5">
				<Icon as={item.icon} boxSize="4" color="gray.400" />
				<Text fontSize="sm">{item.label}</Text>
			</HStack>
			{item.badge && (
				<Text fontSize="xs" color="blue.300">
					{item.badge}
				</Text>
			)}
		</Flex>
	);
}

function ChatRow({ entry }: { entry: ChatEntry }) {
	return (
		<Flex
			as="button"
			align="center"
			justify="space-between"
			w="full"
			px="2.5"
			py="1.5"
			rounded="md"
			cursor="pointer"
			_hover={{ bg: "whiteAlpha.100" }}
			color="gray.300"
		>
			<HStack gap="2.5" minW="0">
				<Icon
					as={LuMessageSquare}
					boxSize="3.5"
					color="gray.500"
					flexShrink="0"
				/>
				<Text
					fontSize="sm"
					overflow="hidden"
					textOverflow="ellipsis"
					whiteSpace="nowrap"
				>
					{entry.title}
				</Text>
			</HStack>
			{entry.badge && (
				<Badge
					size="xs"
					bg="blue.600"
					color="white"
					rounded="full"
					px="2"
					fontSize="2xs"
					flexShrink="0"
				>
					{entry.badge}
				</Badge>
			)}
		</Flex>
	);
}

export function Sidebar() {
	const { sidebarPinned, chatHistory, userProfile } = useFilm();
	return (
		<Flex
			direction="column"
			w="260px"
			h="100vh"
			bg="#1f1f1e"
			borderRightWidth="1px"
			borderColor="whiteAlpha.100"
			p="2.5"
		>
			{/* Header */}
			<Flex align="center" justify="space-between" px="2" py="2" mb="3">
				<HStack gap="2">
					<Icon as={LuPanelLeft} boxSize="4" color="gray.400" />
					<Text fontWeight="semibold" color="gray.100">
						CrossGPT
					</Text>
				</HStack>
			</Flex>

			{/* Primary nav */}
			<VStack gap="0.5" align="stretch">
				{navItems.map((item) => (
					<NavRow key={item.label} item={item} />
				))}
			</VStack>

			{/* Chats and tasks header */}
			<Flex align="center" justify="space-between" px="2.5" mt="5" mb="1.5">
				<Text fontSize="xs" color="gray.500">
					Chats und Aufgaben
				</Text>
				<Icon as={LuSlidersHorizontal} boxSize="3.5" color="gray.500" />
			</Flex>

			{/* Pinned */}
			<VStack gap="0.5" align="stretch">
				{sidebarPinned.map((entry) => (
					<ChatRow key={entry.id} entry={entry} />
				))}
			</VStack>

			{/* Chat history */}
			<Box flex="1" overflowY="auto" mt="1">
				<VStack gap="0.5" align="stretch">
					{chatHistory.map((entry) => (
						<ChatRow key={entry.id} entry={entry} />
					))}
				</VStack>
			</Box>

			{/* Footer / user */}
			<Flex
				align="center"
				justify="space-between"
				px="2"
				py="2"
				mt="2"
				borderTopWidth="1px"
				borderColor="whiteAlpha.100"
			>
				<HStack gap="2">
					<Flex
						align="center"
						justify="center"
						w="6"
						h="6"
						rounded="full"
						bg="orange.600"
						color="white"
						fontSize="xs"
						fontWeight="bold"
					>
						{userProfile.initial}
					</Flex>
					<Text fontSize="sm" color="gray.300">
						{userProfile.name}
					</Text>
					<Text fontSize="xs" color="gray.500">
						· {userProfile.plan}
					</Text>
				</HStack>
				<HStack gap="2" color="gray.500">
					<Icon as={LuLayoutGrid} boxSize="4" />
					<Icon as={LuSearch} boxSize="4" />
				</HStack>
			</Flex>
		</Flex>
	);
}
