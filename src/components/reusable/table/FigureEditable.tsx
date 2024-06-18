import { DEFAULT_TOOLS } from "@/consts/ToolsConsts";
import { FiguresContext } from "@/contexts/FiguresContext";
import { ToolsContext } from "@/contexts/ToolsContext";
import { cn, getURLImage } from "@/utils/utils";
import type {
	Figure,
	FiguresContextType,
	Table,
	TablesContextType,
	ToolsContextType,
} from "@/vite-env";
import { motion } from "framer-motion";

import { useContext, useEffect, useState } from "react";
type FigureEditableProps = {
	index: number;
	currentTable: TablesContextType["currentTable"];
	currentFigure: Figure;
	tableSize: number;
	selectedFigure: { index: number; figure: Figure } | null;
	setSelectedFigure: (figure: { index: number; figure: Figure } | null) => void;
	updateTable: (table: Table) => void;
};

export const FigureEditable = ({
	index,
	tableSize,
	currentTable,
	currentFigure,
	selectedFigure,
	setSelectedFigure,
	updateTable,
}: FigureEditableProps) => {
	const { selectedTool } = useContext(ToolsContext) as ToolsContextType;
	const { currentFigure: figurePaletteSelected } = useContext(
		FiguresContext,
	) as FiguresContextType;
	const [isSelected, setIsSelected] = useState(
		selectedFigure?.figure === currentFigure && selectedFigure.index === index,
	);

	useEffect(() => {
		if (
			selectedFigure?.figure.id === currentFigure.id &&
			selectedFigure.index === index
		) {
			setIsSelected(true);
		} else {
			setIsSelected(false);
		}
	}, [selectedFigure, currentFigure, index]);

	useEffect(() => {
		setSelectedFigure(null);
		setIsSelected(false);
	}, [currentTable]);

	const handleClickFigure = async () => {
		if (!selectedTool) return;
		if (!currentTable) return;
		// Brush
		if (selectedTool.id === DEFAULT_TOOLS[0].id) {
			if (!figurePaletteSelected) return;
			const copyOfTable = currentTable;
			// Hacer copia de las figuras
			const newFigures = currentTable.options.figures.flat();

			newFigures[index] = figurePaletteSelected;
			// Convertir el array unidimensional en un array bidimensional 4x4
			const array4x4: Figure[][] = [];
			for (let i = 0; i < newFigures.length; i += 4) {
				const row: Figure[] = newFigures.slice(i, i + 4);
				array4x4.push(row);
			}
			copyOfTable.options.figures = array4x4;
			// update the image
			const newImageURL = await getURLImage(copyOfTable);
			copyOfTable.imageURL = newImageURL;
			updateTable(copyOfTable);
		}
		// Move
		else if (selectedTool.id === DEFAULT_TOOLS[1].id) {
			if (currentFigure) {
				if (!selectedFigure) {
					setIsSelected(true);
					setSelectedFigure({ index, figure: currentFigure });
				} else {
					if (selectedFigure.index === index) {
						setSelectedFigure(null);
					} else {
						const copyOfTable = currentTable;

						// Hacer copia de las figuras
						const newFigures = currentTable.options.figures.flat();

						const copyOfCurrentFigure = currentFigure;
						// const copyOfSelectedFigure = selectedFigure.figure;

						newFigures[index] = selectedFigure.figure;
						newFigures[selectedFigure.index] = copyOfCurrentFigure;

						// Convertir el array unidimensional en un array bidimensional 4x4
						const array4x4: Figure[][] = [];
						for (let i = 0; i < newFigures.length; i += 4) {
							const row: Figure[] = newFigures.slice(i, i + 4);
							array4x4.push(row);
						}

						// New table with updated positions
						copyOfTable.options.figures = array4x4;

						// update the image
						const newImageURL = await getURLImage(copyOfTable);
						copyOfTable.imageURL = newImageURL;

						updateTable(copyOfTable);
						setSelectedFigure(null);
					}
				}
			}
		}
	};

	return (
		<>
			{tableSize && (
				<div
					className={cn(
						"relative cursor-pointer",
						Number(tableSize) === 2 && "h-1/2 w-1/2",
						Number(tableSize) === 4 && "h-1/4 w-1/4",
						Number(tableSize) === 5 && "h-1/5 w-1/5",
					)}
					onClick={handleClickFigure}
				>
					<motion.img
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.12 }}
						src={currentFigure.imageURL}
						alt=""
						className="box-border h-full w-full border-collapse border border-base-100 border-opacity-30 object-contain object-center"
					/>
					<div
						className={cn(
							"absolute top-0 right-0 flex h-full w-full flex-col items-center justify-center bg-primary/50 opacity-0 transition-all duration-300 ease-out",
							isSelected && "opacity-100",
						)}
					/>
				</div>
			)}
		</>
	);
};
