
import { FlagsContext } from "@/contexts/FlagsContext";
import type { FlagsContextType } from "@/vite-env";
import { useContext } from "react";
import { FiguresView } from "./figures/FiguresView";

import { AnimatePresence } from 'framer-motion'
import { TableView } from "./tables/TableView";



export const RightBar = () => {

	const { showProfiles, showFigures, showTables } = useContext(FlagsContext) as FlagsContextType;

	console.log(showProfiles, showFigures, showTables);
	return (
		<div className="order-2 mt-4 flex max-h-[480px] min-h-[320px] flex-col overflow-hidden rounded-lg bg-base-200 p-4 px-4 lg:order-3 lg:mt-0 lg:min-h-full lg:min-w-[560px] lg:max-w-[560px]">

			<AnimatePresence mode="wait">
				{
					showTables ?
						<TableView key="table-view" /> :
						showFigures ?
							<FiguresView key="figures-view" /> :
							showProfiles ? null : null

				}
			</AnimatePresence>


		</div>
	);
};
