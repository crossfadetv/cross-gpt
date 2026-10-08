"use client";

import { HStack, Icon, Text } from "@chakra-ui/react";
import {
	LuBookOpen,
	LuCode,
	LuHeart,
	LuPencil,
	LuSparkles,
} from "react-icons/lu";

type QuickAction = {
	icon: React.ElementType;
	label: string;
};

const actions: QuickAction[] = [
	{ icon: LuPencil, label: "Schreiben" },
	{ icon: LuBookOpen, label: "Lernen" },
	{ icon: LuCode, label: "Code" },
	{ icon: LuHeart, label: "Alltag" },
	{ icon: LuSparkles, label: "CrossGPTs Wahl" },
];

export function QuickActions() {
	return (
		<HStack gap="2" wrap="wrap" justify="center">
			{actions.map((action) => (
				<HStack
					key={action.label}
					gap="2"
					px="3"
					py="1.5"
					rounded="lg"
					bg="#2a2a28"
					borderWidth="1px"
					borderColor="whiteAlpha.100"
					color="gray.300"
					fontSize="sm"
					cursor="pointer"
					_hover={{ bg: "whiteAlpha.100" }}
				>
					<Icon as={action.icon} boxSize="3.5" color="gray.400" />
					<Text>{action.label}</Text>
				</HStack>
			))}
		</HStack>
	);
}
