import type { TablesContextType } from "@/vite-env";
import { useContext } from "react";

import { TablesContext } from "@/contexts/TablesContext";
import { ToastContainer } from "react-toastify";
import { LoadingScreen } from "../LoadingScreen";
import { CanvasWrapper } from "./canvas-wrapper/CanvasWrapper";
import { LeftBar } from "./left-bar/LeftBar";
import { RightBar } from "./right-bar/RightBar";
import "react-toastify/dist/ReactToastify.css";
export const MainComponent = () => {
	const { currentTable, tables, setCurrentTable, removeTable } = useContext(
		TablesContext,
	) as TablesContextType;

	return (
		<main className="w-full h-full flex flex-col lg:flex-row p-4 pt-0 lg:pt-4 overflow-hidden relative">
			<LoadingScreen />
			<LeftBar />
			<CanvasWrapper
				tables={tables}
				currentTable={currentTable}
				setCurrentTable={setCurrentTable}
			/>
			<RightBar removeTable={removeTable} tables={tables} />
			<ToastContainer position="bottom-center" />
		</main>
	);
};
