import "../../styles/cmdk.css";

import type { FiguresContextType, FlagsContextType, TablesContextType } from "@/vite-env";
import { useContext, useEffect, useState } from "react";

import { TablesContext } from "@/contexts/TablesContext";

import { Flip, ToastContainer, toast } from "react-toastify";
import { LoadingScreen } from "../LoadingScreen";
import { CanvasWrapper } from "./canvas-wrapper/CanvasWrapper";
import { LeftBar } from "./left-bar/LeftBar";
import { RightBar } from "./right-bar/RightBar";
import "react-toastify/dist/ReactToastify.css";
import { DEFAULT_FIGURES } from "@/consts/FiguresConsts";
import { FiguresContext } from "@/contexts/FiguresContext";
import { FlagsContext } from "@/contexts/FlagsContext";
import {
	type Command,
	CommandMenu,
	CommandWrapper,
	useCommands,
	useKmenu,
} from "kmenu";
import type { CategoryCommand } from "kmenu/dist/types";
import { BoxesIcon, CheckIcon, FolderCog2Icon, ImagePlay, ListRestartIcon, UserCog2Icon } from "lucide-react";
import { FigureManagerToolDialog } from "./tools/FigureManagerToolDialog";

export const MainComponent = () => {
	const { currentTable, tables, setCurrentTable } = useContext(
		TablesContext,
	) as TablesContextType;
	const { setOpen, toggle, open } = useKmenu();
	const { figures, setCurrentFigure, setFigures } = useContext(
		FiguresContext,
	) as FiguresContextType;


	const { showProfiles, showFigures, showTables, setShowProfiles, setShowFigures, setShowTables } = useContext(FlagsContext) as FlagsContextType;


	const [isOpenDialog, setIsOpenDialog] = useState(false);


	const templateSettingsCommands: CategoryCommand[] = [
		{
			icon: <UserCog2Icon />,
			text: `${showProfiles ? "Ocultar" : "Mostrar"} conf. de perfiles`,
			keywords: "mostrar perfiles",
			perform: () => toggleShowProfiles(),
		},
		{
			icon: <FolderCog2Icon />,
			text: `${showFigures ? "Ocultar" : "Mostrar"} conf. de figuras`,
			keywords: "mostrar figuras",
			perform: () => toggleShowFigures(),
		},
		{
			icon: <BoxesIcon />,
			text: `${showTables ? "Ocultar" : "Mostrar"} conf. de tablas`,
			keywords: "mostrar tablas",
			perform: () => toggleShowTables(),
		}
	]

	const notifyEnabledUi = (message: string) => {
		toast(message, {
			type: "success",
			transition: Flip,
			autoClose: 2200,
			bodyStyle: { fontSize: "0.75rem" },
			icon: <CheckIcon className="h-4 w-4" />,
		});
	}

	const mainCommands: Command[] = [
		{
			category: "Herramientas",
			commands: [
				{
					icon: <ImagePlay />,
					text: "Selector de figuras",
					keywords: "selector",
					perform: () => setOpen(2),
					shortcuts: { modifier: "ctrl", keys: ["f"] },
				},
			],
		},
		{
			category: "Configuración",
			commands: templateSettingsCommands
		},
		{
			category: "Restablecer",
			commands: [
				{
					icon: <ListRestartIcon />,
					text: "Restablecer figuras",
					keywords: "restablecer figuras",
					perform: () => {
						setFigures(DEFAULT_FIGURES);
						notifyEnabledUi("Se han restablecido las figuras correctamente.");
					}
				}
			]
		}
	];

	const toggleShowProfiles = () => {
		if (showFigures || showTables) {


			setShowProfiles(!showProfiles);
			notifyEnabledUi(`Se ha ${showProfiles ? "ocultado" : "habilitado"} la configuración de perfiles.`);
		}
	}
	const toggleShowFigures = () => {
		if (showProfiles || showTables) {
			setShowFigures(!showFigures);
			notifyEnabledUi(`Se ha ${showFigures ? "ocultado" : "habilitado"} la configuración de figuras.`);
		}
	}
	const toggleShowTables = () => {
		if (showProfiles || showFigures) {
			setShowTables(!showTables);
			notifyEnabledUi(`Se ha ${showTables ? "ocultado" : "habilitado"} la configuración de tablas.`);
		}
	}

	const commandsFigureSelector: Command[] = [
		{
			category: "Figuras",
			commands: [

			],
		},
	];

	const [rootCommands, setRootCommands] = useCommands(mainCommands);
	const [toolFigureSelectorCommands, setToolFigureSelectorCommands] = useCommands(
		commandsFigureSelector,
	);

	useEffect(() => {
		setRootCommands(mainCommands);
	}, [showFigures, showProfiles, showTables]);

	useEffect(() => {
		if (showFigures) {
			setShowProfiles(false);
			setShowTables(false);
		}
	}, [showFigures]);

	useEffect(() => {
		if (showProfiles) {
			setShowFigures(false);
			setShowTables(false);
		}
	}, [showProfiles]);

	useEffect(() => {
		if (showTables) {
			setShowProfiles(false);
			setShowFigures(false);
		}
	}, [showTables]);


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
		setToolFigureSelectorCommands(commandsFigureSelector);
	}, [figures]);


	useEffect(() => {
		const keyManagerListener = (e: KeyboardEvent) => {
			if (e.key === "f" && e.ctrlKey) {
				e.preventDefault();
				e.stopPropagation();
				setOpen(2);
			}

			if (open > 0 && e.key === "Escape") {
				e.preventDefault();
				e.stopPropagation();
				setOpen(0);
			}
		};

		document.addEventListener("keydown", keyManagerListener);


		return () => {
			document.removeEventListener("keydown", keyManagerListener);
		};
	});

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
						commands={rootCommands}
						crumbs={["Comandos"]}
						index={1}
					/>
					<CommandMenu
						placeholder="La araña..."
						commands={toolFigureSelectorCommands}
						crumbs={["Comandos", "Figuras"]}
						index={2}

					/>
				</CommandWrapper>
				<FigureManagerToolDialog isOpen={isOpenDialog} setIsOpen={setIsOpenDialog} />
				<div className="fixed right-2 bottom-4 z-50 flex h-12 flex-col gap-2 p-4 lg:hidden">
					<button
						type="button"
						className="btn btn-sm btn-outline btn-primary"
						onClick={toggle}
					>
						Cmd + k
					</button>
				</div>
			</main>
		</>
	);
};
