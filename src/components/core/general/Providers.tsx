import { FiguresProvider } from "@/contexts/FiguresContext";
import { ProfileProvider } from "@/contexts/ProfileContext";
import { TablesProvider } from "@/contexts/TablesContext";
import { ToolsProvider } from "@/contexts/ToolsContext";
import { type MenuConfig, MenuProvider } from "kmenu";
import type { ReactNode } from "react";

export const Providers = ({
	children,
}: { children: ReactNode | ReactNode[] }) => {
	const config: MenuConfig = {
		backdropColor: "#7b68ee3a",
		backdropBlur: 3,
		breadcrumbColor: "#2e2e2e",
		backgroundColor: "#1c1c1c",
		headingColor: "#afafaf",
		barBackground: "#7b68ee3a",
		inputColor: "#fff",
		inputBorder: "#8a2be24a",
		commandActive: "#fff"

	}
	return (
		<MenuProvider config={config}>


			<ProfileProvider>
				<ToolsProvider>
					<FiguresProvider>
						<TablesProvider>{children}</TablesProvider>
					</FiguresProvider>
				</ToolsProvider>
			</ProfileProvider>
		</MenuProvider>
	);
};
