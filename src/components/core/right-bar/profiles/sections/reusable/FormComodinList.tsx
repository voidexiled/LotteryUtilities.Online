import { FiguresContext } from "@/contexts/FiguresContext";
import { ProfileContext } from "@/contexts/ProfileContext";
import { cn } from "@/utils/utils";
import type {
	Figure,
	FigurePosition,
	FiguresContextType,
	ProfileContextType,
} from "@/vite-env";
import { AnimatePresence } from "framer-motion";
import { useContext } from "react";
import { ComodinListItem } from "./ComodinListItem";
type FormListProps = {
	className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export const FormComodinList = ({ className, ...props }: FormListProps) => {
	const { localProfile } = useContext(ProfileContext) as ProfileContextType;
	const { figures } = useContext(FiguresContext) as FiguresContextType;
	// const { localProfile, setLocalProfile } = useContext(
	// 	ProfileContext,
	// ) as ProfileContextType;

	// const handleAddNewComodinPosition = () => {};

	return (
		<div
			className={cn(
				"custom-scrollbar h-[180px] gap-3 space-y-2 overflow-hidden overflow-y-auto scroll-smooth rounded-lg bg-base-300 p-3 shadow-[inset_-12px_-8px_40px_#46464620] shadow-black/20 xl:h-[260px]",
				className,
			)}
			{...props}
		>
			<AnimatePresence mode="sync">
				{/* <button
				onClick={handleAddNewComodinPosition}
				type="button"
				className="flex h-14 w-full grow flex-row items-center justify-center gap-5 overflow-hidden rounded-md bg-secondary/50 px-4 text-center text-sm transition-all md:h-8 active:scale-[0.99] hover:bg-secondary/70"
			>
				Añadir
			</button> */}

				{!localProfile?.tableOptions.comodinPosition ? (
					<></>
				) : (
					localProfile.tableOptions.comodinPosition.map(
						(item: FigurePosition) => {
							const fig = figures.find((f: Figure) => f.id === item.figureId);
							console.log(`${item.id}-${item.figureId}`);
							return (
								<ComodinListItem
									key={`${item.id}-${item.figureId}`}
									item={item}
									figure={fig}
								/>
							);
						},
					)
				)}
			</AnimatePresence>
		</div>
	);
};
