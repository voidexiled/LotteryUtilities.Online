import type { FiguresContextType, TablesContextType } from "@/vite-env";
import { useContext, useEffect, useState } from "react";

import { TablesContext } from "@/contexts/TablesContext";

import "../../styles/cmdk.css";

import { ToastContainer } from "react-toastify";
import { LoadingScreen } from "../LoadingScreen";
import { CanvasWrapper } from "./canvas-wrapper/CanvasWrapper";
import { LeftBar } from "./left-bar/LeftBar";
import { RightBar } from "./right-bar/RightBar";
import "react-toastify/dist/ReactToastify.css";
import { FiguresContext } from "@/contexts/FiguresContext";
import {
	type Command,
	CommandMenu,
	CommandWrapper,
	useCommands,
	useKmenu,
} from "kmenu";
import { type CategoryCommand, CommandWithIndex } from "kmenu/dist/types";
import { ImagePlay, ImageUp, SettingsIcon, UnlinkIcon } from "lucide-react";

type cmdPages = "root" | "figure-selector";
export const MainComponent = () => {
	const { currentTable, tables, setCurrentTable, removeTable } = useContext(
		TablesContext,
	) as TablesContextType;
	const { input, open, setOpen, toggle } = useKmenu();
	const { figures, currentFigure, setCurrentFigure } = useContext(
		FiguresContext,
	) as FiguresContextType;

	const mainCommands: Command[] = [
		{
			category: "Herramientas",
			commands: [
				{
					icon: <ImagePlay />,
					text: "Selector de figuras",
					keywords: "selector,figuras,seleccionar",
					perform: () => setOpen(2),
				},
			],
		},
		{
			category: "Configuración",
			commands: [
				{
					icon: <SettingsIcon />,
					text: "Perfiles",
					keywords: "perfiles,configuracion,editar",
					closeOnComplete: false,
				},
			],
		},
	];

	const commandsFigureSelector: Command[] = [
		{
			category: "Figuras",
			commands: [

			],
		},
	];

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {

		const figs = figures.map((fig) => {
			const cmd: CategoryCommand = {

				text: `${fig.name.toUpperCase()}`,
				keywords: fig.name.split(" ").join(","),
				perform: () => setCurrentFigure(fig),
			};
			return cmd;
		});
		commandsFigureSelector[0].commands.push(...figs);
		console.log(figures);
		setCommandsFigure(commandsFigureSelector);
	}, [figures]);



	const [commands] = useCommands(mainCommands);
	const [commandsFigure, setCommandsFigure] = useCommands(
		commandsFigureSelector,
	);

	return (
		<>
			<main className="relative flex h-full w-full flex-col overflow-hidden p-4 pt-0 lg:flex-row lg:pt-4">
				<LoadingScreen />
				<LeftBar />
				<CanvasWrapper
					tables={tables}
					currentTable={currentTable}
					setCurrentTable={setCurrentTable}
				/>
				<RightBar />
				<ToastContainer
					position="bottom-center"
					stacked
					closeOnClick
					closeButton
				/>
				<CommandWrapper>
					<CommandMenu
						placeholder="Que quieres hacer?"
						commands={commands}
						crumbs={["Comandos"]}
						index={1}
					/>
					<CommandMenu
						placeholder="La araña..."
						commands={commandsFigure}
						crumbs={["Comandos", "Figuras"]}
						index={2}
					/>
				</CommandWrapper>
				<div className="fixed right-2 bottom-4 z-50 flex h-12 flex-col gap-2 p-4 lg:hidden">
					<button
						type="button"
						className="btn btn-sm btn-outline btn-primary"
						onClick={toggle}
					>
						Abrir cmdk
					</button>
				</div>
			</main>
		</>
	);
};
