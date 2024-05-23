import { DEFAULT_TOOLS } from "@/consts/ToolsConsts";
import { FiguresContext } from "@/contexts/FiguresContext";
import { ToolsContext } from "@/contexts/ToolsContext";
import { cn, getURLImage } from "@/utils/utils";
import type { Figure, FiguresContextType, Table, TablesContextType, ToolsContextType } from "@/vite-env";
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
	const { currentFigure: figurePaletteSelected } = useContext(FiguresContext) as FiguresContextType;
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
	}, [selectedTool]);

	useEffect(() => {
		setSelectedFigure(null);
		setIsSelected(false);
	}, [currentTable]);

	// Tool 0
	const handleToolReplaceFigure = async () => {
		if (figurePaletteSelected) {
			// Lógica para la herramienta de paleta de figuras
		}

	}

	//Tool 1
	const handleToolSwapFigures = async () => {
		if (!currentFigure || !currentTable) return;

		if (!selectedFigure) {
			setIsSelected(true);
			setSelectedFigure({ index, figure: currentFigure });
			return;
		}

		if (selectedFigure.index === index) {
			setSelectedFigure(null);
			return;
		}

		const copyOfTable = { ...currentTable };
		const newFigures = [...currentTable.options.figures.flat()];

		newFigures[index] = selectedFigure.figure;
		newFigures[selectedFigure.index] = currentFigure;
		const tableSize = currentTable.options.size === "4x4" ? 4 : 5;
		const arraySizeXSize = Array.from({ length: tableSize }, (_, i) => newFigures.slice(i * tableSize, i * tableSize + tableSize));
		copyOfTable.options.figures = arraySizeXSize;

		const newImageURL = await getURLImage(copyOfTable);
		copyOfTable.imageURL = newImageURL;

		updateTable(copyOfTable);
		setSelectedFigure(null);
	}

	const handleInteract = () => {
		async () => {
			if (!selectedTool) return;
			switch (selectedTool.id) {
				case DEFAULT_TOOLS[0].id:
					await handleToolReplaceFigure();
					break;
				case DEFAULT_TOOLS[1].id:
					await handleToolSwapFigures();
					break;
				default:
					break;
			}
		}
	}

	return (
		<>
			{tableSize && (
				<div
					className={cn(
						"cursor-pointer relative  ",
						tableSize === 4 ? "w-1/4 h-1/4" : "w-1/5 h-1/5  ",
					)}
					onClick={handleInteract}
				>
					<motion.img
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.12 }}
						src={currentFigure.imageURL}
						alt=""
						className="object-contain object-center w-full h-full box-border border border-base-100 border-opacity-30 border-collapse "
					/>
					<div
						className={cn(
							"absolute top-0 right-0 w-full h-full flex flex-col justify-center items-center bg-primary/50 opacity-0 transition-all duration-300 ease-out",
							isSelected && "opacity-100",
						)}
					/>
				</div>
			)}
		</>
	);
};
