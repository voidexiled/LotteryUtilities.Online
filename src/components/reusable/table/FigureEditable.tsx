import { cn, getURLImage } from "@/utils/utils";
import type { Figure, Table, TablesContextType } from "@/vite-env";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
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

	return (
		<>
			{tableSize && (
				<div
					className={cn(
						"cursor-pointer relative  ",
						tableSize === 4 ? "w-1/4 h-1/4" : "w-1/5 h-1/5  ",
					)}
					onClick={async () => {
						if (currentFigure && currentTable) {
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
					}}
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
