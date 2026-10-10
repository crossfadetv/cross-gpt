import { AbsoluteCenter, Box, Card, CardTitle, Text } from "@chakra-ui/react";

export default function ErrorPage() {
	return (
		<Box w={"100vw"} h={"100vh"} bg={"red.950"}>
			<AbsoluteCenter>
				<Box
					w={"400px"}
					h={"150px"}
					border={"1px solid"}
					bg={"red.800"}
					borderColor={"red"}
					display={"flex"}
					alignItems={"center"}
					justifyContent={"center"}
				>
					<Text color={"red"} fontFamily={"mono"} fontSize={"xxx-large"}>
						OFFLINE
					</Text>
				</Box>
			</AbsoluteCenter>
		</Box>
	);
}
