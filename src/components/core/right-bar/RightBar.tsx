import { FlagsContext } from "@/contexts/FlagsContext";
import type { FlagsContextType } from "@/vite-env";
import { useContext } from "react";
import { FiguresView } from "./figures/FiguresView";

import { cn } from "@/utils/utils";
import { AnimatePresence } from "framer-motion";
import { ProfilesView } from "./profiles/ProfilesView";
import { TableView } from "./tables/TableView";

export const RightBar = () => {
	const { showProfiles, showFigures, showTables } = useContext(
		FlagsContext,
	) as FlagsContextType;

	return (
		<div
			className={cn(
				"order-2 mt-4 flex max-h-[1200px] min-h-[320px] flex-col overflow-hidden rounded-lg bg-base-200 p-4 px-4 lg:order-3 lg:mt-0 lg:min-h-full lg:min-w-[460px] lg:max-w-[460px]",
				showProfiles && "lg:max-w-[80%]",
			)}
		>
			<AnimatePresence mode="wait">
				{showTables ? (
					<TableView key="table-view" />
				) : showFigures ? (
					<FiguresView key="figures-view" />
				) : showProfiles ? (
					<ProfilesView key="profiles-view" />
				) : null}
			</AnimatePresence>
		</div>
	);
};
