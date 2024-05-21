import { TablesContext } from "@/contexts/TablesContext";
import { cn } from "@/utils/utils";
import type { Table, TablesContextType } from "@/vite-env";
import { color, motion } from "framer-motion";
import { Check } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
type TableThumbProps = {
	table: Table;
	removeTable: (tableId: string) => void;
};

export const TableThumb = ({ table, removeTable }: TableThumbProps) => {
	const [isSelected, setIsSelected] = useState(false);
	const { setCurrentTable, currentTable } = useContext(
		TablesContext,
	) as TablesContextType;

	const notifyDeleted = () =>
		toast(`Se ha eliminado la tabla ${table.name} correctamente.`, {
			bodyStyle: { fontSize: "0.75rem" },
			icon: <Check className="w-4 h-4 " />,
		});

	useEffect(() => {
		if (currentTable?.id === table.id) {
			setIsSelected(true);
		} else {
			setIsSelected(false);
		}
	}, [currentTable, table]);

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.72, filter: "blur(2px)" }}
			animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
			exit={{ opacity: 0, scale: 0.72, filter: "blur(2px)" }}
			transition={{
				type: "tween",
				duration: 0.15,
			}}
			key={table.date}
			className={cn(
				"relative disabled-right-click transition-all w-[72px] rounded-sm overflow-hidden hover:cursor-pointer hover:scale-105  hover:after:opacity-100 after:absolute after:transition-all after:opacity-0 after:inset-0 after:content-[''] after:rounded-sm after:shadow-base-300 after:shadow-inner after:z-10 shadow-none border-transparent border",
				isSelected
					? "border-accent [box-shadow:0px_0px_10px_2px_#9370db] after:shadow-none"
					: "after:shadow-sm  ",
			)}
			onClick={(e) => {
				if (e.type === "click") {
					if (isSelected) {
						setCurrentTable(null);
					} else {
						setCurrentTable(table);
					}
				} else if (e.type === "contextmenu") {
					e.preventDefault();
				}
			}}
			onContextMenu={(e) => {
				e.preventDefault();
				// delete this table
				removeTable(table.id);
				notifyDeleted();
			}}
		>
			<img
				width="10px"
				alt={`table ${table.id}, size ${table.options.size}`}
				src={table.imageURL}
				className="opacity-0 transition-all object-contain object-center w-full"
				onLoad={(e) => {
					e.currentTarget.classList.remove("opacity-0");
					e.currentTarget.classList.add("opacity-100");
				}}
				loading="lazy"
			/>
			<div
				className={cn(
					"absolute inset-0 flex items-center justify-center bg-secondary bg-opacity-0 transition-all backdrop-blur-none brigthness-80 duration-[120ms] ease-out ",
					currentTable !== null && isSelected && "bg-opacity-50 ",
					currentTable !== null && !isSelected && " brigthness-50",
				)}
			/>
		</motion.div>
	);
};
