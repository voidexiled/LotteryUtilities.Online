import { ProfileContext } from "@/contexts/ProfileContext";
import { cn } from "@/utils/utils";
import type { Figure, FigurePosition, ProfileContextType } from "@/vite-env";
import { motion } from "framer-motion";
import { TrashIcon } from "lucide-react";
import { useContext } from "react";

type FormListItemProps = {
	item: FigurePosition | undefined;
	figure: Figure | undefined;
};

export const ComodinListItem = ({ item, figure }: FormListItemProps) => {
	const { selectedComodin, setSelectedComodin, localProfile, setLocalProfile } =
		useContext(ProfileContext) as ProfileContextType;
	if (!item || !figure)
		return (
			<div className="flex h-14 grow flex-row items-center gap-5 overflow-hidden rounded-md bg-base-200 px-4 text-sm md:h-8">
				No existente
			</div>
		);

	const handleDeleteComodinPosition = () => {
		if (!localProfile) return;

		const _localProfile = { ...localProfile };

		if (!_localProfile.tableOptions.comodinPosition) {
			_localProfile.tableOptions.comodinPosition = [];
		}
		if (!_localProfile.tableOptions.comodin) {
			_localProfile.tableOptions.comodin = [];
		}

		if (
			_localProfile.tableOptions.comodinPosition.filter(
				(pos) => pos.figureId === item.figureId,
			).length === 1
		) {
			_localProfile.tableOptions.comodin =
				_localProfile.tableOptions.comodin.filter((id) => id !== item.figureId);
		}
		_localProfile.tableOptions.comodinPosition =
			_localProfile.tableOptions.comodinPosition.filter(
				(pos) => pos.id !== item.id,
			);

		setLocalProfile({ ..._localProfile });
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.18, type: "tween" }}
			className={cn(
				"flex h-14 grow cursor-pointer flex-row items-center gap-2 overflow-hidden rounded-md bg-base-200 px-4 text-sm transition-all md:h-8",
				selectedComodin?.id === item.id &&
					"bg-secondary shadow-[0px_0px_12px_2px_#7b68ee]",
			)}
			onClick={(e) => {
				e.preventDefault();
				e.stopPropagation();
				// console.log(selectedComodin?.id);
				// console.log(item.id);
				// console.log(selectedComodin?.id === item.id);

				if (selectedComodin?.id === item.id) {
					setSelectedComodin(null);
					return;
				}

				setSelectedComodin(item);
			}}
		>
			<span className="w-4 grow">{`${item.id}`}</span>
			<span className="grow overflow-hidden text-ellipsis text-nowrap">
				{/* {`${figure?.id}.-${figure?.name}`} */}
				{figure.name}
			</span>
			<TrashIcon
				className="h-6 min-h-6 w-6 min-w-6 justify-self-end rounded-sm p-1 text-error transition-all hover:bg-error/25"
				onClick={(e) => {
					e.preventDefault();
					e.stopPropagation();
					handleDeleteComodinPosition();
				}}
			/>
		</motion.div>
	);
};
