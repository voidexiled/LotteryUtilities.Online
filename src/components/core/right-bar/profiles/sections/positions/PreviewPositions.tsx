import { cn } from "@/utils/utils";
import type { FigurePosition } from "@/vite-env";
import { PreviewCell } from "./PreviewCell";

type PreviewPositionsProps = {
	tableSize: "2x2" | "4x4" | "5x5";
	positions: FigurePosition[] | null;
	className?: string;
} & React.HTMLAttributes<HTMLDivElement>;
export const PreviewPositions = ({
	tableSize,
	positions,
	...props
}: PreviewPositionsProps) => {
	const tableSizeNumber = Number.parseInt(tableSize[0]);
	// const [currentPositions, setCurrentPositions] = useState<
	// 	FigurePosition[] | undefined
	// >([]);

	// const handlePushNewPosition = (flatIndex: number) => {};

	return (
		<div
			className={cn(
				"relative grid h-[420px] w-[320px] gap-2 rounded-lg bg-base-300 p-3 shadow-[inset_-12px_-8px_40px_#46464620] shadow-black/20 md:h-[260px] md:w-[180px]",
				tableSize === "2x2" && "grid-cols-2 grid-rows-2",
				tableSize === "4x4" && "grid-cols-4 grid-rows-4",
				tableSize === "5x5" && "grid-cols-5 grid-rows-5",
			)}
			{...props}
		>
			{Array.from({ length: tableSizeNumber * tableSizeNumber }, (_, i) => {
				const current = positions?.find((pos) => pos.positions.includes(i));
				console.log(i, current);
				return (
					<PreviewCell
						occurrence={current}
						flatIndex={i}
						className="h-full w-full"
						tableSize={tableSizeNumber}
						key={`cell-${i}-${_}`}
					/>
				);
			})}
		</div>
	);
};
