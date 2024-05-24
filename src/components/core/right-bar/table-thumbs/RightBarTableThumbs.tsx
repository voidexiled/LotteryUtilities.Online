import { TableThumb } from "@/components/reusable/table/TableThumb";
import { TablesContext } from "@/contexts/TablesContext";
import type { TablesContextType } from "@/vite-env";
import { AnimatePresence } from "framer-motion";
import { useContext } from "react";

export const RightBarTableThumbs = () => {
    const { tables } = useContext(
        TablesContext,
    ) as TablesContextType;
    return (
        <div className="custom-scrollbar flex flex-row gap-4 text-xs p-6 overflow-y-auto flex-wrap mt-8 rounded-lg bg-base-300  shadow-inner shadow-base-200/25 grow w-full justify-normal items-start scroll-smooth content-start disabled-select h-[160px]">
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
    )
}