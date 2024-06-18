import { ProfileContext } from "@/contexts/ProfileContext";
import { cn } from "@/utils/utils";
import type { FigurePosition, Profile, ProfileContextType } from "@/vite-env";
import { useContext, useEffect, useState } from "react";

type PreviewCellProps = {
	flatIndex: number;
	tableSize: number;
	figureId?: number | undefined | null;
	occurrence?: FigurePosition | undefined;
	className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export const PreviewCell = ({
	flatIndex,
	tableSize,
	figureId,
	occurrence,
	className,
	...props
}: PreviewCellProps) => {
	const [isActive, setActive] = useState(false);
	const [comodinStorage, setComodinStorage] = useState<FigurePosition[] | null>(
		[],
	);
	const { selectedComodin, setSelectedComodin, localProfile, setLocalProfile } =
		useContext(ProfileContext) as ProfileContextType;

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
		setSelectedComodin(newPosition);
	};

	useEffect(() => {
		if (!occurrence) {
			setActive(false);
			return;
		}
		setActive(true);
	}, [occurrence]);

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
			<span className="m-auto">{occurrence?.id}</span>
		</div>
	);
};
