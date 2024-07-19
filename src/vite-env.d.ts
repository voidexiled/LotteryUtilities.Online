import type { ReactNode } from "react";
import { FiguresContext } from "./contexts/FiguresContext";
/// <reference types="vite/client" />

export type PaperSize = "A4" | "A5" | "A6" | "Letter" | "Legal";

export type TableSize = {
	width: number;
	height: number;
};

export type TableOptionsProfile = {
	size: "2x2"|"4x4" | "5x5";
	comodin: number[] | null;
	comodinPosition: FigurePosition[] | null;
	random?: boolean;
	skipFigures?: number[] | null;
};

export type PDFOptionsProfile = {
	paperSize: PaperSize;
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

export type FlagsContextType = {
	showProfiles: boolean;
	showFigures: boolean;
	showTables: boolean;
	setShowProfiles: (show: boolean) => void;
	setShowFigures: (show: boolean) => void;
	setShowTables: (show: boolean) => void;
};
export type ToolsContextType = {
	selectedTool: Tool | null;
	tools: Tool[];
	setSelectedTool: (tool: Tool | null) => void;
	setTools: (tools: Tool[]) => void;
};

export type ProfileContextType = {
	setProfile: (name: string) => void;
	profile: Profile;
	updateProfile: (profileName: string, profile: Profile) => void;
	profiles: Profile[];
	addProfile: (profile: Profile) => void;
	deleteProfile: (name: string) => void;
	selectedComodin: FigurePosition | null;
	setSelectedComodin: (figurePosition: FigurePosition | null) => void;
	localProfile: Profile | null;
	setLocalProfile: (profile: Profile | null) => void;
	selectedPosition: number | null;
	setSelectedPosition: (position: number | null) => void;
	// setFallbackProfile: (profile: Profile | null) => void;
	// fallbackProfile: Profile | null;
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
	setCurrentFigure: (figure: Figure | null) => void;
	currentFigure: Figure | null;
	figures: Figure[];
	setFigures: (figures: Figure[]) => void;
	addFigure: (figure: Figure) => void;
	addFigures: (figures: Figure[]) => void;
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
	id: number;
	figureId: number;
	positions: number[];
} ;

export type TableOptions = {
	size: "2x2" | "4x4" | "5x5";
	figures: Figure[][];
};

export type Table = {
	id: string;
	name: string;
	date: string;
	options: TableOptions;
	imageURL?: string;
};
