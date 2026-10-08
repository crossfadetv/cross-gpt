import { Flex } from "@chakra-ui/react";
import { MainArea } from "@/components/claude/MainArea";
import { Sidebar } from "@/components/claude/Sidebar";

export default function Home() {
	return (
		<Flex h="100vh" w="100vw" bg="#262624" overflow="hidden">
			<Sidebar />
			<MainArea />
		</Flex>
	);
}
