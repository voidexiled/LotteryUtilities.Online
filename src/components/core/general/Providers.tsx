import { FiguresProvider } from "@/contexts/providers/FiguresProvider";
import { FlagsProvider } from "@/contexts/providers/FlagsProvider";
import { ProfileProvider } from "@/contexts/providers/ProfileProvider";
import { TablesProvider } from "@/contexts/providers/TablesProvider";
import { ToolsProvider } from "@/contexts/providers/ToolsProvider";
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
		commandActive: "#fff",
	};
	return (
		<MenuProvider config={config}>
			<ProfileProvider>
				<ToolsProvider>
					<FiguresProvider>
						<TablesProvider>
							<FlagsProvider>{children}</FlagsProvider>
						</TablesProvider>
					</FiguresProvider>
				</ToolsProvider>
			</ProfileProvider>
		</MenuProvider>
	);
};
