import "../../styles/cmdk.css";

import type { FiguresContextType, TablesContextType } from "@/vite-env";
import { useContext, useEffect, useState } from "react";

import { TablesContext } from "@/contexts/TablesContext";

import { ToastContainer } from "react-toastify";
import { LoadingScreen } from "../LoadingScreen";
import { CanvasWrapper } from "./canvas-wrapper/CanvasWrapper";
import { LeftBar } from "./left-bar/LeftBar";
import { RightBar } from "./right-bar/RightBar";
import "react-toastify/dist/ReactToastify.css";
import { FiguresContext } from "@/contexts/FiguresContext";
import { Button, Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import {
	type Command,
	CommandMenu,
	CommandWrapper,
	useCommands,
	useKmenu,
} from "kmenu";
import type { CategoryCommand } from "kmenu/dist/types";
import { FolderCog2Icon, ImagePlay, UserCog2Icon } from "lucide-react";

export const MainComponent = () => {
	const { currentTable, tables, setCurrentTable } = useContext(
		TablesContext,
	) as TablesContextType;
	const { setOpen, toggle } = useKmenu();
	const { figures, setCurrentFigure } = useContext(
		FiguresContext,
	) as FiguresContextType;


	const [isOpenDialog, setIsOpenDialog] = useState(false);



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
					icon: <UserCog2Icon />,
					text: "Perfiles",
					keywords: "añadir,perfiles,configuracion,editar,eliminar",
					perform: () => setOpen(3),
				},
				{
					icon: <FolderCog2Icon />,
					text: "Figuras",
					keywords: "añadir,figuras,configuracion,editar,eliminar",
					perform: () => {
						setIsOpenDialog(true);
					},

				}
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

	const [rootCommands] = useCommands(mainCommands);
	const [toolFigureSelectorCommands, setToolFigureSelectorCommands] = useCommands(
		commandsFigureSelector,
	);

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
				<Transition appear show={isOpenDialog}>
					<Dialog as="div" className="relative z-30 focus:outline-none" onClose={() => {
						setIsOpenDialog(false);
					}}>
						<TransitionChild
							enter="delay-100"
							enterFrom="opacity-0 transform-[scale(95%)]"
							enterTo="opacity-100 transform-[scale(100%)]"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 transform-[scale(100%)]"
							leaveTo="opacity-0 transform-[scale(95%)]"
						>
							<div className="fixed inset-0 flex w-screen items-center justify-center p-4 backdrop-blur-[3px] transition-all">


								<DialogPanel className="w-full max-w-md rounded-xl bg-base-200 p-6 backdrop-blur-2xl">
									<DialogTitle as="h3" className="text-base/7 font-medium text-white">
										Payment successful
									</DialogTitle>
									<p className="mt-2 text-sm/6 text-white/50">
										Your payment has been successfully submitted. We’ve sent you an email with all of the details of
										your order.
									</p>
									<div className="mt-4">
										<Button
											className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
											onClick={() => {
												setIsOpenDialog(false);
											}}
										>
											Got it, thanks!
										</Button>
									</div>
								</DialogPanel>
							</div>
						</TransitionChild>

					</Dialog>

				</Transition>



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
