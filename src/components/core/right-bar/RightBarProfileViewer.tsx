import { FiguresContext } from "@/contexts/FiguresContext";
import { ProfileContext } from "@/contexts/ProfileContext";
import { TablesContext } from "@/contexts/TablesContext";
import { cn, generateRandomTable } from "@/utils/utils";
import type {
	FiguresContextType,
	ProfileContextType,
	Table,
	TablesContextType,
} from "@/vite-env";
import { CheckIcon, Trash2Icon } from "lucide-react";
import { useContext, useRef, useState } from "react";
import { type Id, toast } from "react-toastify";

export const RightBarProfileViewer = () => {
	const { profile } = useContext(ProfileContext) as ProfileContextType;
	// const { tables, addTable, setCurrentTable } = useContext(
	// 	TablesContext,
	// ) as TablesContextType;
	const { emptyTables, addTables } = useContext(
		TablesContext,
	) as TablesContextType;
	const { figures } = useContext(FiguresContext) as FiguresContextType;
	const [tableQuantity, setTableQuantity] = useState(1);
	const [generatingTable, setGeneratingTable] = useState(false);
	const toastId = useRef<Id | null>(null);

	const notifyAddedAsync = () => {
		toastId.current = toast("Generando tablas...", {
			bodyStyle: { fontSize: "0.75rem" },
			progress: 0,
			hideProgressBar: false,
			autoClose: false,
			isLoading: true,
		});
	};

	const notifyDeleted = () =>
		toast("Se han eliminado todas las tablas correctamente.", {
			bodyStyle: { fontSize: "0.75rem" },
			icon: <Trash2Icon className="w-4 h-4 " />,
		});

	const handleGenerateTable = async (): Promise<Table | undefined> => {
		const newTable = await generateRandomTable(profile, figures, 4, 1, 54);
		if (newTable === null) return;
		return newTable;
	};

	return (
		<div className="flex flex-col text-xs h-fit lg:h-2/6">
			<div className="flex flex-col gap-1 grow ">
				<span className="text-secondary tracking-wider font-bold ">
					Perfil seleccionado:{" "}
					<span className={cn("font-normal invisible", profile && "visible")}>
						{profile.name}
					</span>
				</span>
				<div className="flex flex-col gap-1 text-xs pt-1 flex-1">
					<span className="text-secondary hidden lg:block">
						Table Options:{" "}
					</span>
					<div className="flex-row gap-4 p-1 flex-nowrap flex-1 overflow-x-scroll custom-scrollbar py-2 items-center hidden lg:hidden">
						{profile.tableOptions.comodin?.map((comodin, index) => {
							const figure = figures.find((f) => f.id === comodin);
							return (
								<div
									key={comodin + index}
									className="transition-all p-2 rounded-md border border-secondary hover:bg-secondary/75 cursor-pointer grow flex justify-center items-center flex-col min-w-[140px] max-w-[140px] max-h-[80px] "
								>
									<span>{figure?.name}</span>
									<br />
									<span>
										{profile.tableOptions.comodinPosition
											?.find((f) => f.figureId === comodin)
											?.positions.map((p) => p + 1)
											.join(",")}
									</span>
								</div>
							);
						})}
					</div>
					<div className="flex flex-col gap-2 text-xs pt-2">
						<div className="flex flex-row gap-2 items-center">
							<span>Cantidad</span>
							<input
								type="number"
								className="input input-sm lg:input-xs input-secondary grow"
								placeholder="Cantidad de tablas"
								value={tableQuantity}
								onChange={(e) =>
									setTableQuantity(e.target.value as unknown as number)
								}
							/>
						</div>
					</div>
					<div className="flex flex-row gap-2 text-xs pt-2">
						<button
							disabled={generatingTable}
							type="button"
							className="btn btn-accent btn-sm lg:btn-xs grow"
							onClick={async () => {
								const tablesToAdd: Table[] = [];
								setGeneratingTable(true);
								notifyAddedAsync();
								for (let i = 0; i < tableQuantity; i++) {
									await handleGenerateTable()
										.then((table) => {
											if (table) {
												tablesToAdd.push(table);
											}
										})
										.finally(() => {
											if (toastId.current) {
												toast.update(toastId.current, {
													progress: (i + 1) / tableQuantity,
												});
											}
										});
								}
								addTables(tablesToAdd);
								if (toastId.current) {
									toast.update(toastId.current, {
										icon: <CheckIcon className="w-4 h-4" />,
										progress: 1,
										isLoading: false,
									});
								}

								setGeneratingTable(false);
							}}
						>
							{generatingTable ? "Generando..." : "Generar Tabla"}
						</button>
						<button
							className="btn btn-error btn-sm lg:btn-xs flex justify-center items-center text-white"
							type="button"
							onClick={() => {
								emptyTables();
								notifyDeleted();
							}}
						>
							<span>Borrar todo</span>
							<Trash2Icon className="w-4 h-4 transition-all duration-200 group-hover:scale-110 ease-out" />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
