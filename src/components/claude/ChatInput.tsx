"uld gse client";

import { Box, Flex, HStack, Icon, Textarea } from "@chakra-ui/react";
import { type KeyboardEvent, useState } from "react";
import {
	LuArrowUp,
	LuAudioLines,
	LuChevronDown,
	LuMic,
	LuPlus,
} from "react-icons/lu";
import { appInfo } from "@/data/chatHistory";

type Props = {
	onSend: (text: string) => void;
	placeholder?: string;
	disabled?: boolean;
};

export function ChatInput({
	onSend,
	placeholder = "Wie kann ich dir heute helfen?",
	disabled,
}: Props) {
	const [value, setValue] = useState("");

	const submit = () => {
		const text = value.trim();
		if (!text || disabled) return;
		onSend(text);
		setValue("");
	};

	const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
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
					<Flex
						as="button"
						type="button"
						onClick={submit}
						align="center"
						justify="center"
						w="7"
						h="7"
						rounded="md"
						bg={value.trim() ? "orange.500" : "whiteAlpha.100"}
						color={value.trim() ? "white" : "gray.500"}
						cursor={value.trim() ? "pointer" : "not-allowed"}
						_hover={value.trim() ? { bg: "orange.400" } : undefined}
						disabled={!value.trim() || disabled}
					>
						<Icon as={LuArrowUp} boxSize="4" />
					</Flex>
				</HStack>
			</Flex>
		</Box>
	);
}
