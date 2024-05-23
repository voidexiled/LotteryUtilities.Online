import { TableEditable } from "@/components/reusable/table/TableEditable";
import { cn } from "@/utils/utils";
import type { Figure, TablesContextType } from "@/vite-env";
import { AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, InfoIcon } from "lucide-react";
import { useEffect } from "react";

type CanvasWrapperProps = {
	currentTable: TablesContextType["currentTable"];
	tables: TablesContextType["tables"];

	setCurrentTable: TablesContextType["setCurrentTable"];
};

export const CanvasWrapper = ({
	currentTable,
	tables,

	setCurrentTable,
}: CanvasWrapperProps) => {
	// const { currentTable } = useContext(TablesContext) as TablesContextType;

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (currentTable) {
			if (!tables.includes(currentTable)) {
				setCurrentTable(null);
			}
		}
	}, [tables]);

	const nextTable = () => {
		const nextTableIndex =
			tables.findIndex((t) => t.id === currentTable?.id) + 1;
		if (nextTableIndex < tables.length) {
			setCurrentTable(tables[nextTableIndex]);
		}
	};

	const previousTable = () => {
		const previousTableIndex =
			tables.findIndex((t) => t.id === currentTable?.id) - 1;
		if (previousTableIndex >= 0) {
			setCurrentTable(tables[previousTableIndex]);
		}
	};

	const thereAreNextTable = () => {
		return (
			tables.findIndex((t) => t.id === currentTable?.id) + 1 < tables.length
		);
	};

	const thereArePreviousTable = () => {
		return tables.findIndex((t) => t.id === currentTable?.id) - 1 >= 0;
	};

	function findDuplicates(figures: Figure[]): Figure[] {
		const count: { [key: string]: number } = {};
		const duplicates: Figure[] = [];

		for (const figure of figures) {
			// We can use any unique property, here 'id' is chosen
			const id = figure.id.toString();

			if (count[id]) {
				count[id]++;
			} else {
				count[id] = 1;
			}
		}

		for (const figure of figures) {
			if (count[figure.id.toString()] > 1) {
				duplicates.push(figure);
			}
		}

		return duplicates;
	}



	const thereAreFiguresRepeated = () => {
		if (!currentTable) {
			return false;
		}
		const duplicates = findDuplicates(currentTable?.options.figures.flat());
		return duplicates.length > 0;
	};
	return (
		<div className=" flex flex-col rounded-lg justify-center items-center lg:px-[48px] order-3 lg:order-2 h-[calc(100vh-50px)] lg:h-full grow">
			<div className="w-full h-[60px] flex flex-row items-center justify-center">
				<div className={cn("flex flex-row items-center gap-3 opacity-0 transition-all cursor-pointer", thereAreFiguresRepeated() && "opacity-100")}
				>
					<span className="">
						Hay figuras repetidas!
					</span>
					<InfoIcon className="w-4 h-4 text-secondary" />

				</div>
			</div>
			<div className="w-full grow  flex flex-row items-center justify-between p-2">
				<div className="flex flex-col justify-between items-center">
					<button
						type="button"
						disabled={!thereArePreviousTable()}
						className={cn(
							"group btn-md btn btn-circle btn-ghost hover:bg-accent/10 hover:shadow-xl hover:shadow-accent/10 p-0 flex flex-row items-center justify-center focus:outline-none opacity-0",
							thereArePreviousTable() && "opacity-100",
						)}
						onClick={previousTable}
					>
						<ChevronLeft className="w-7 h-7 text-primary transition-all duration-200 group-hover:scale-110 ease-out" />
					</button>
				</div>

				<AnimatePresence mode="wait">
					<TableEditable
						key={
							currentTable
								? currentTable?.id + currentTable?.name
								: new Date().getTime().toString()
						}
					/>
				</AnimatePresence>

				<div>
					<button
						disabled={!thereAreNextTable()}
						type="button"
						className={cn(
							"group btn-md btn btn-circle btn-ghost hover:bg-accent/10 hover:shadow-xl hover:shadow-accent/10 p-0 flex flex-row items-center justify-center focus:outline-none opacity-0",
							thereAreNextTable() && "opacity-100",
						)}
						onClick={nextTable}
					>
						<ChevronRight className="w-7 h-7 text-primary transition-all duration-200 group-hover:scale-110 ease-out " />
					</button>
				</div>
			</div>
		</div>
	);
};
