import { TableThumb } from "@/components/reusable/table/TableThumb";
import { TablesContext } from "@/contexts/TablesContext";
import type { TablesContextType } from "@/vite-env";
import { AnimatePresence } from "framer-motion";
import { useContext } from "react";

export const TableThumbList = () => {
	const { tables } = useContext(TablesContext) as TablesContextType;
	return (
		<div className="custom-scrollbar disabled-select mt-8 flex h-[160px] w-full grow flex-row flex-wrap content-start items-start justify-normal gap-4 overflow-y-auto scroll-smooth rounded-lg bg-base-300 p-6 text-xs shadow-base-200/25 shadow-inner">
			<AnimatePresence mode="sync">
				{tables.map((table) => {
					return <TableThumb table={table} key={table.id} />;
				})}
			</AnimatePresence>
		</div>
	);
};
