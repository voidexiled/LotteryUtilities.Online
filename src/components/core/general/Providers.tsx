import { FiguresProvider } from "@/contexts/FiguresContext";
import { ProfileProvider } from "@/contexts/ProfileContext";
import { TablesProvider } from "@/contexts/TablesContext";
import { ToolsProvider } from "@/contexts/ToolsContext";
import type { ReactNode } from "react";

export const Providers = ({
	children,
}: { children: ReactNode | ReactNode[] }) => {
	return (
		<ProfileProvider>
			<ToolsProvider>
				<FiguresProvider>
					<TablesProvider>{children}</TablesProvider>
				</FiguresProvider>
			</ToolsProvider>
		</ProfileProvider>
	);
};
