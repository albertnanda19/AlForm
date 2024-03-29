import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import DesignerContextProvider from "@/components/context/DesignerContext";
import NextTopLoader from "nextjs-toploader"

export const metadata: Metadata = {
	title: "AlForm",
	description: "An open source form builder for everyone with interactive forms with drag and drop feature.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body>
					<NextTopLoader />
					<DesignerContextProvider>
						<ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
							{children}
							<Toaster />
						</ThemeProvider>
					</DesignerContextProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
