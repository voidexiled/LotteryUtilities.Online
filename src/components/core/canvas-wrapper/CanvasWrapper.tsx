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
		<div className="order-3 flex h-[calc(100vh-50px)] grow flex-col items-center justify-center rounded-lg lg:order-2 lg:h-full lg:px-[48px]">
			<div className="flex h-[60px] w-full flex-row items-center justify-center">
				<div className={cn("flex cursor-pointer flex-row items-center gap-3 opacity-0 transition-all", thereAreFiguresRepeated() && "opacity-100")}
				>
					<span className="">
						Hay figuras repetidas!
					</span>
					<InfoIcon className="h-4 w-4 text-secondary" />

				</div>
			</div>
			<div className="flex w-full grow flex-row items-center justify-between p-2">
				<div className="flex flex-col items-center justify-between">
					<button
						type="button"
						disabled={!thereArePreviousTable()}
						className={cn(
							"group btn-md btn btn-circle btn-ghost flex flex-row items-center justify-center p-0 opacity-0 hover:bg-accent/10 hover:shadow-accent/10 hover:shadow-xl focus:outline-none",
							thereArePreviousTable() && "opacity-100",
						)}
						onClick={previousTable}
					>
						<ChevronLeft className="h-7 w-7 text-primary transition-all duration-200 ease-out group-hover:scale-110" />
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
							"group btn-md btn btn-circle btn-ghost flex flex-row items-center justify-center p-0 opacity-0 hover:bg-accent/10 hover:shadow-accent/10 hover:shadow-xl focus:outline-none",
							thereAreNextTable() && "opacity-100",
						)}
						onClick={nextTable}
					>
						<ChevronRight className="h-7 w-7 text-primary transition-all duration-200 ease-out group-hover:scale-110" />
					</button>
				</div>
			</div>
		</div>
	);
};
