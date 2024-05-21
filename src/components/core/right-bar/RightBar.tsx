import { AnimatePresence } from "framer-motion";

import type { TablesContextType } from "@/vite-env";
import { TableThumb } from "@/components/reusable/table/TableThumb";
import { RightBarProfileViewer } from "./RightBarProfileViewer";

type RightBarProps = {
	tables: TablesContextType["tables"];
	removeTable: TablesContextType["removeTable"];
	setCurrentTable: TablesContextType["setCurrentTable"];
};

export const RightBar = ({
	tables,
	removeTable,
	setCurrentTable,
}: RightBarProps) => {
	return (
		<div className="flex flex-col bg-base-200 lg:min-w-[560px] lg:max-w-[560px] h-[320px] lg:h-full rounded-lg px-4 p-4 overflow-hidden order-2 lg:order-3 mt-4 lg:mt-0 ">
			<RightBarProfileViewer />
			<div className="custom-scrollbar flex flex-row gap-4 text-xs p-6 overflow-y-auto flex-wrap mt-8 rounded-lg bg-base-300  shadow-inner shadow-base-200/25 grow w-full justify-normal items-start scroll-smooth content-start disabled-select h-4/6">
				{/* <div className="custom-scrollbar grid grid-cols-4 gap-6 bg-base-300 "> */}
				<AnimatePresence mode="sync">
					{tables.map((table) => {
						return (
							<TableThumb
								table={table}
								removeTable={removeTable}
								key={
									table.id +
									table.date +
									table.name +
									table.options.figures.flat().toString()
								}
							/>
						);
					})}
				</AnimatePresence>
			</div>
		</div>
	);
};
