import type { ReactNode } from "react";
import { FiguresContext } from "./contexts/FiguresContext";
/// <reference types="vite/client" />
export type TableSize = {
	width: number;
	height: number;
};

export type TableOptionsProfile = {
	size: "4x4" | "5x5";
	comodin: number[] | null;
	comodinPosition: { figureId: number; positions: number[] }[] | null;
};

export type PDFOptionsProfile = {
	paperSize: string;
	tableSize: TableSize;
};

export type Profile = {
	name: string;
	pdfOptions: PDFOptionsProfile;
	tableOptions: TableOptionsProfile;
};

export type Tool = {
	id: number;
	name: string;
	icon: string | ReactNode;
	description: string;
	keyboard_shortcut: string;
};
export type ToolsContextType = {
	selectedTool: Tool | null;
	tools: Tool[];
	setSelectedTool: (tool: Tool | null) => void;
};

export type ProfileContextType = {
	setProfile: (profile: Profile) => void;
	profile: Profile;
};

export type TablesContextType = {
	tables: Table[];
	currentTable: Table | null;
	setCurrentTable: (table: Table | null) => void;
	setTables: (tables: Table[]) => void;
	addTable: (table: Table) => void;
	addTables: (tables: Table[]) => void;
	removeTable: (id: string) => void;
	emptyTables: () => void;
	updateTable: (table: Table) => void;
	getTable: (id: string) => Table | null;
	loading: boolean;
	transformingToDataUrl: boolean;
	totalTables: number;
	currentLoaded: number;
};

export type TablesOptionSizes = "4x4" | "5x5";

export type FiguresContextType = {
	loading: boolean;
	setCurrentFigure: (figure: Figure) => void;
	currentFigure: Figure | null;
	figures: Figure[];
	setFigures: (figures: Figure[]) => void;
	addFigure: (figure: Figure) => void;
	removeFigure: (id: number) => void;
	updateFigure: (figure: Figure) => void;
	getFigure: (id: number) => Figure | null;
};

export type Figure = {
	id: number;
	name: string;
	imageURL?: string;
	src?: string;
};

export type FigurePosition = {
	figureId: number;
};

export type TableOptions = {
	size: "4x4" | "5x5";
	figures: Figure[][];
};

export type Table = {
	id: string;
	name: string;
	date: string;
	options: TableOptions;
	imageURL?: string;
};
