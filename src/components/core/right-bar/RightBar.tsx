import { AnimatePresence } from "framer-motion";

import { TableThumb } from "@/components/reusable/table/TableThumb";
import { TablesContext } from "@/contexts/TablesContext";
import type { TablesContextType } from "@/vite-env";
import { useContext } from "react";
import { RightBarProfileViewer } from "./table-generator/RightBarTableGenerator";



export const RightBar = () => {
	const { tables } = useContext(
		TablesContext,
	) as TablesContextType;
	return (
		<div className="flex flex-col bg-base-200 lg:min-w-[560px] lg:max-w-[560px] min-h-[320px] max-h-[480px]  lg:min-h-full rounded-lg px-4 p-4 overflow-hidden order-2 lg:order-3 mt-4 lg:mt-0 ">
			<RightBarProfileViewer />
			<div className="custom-scrollbar flex flex-row gap-4 text-xs p-6 overflow-y-auto flex-wrap mt-8 rounded-lg bg-base-300  shadow-inner shadow-base-200/25 grow w-full justify-normal items-start scroll-smooth content-start disabled-select h-4/6">
				<AnimatePresence mode="sync">
					{tables.map((table) => {
						return (
							<TableThumb
								table={table}
								key={table.id}
							/>
						);
					})}
				</AnimatePresence>
			</div>
		</div>
	);
};
