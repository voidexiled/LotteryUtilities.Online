import { ProfileContext } from "@/contexts/ProfileContext";
import { cn } from "@/utils/utils";
import type { FigurePosition, ProfileContextType } from "@/vite-env";
import clsx from "clsx";
import { useContext, useEffect, useState } from "react";

type PreviewCellProps = {
	flatIndex: number;
	tableSize: number;
	figureId?: number | undefined | null;
	occurrences?: FigurePosition[] | undefined;
	className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export const PreviewCell = ({
	flatIndex,
	tableSize,
	figureId,
	occurrences,
	className,
	...props
}: PreviewCellProps) => {
	const [isActive, setActive] = useState(false);

	const {
		selectedComodin,
		setSelectedComodin,
		localProfile,
		setLocalProfile,
		selectedPosition,
		setSelectedPosition,
	} = useContext(ProfileContext) as ProfileContextType;

	const handleTogglePosition = (posFlatIndex: number) => {
		if (!localProfile) return;
		const _localProfile = { ...localProfile };
		if (!selectedComodin) return;
		// Si son null, inicializarlas como array vacio
		if (!_localProfile.tableOptions.comodinPosition) {
			_localProfile.tableOptions.comodinPosition = [];
		}
		if (!_localProfile.tableOptions.comodin) {
			_localProfile.tableOptions.comodin = [];
		}
		// Obtenemos el ultimo id de las posiciones
		const lastId: number = Math.max(
			..._localProfile.tableOptions.comodinPosition.map((pos) => pos.id),
			0,
		);
		// Creamos el nuevo objeto que reemplazara al anterior
		const newPosition: FigurePosition = {
			id: lastId + 1,
			figureId: selectedComodin.figureId,
			positions: selectedComodin.positions,
		};

		// Obtenemos el indice del objetivo en el array de objetos local
		const targetIndex = _localProfile.tableOptions.comodinPosition?.findIndex(
			(pos) => pos.id === selectedComodin.id,
		);
		console.log(_localProfile.tableOptions.comodinPosition);
		console.log("targetIndex", targetIndex);

		// Si se encuentra, se pone el mismo ID al nuevo objeto que tenia el anterior
		// y se reemplaza con el nuevo objeto
		if (targetIndex !== -1) {
			newPosition.id = selectedComodin.id;
			console.log("Si se encontro");
			console.log("newPosition.id", selectedComodin.id);
			if (newPosition.positions.includes(posFlatIndex)) {
				newPosition.positions = newPosition.positions.filter(
					(pos) => pos !== posFlatIndex,
				);
				console.log(
					"incluye la posicion, newPosition.positions",
					newPosition.positions,
				);
			} else {
				newPosition.positions.push(posFlatIndex);
				console.log("no la incluye", newPosition.positions);
			}
			console.log("Final newPosition", newPosition);
			_localProfile.tableOptions.comodinPosition[targetIndex] = newPosition;
		} else {
			// Si no se encuentra, se pushea el nuevo objeto con el nuevo id
			newPosition.positions.push(posFlatIndex);
			_localProfile.tableOptions.comodinPosition.push(newPosition);
		}

		// Si el comodin no esta en la lista de comodines, se pushea
		if (
			!_localProfile.tableOptions.comodin?.includes(selectedComodin.figureId)
		) {
			_localProfile.tableOptions.comodin.push(selectedComodin.figureId);
		}
		setLocalProfile(_localProfile);
		setSelectedPosition(newPosition.id);
		setSelectedComodin(newPosition);
	};

	useEffect(() => {
		if (!selectedPosition) {
			setActive(false);
			return;
		}

		if (!occurrences || occurrences.length === 0) {
			setActive(false);
			return;
		}

		const targetPositions = occurrences.find(
			(occ) => occ.id === selectedPosition,
		);

		if (!targetPositions || !targetPositions.positions.includes(flatIndex)) {
			setActive(false);
			return;
		}
		setActive(true);

		// if (!occurrences || occurrences.length === 0) {
		// 	setActive(false);
		// 	return;
		// }
		// console.log(occurrences);
		// occurrences.map((occ) => {
		// 	console.log({
		// 		occ,
		// 		selectedPosition,
		// 		flatIndex,
		// 	});
		// 	if (occ.id === selectedPosition && occ.positions.includes(flatIndex)) {
		// 		setActive(true);
		// 	}
		// });
	}, [occurrences, selectedPosition]);

	return (
		<div
			className={cn(
				"grid rounded-md bg-base-200 transition-all ease-in md:rounded-sm",
				tableSize === 2 && "h-1/2 w-1/2",
				tableSize === 3 && "h-1/3 w-1/3",
				tableSize === 4 && "h-1/4 w-1/4",
				tableSize === 5 && "h-1/5 w-1/5",
				isActive && "bg-primary shadow-[0px_0px_10px_1px_#8a2be2a0]",

				className,
			)}
			{...props}
			onClick={(e) => {
				e.preventDefault();
				e.stopPropagation();
				if (!selectedComodin) return;
				handleTogglePosition(flatIndex);
			}}
			onContextMenu={(e) => {
				e.preventDefault();
				e.stopPropagation();
				// setComodinStorage((prev) => {
				// 	if (!selectedComodin) return prev;
				// 	const index = prev.indexOf(selectedComodin);
				// 	if (index > -1) {
				// 		const newStorage = [...prev];
				// 		newStorage.splice(index, 1);
				// 		return newStorage;
				// 	}
				// 	return prev;
				// });
			}}
		>
			<span className={clsx("m-auto", isActive ? "opacity-100" : "opacity-0")}>
				{selectedPosition || ""}
			</span>
		</div>
	);
};
