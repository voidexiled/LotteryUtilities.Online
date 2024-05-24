import { createCanvas, loadImage } from "canvas";
import clsx from "clsx";
import type { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { generateRandomMatrix, getRandom } from "./tables";

import type { Figure, Profile, Table, TableOptions } from "@/vite-env";
import { v4 as uuidv4 } from "uuid";
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export async function generateRandomTable(
	profile: Profile,
	figures: Figure[],
	n: number,
	min: number,
	max: number,
): Promise<Table> {
	const customPositionsComodin = profile.tableOptions.comodinPosition;
	const tableSize: number = profile.tableOptions.size === "4x4" ? 4 : 5;

	// let tableIndex = 0;
	// let tablesLength = tables.length;
	// let lastTableId = 0;
	// if (tablesLength > 0) {
	// 	lastTableId = tables[tablesLength - 1].id;
	// }
	// let shouldPlusToIndex: boolean = lastTableId === tableIndex;

	// while (shouldPlusToIndex) {
	// 	lastTableId++;
	// 	tableIndex++;
	// 	shouldPlusToIndex = lastTableId === tableIndex;
	// }

	// console.log(tableIndex);
	const tableIndex = uuidv4();
	const options: TableOptions = {
		size: profile.tableOptions.size,
		figures: [],
	};
	const newTable: Table = {
		id: tableIndex,
		name: `Table ${tableIndex}`,
		date: new Date().toISOString(),
		imageURL: "",
		options: options,
	};

	const figuresToSkip = profile.tableOptions.comodin || undefined; // Omitimos los comodines en la generacion de la matriz
	const matrix = generateRandomMatrix(n, min, max, figuresToSkip);
	const newMatrix: number[][] = []; // creamos una matriz vacia de numeros en la que modificaremos para insertar los comodines en sus posiciones especificadas en el profile
	let figuresInTable: (Figure | undefined)[][]; // Aqui convertiremos la number[][] en Figure[][] al final de la insercion de los comodines

	if (customPositionsComodin) {
		const matrixFlat = matrix.flat(); // Operaremos con la matriz en flat
		const usedOnes: number[] = []; // Aqui guardaremos los numeros que ya se han usado (indices de la matriz)
		// Esto se itera por cada comodin que hay que tomar en cuenta
		customPositionsComodin.map((customPosition) => {
			//* 	Cuando hablamos de "positions" hablamos del index en la matrixFlat 	*//
			const min = Math.min(...customPosition.positions); // El minimo y el maximo numero que existe en las posiciones del comodin en cuestión
			const max = Math.max(...customPosition.positions);

			let randomChoice: number; // Esta variable se ocupara para elegir un numero entre min - max
			let isUsed = false; // Aqui guardaremos la evaluación lógica de si el randomChoice
			let positionIsValid = true; // Aqui validaremos que el randomChoice generado sea especificamente uno de los valores que hay en 'customPosition.positions'

			do {
				randomChoice = getRandom(min, max);

				// Re asignación de las variables logicas después de generar un nuevo randomChoice
				isUsed = usedOnes.includes(randomChoice);
				positionIsValid = !customPosition.positions.includes(randomChoice);
			} while (positionIsValid || isUsed);

			// Una vez que el randomChoice sea valido, le asignamos a la matrixFlat el figureId correspondiente al comodin
			matrixFlat[randomChoice] = customPosition.figureId;
			// Y registramos en usedOnes el randomChoice que ya ocupamos
			usedOnes.push(randomChoice);
		});

		// Convertimos la matrixFlat: number[] en matrix: number[][]
		for (let i = 0; i < matrixFlat.length; i += tableSize) {
			const row: number[] = matrixFlat.slice(i, i + tableSize);
			newMatrix.push(row);
		}

		// Obtenemos las figuras correspondientes a su figureId que se encuentra en la newMatrix
		figuresInTable = newMatrix.map((row) =>
			row.map((value) => figures.find((f) => f.id === value)),
		);
	} else {
		// Si no hay comodines, se obtienen las figuras de la matriz como comunmente se haría
		figuresInTable = matrix.map((row) =>
			row.map((value) => figures.find((f) => f.id === value)),
		);
	}

	newTable.options.figures = figuresInTable as Figure[][];

	newTable.imageURL = await getURLImage(newTable);

	return newTable;
}

export async function generateTableImage(table: Table) {
	const size = table.options.size.charAt(0) === "4" ? 4 : 5;
	const canvasWidth: number = 800;
	const canvasHeight: number = 1200;

	const imgWidth = canvasWidth / size;
	const imgHeight = canvasHeight / size;

	const canvas = createCanvas(canvasWidth, canvasHeight);
	const ctx = canvas.getContext("2d");
	ctx.quality = "fast";
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, canvasWidth, canvasHeight);
	const flatFigures = table.options.figures.flat();

	let currentX = 0;
	let currentY = 0;

	for (let i = 0; i < flatFigures.length; i++) {
		const figure = flatFigures[i];
		const img = await loadImage(figure.imageURL);
		ctx.drawImage(img, currentX, currentY, imgWidth, imgHeight);

		ctx.strokeStyle = "#000";
		ctx.lineWidth = 2;
		ctx.strokeRect(currentX, currentY, imgWidth, imgHeight);

		currentX += imgWidth;
		if (currentX >= canvasWidth) {
			currentX = 0;
			currentY += imgHeight;
		}
	}
	return canvas;
}
export async function getURLImage(table: Table) {
	const url = await generateTableImage(table).then((canvas) => {
		return canvas.toDataURL();
	});
	return url;
}

export async function uploadImage(file: File) {
	if (!file.type.includes("image")) return;
	const canvasWidth: number = 800 / 4;
	const canvasHeight: number = 1200 / 4;

	const canvas = createCanvas(canvasWidth, canvasHeight);
	const ctx = canvas.getContext("2d");
	ctx.quality = "fast";
	const img = await loadImage(URL.createObjectURL(file));
	ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
	return canvas.toDataURL();
}

export const handleOpacityOnLoadImage = (
	e: React.SyntheticEvent<HTMLImageElement, Event>,
) => {
	e.currentTarget.classList.remove("opacity-0");
	e.currentTarget.classList.add("opacity-100");
};
