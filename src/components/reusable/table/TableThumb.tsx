import { TablesContext } from "@/contexts/TablesContext";
import { cn, handleOpacityOnLoadImage } from "@/utils/utils";
import type { Table, TablesContextType } from "@/vite-env";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Flip, toast } from "react-toastify";
type TableThumbProps = {
	table: Table;
};

export const TableThumb = ({ table }: TableThumbProps) => {
	const [isSelected, setIsSelected] = useState(false);
	const { removeTable, setCurrentTable, currentTable } = useContext(
		TablesContext,
	) as TablesContextType;

	useEffect(() => {
		if (currentTable?.id === table.id) {
			setIsSelected(true);
		} else {
			setIsSelected(false);
		}
	}, [currentTable, table]);


	const notifyDeleted = () => {
		toast(`Se ha eliminado la tabla ${table.name} correctamente.`, {
			bodyStyle: { fontSize: "0.75rem" },
			transition: Flip,
			autoClose: 2200,
			type: "error",
			closeOnClick: true,
			icon: <Check className="h-4 w-4" />,
		});
	}

	const handleRemoveTable = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		e.preventDefault();
		e.stopPropagation();

		removeTable(table.id);
		notifyDeleted();
	}

	const handleSelectTable = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (e.type === "click") {
			if (isSelected) {
				setCurrentTable(null);
			} else {
				setCurrentTable(table);
			}
		} else if (e.type === "contextmenu") {
			e.preventDefault();
		}
	}


	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.72, filter: "blur(2px)" }}
			animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
			exit={{ opacity: 0, scale: 0.72, filter: "blur(2px)" }}
			transition={{
				type: "tween",
				duration: 0.15,
			}}
			className={cn(
				"disabled-right-click relative w-[72px] overflow-hidden rounded-sm border border-transparent shadow-none transition-all after:absolute after:inset-0 after:z-10 hover:scale-105 hover:cursor-pointer after:rounded-sm after:opacity-0 hover:after:opacity-100 after:shadow-base-300 after:shadow-inner after:transition-all after:content-['']",
				isSelected
					? "border-accent [box-shadow:0px_0px_10px_2px_#9370db] after:shadow-none"
					: "after:shadow-sm",
			)}
			onClick={handleSelectTable}
			onContextMenu={handleRemoveTable}
		>
			<img
				width="10px"
				alt={`table ${table.id}, size ${table.options.size}`}
				src={table.imageURL}
				className="w-full object-contain object-center opacity-0 transition-all"
				onLoad={handleOpacityOnLoadImage}
				loading="lazy"
			/>
			<div
				className={cn(
					"brigthness-80 absolute inset-0 flex items-center justify-center bg-secondary bg-opacity-0 backdrop-blur-none transition-all duration-[120ms] ease-out",
					currentTable !== null && isSelected && "bg-opacity-50",
					currentTable !== null && !isSelected && "brigthness-50",
				)}
			/>
		</motion.div>
	);
};
