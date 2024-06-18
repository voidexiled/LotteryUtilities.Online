import { TablesContext } from "@/contexts/TablesContext";
import { cn } from "@/utils/utils";
import type { Figure, TablesContextType } from "@/vite-env";
import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { FigureEditable } from "./FigureEditable";

export const TableEditable = () => {
	const { updateTable, currentTable } = useContext(
		TablesContext,
	) as TablesContextType;

	const [selectedFigure, setSelectedFigure] = useState<{
		index: number;
		figure: Figure;
	} | null>(null);

	const [size, setSize] = useState(0);

	useEffect(() => {
		if (currentTable) {
			if (currentTable.options.size) {
				setSize(currentTable.options.size.charAt(0) as unknown as number);
			}
		}
		console.log(size);
	}, [currentTable]);
	return (
		<>
			{currentTable && (
				<motion.div
					initial={{ opacity: 0, scale: 0.65 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{
						type: "just",
						ease: "backInOut",
						duration: 0.16,
					}}
					exit={{ opacity: 0, scale: 0.65, transition: { duration: 0.08 } }}
					className={cn(
						"relative flex min-w-[240px] max-w-[300px] grow flex-wrap overflow-hidden rounded-md",
					)}
				>
					{currentTable.options.figures.flat().map((figure, index) => (
						<FigureEditable
							key={index}
							index={index}
							currentTable={currentTable}
							currentFigure={figure}
							tableSize={size}
							selectedFigure={selectedFigure}
							setSelectedFigure={setSelectedFigure}
							updateTable={updateTable}
						/>
					))}
				</motion.div>
			)}
		</>
	);
};
