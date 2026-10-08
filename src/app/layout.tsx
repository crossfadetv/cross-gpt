import { Provider } from "@/components/ui/provider";

export default function RootLayout(props: { children: React.ReactNode }) {
	const { children } = props;
	return (
		<html suppressHydrationWarning>
			<head>
				<style>{`
					@keyframes blink { 0%, 50% { opacity: 1 } 50.01%, 100% { opacity: 0 } }
					@keyframes pulse { 0%, 80%, 100% { opacity: 0.3 } 40% { opacity: 1 } }
				`}</style>
			</head>
			<body style={{ margin: 0, background: "#262624" }}>
				<Provider forcedTheme="dark">{children}</Provider>
			</body>
		</html>
	);
}
