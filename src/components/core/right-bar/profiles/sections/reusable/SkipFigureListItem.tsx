import { ProfileContext } from "@/contexts/ProfileContext";
import { cn } from "@/utils/utils";
import type { Figure, ProfileContextType } from "@/vite-env";
import { motion } from "framer-motion";
import { TrashIcon } from "lucide-react";
import { useContext } from "react";

type FormListItemProps = {
	figure: Figure | undefined;
};

export const SkipFigureListItem = ({ figure }: FormListItemProps) => {
	const { localProfile, setLocalProfile } = useContext(
		ProfileContext,
	) as ProfileContextType;

	if (!figure)
		return (
			<div className="flex h-14 grow flex-row items-center gap-5 overflow-hidden rounded-md bg-base-200 px-4 text-sm md:h-8">
				No existente
			</div>
		);

	const handleDeleteSkipFigure = () => {
		if (!localProfile) return;
		const _localProfile = { ...localProfile };

		if (!_localProfile.tableOptions.skipFigures) {
			_localProfile.tableOptions.skipFigures = [];
		}

		_localProfile.tableOptions.skipFigures =
			_localProfile.tableOptions.skipFigures.filter((id) => id !== figure.id);

		setLocalProfile(_localProfile);
	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.18, type: "tween" }}
			className={cn(
				"flex h-14 grow cursor-pointer flex-row items-center gap-2 overflow-hidden rounded-md bg-base-200 px-4 text-sm transition-all md:h-8",
			)}
		>
			<span className="w-4 grow">{`${figure.id}`}</span>
			<span className="grow overflow-hidden text-ellipsis text-nowrap">
				{/* {`${figure?.id}.-${figure?.name}`} */}
				{figure.name}
			</span>
			<TrashIcon
				className="h-6 min-h-6 w-6 min-w-6 justify-self-end rounded-sm p-1 text-error transition-all hover:bg-error/25"
				onClick={(e) => {
					e.preventDefault();
					e.stopPropagation();
					handleDeleteSkipFigure();
				}}
			/>
		</motion.div>
	);
};
