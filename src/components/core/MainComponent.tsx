import { ProfileContext } from "@/contexts/ProfileContext";
import type {
	FiguresContextType,
	ProfileContextType,
	TablesContextType,
} from "@/vite-env";
import { useContext } from "react";

import { TablesContext } from "@/contexts/TablesContext";
import { CanvasWrapper } from "./canvas-wrapper/CanvasWrapper";
import { LeftBar } from "./left-bar/LeftBar";
import { RightBar } from "./right-bar/RightBar";
import { FiguresContext } from "@/contexts/FiguresContext";
import { LoadingScreen } from "../LoadingScreen";
import { Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { X } from "lucide-react";
export const MainComponent = () => {
	const { currentTable, tables, addTable, setCurrentTable, removeTable } =
		useContext(TablesContext) as TablesContextType;
	const { figures } = useContext(FiguresContext) as FiguresContextType;
	const { profile } = useContext(ProfileContext) as ProfileContextType;
	return (
		<main className="w-full h-full flex flex-col lg:flex-row p-4 pt-0 lg:pt-4 overflow-hidden relative">
			<LoadingScreen />
			<LeftBar />
			<CanvasWrapper
				tables={tables}
				currentTable={currentTable}
				setCurrentTable={setCurrentTable}
			/>
			<RightBar
				removeTable={removeTable}
				setCurrentTable={setCurrentTable}
				tables={tables}
			/>
			<ToastContainer position="bottom-center" />
		</main>
	);
};
