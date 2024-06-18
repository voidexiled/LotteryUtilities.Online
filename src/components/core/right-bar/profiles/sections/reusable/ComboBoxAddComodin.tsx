import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { FiguresContext } from "@/contexts/FiguresContext";
import { ProfileContext } from "@/contexts/ProfileContext";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/utils/utils";
import type {
	Figure,
	FiguresContextType,
	ProfileContextType,
} from "@/vite-env";
import { PlusIcon } from "lucide-react";
import { useContext, useState } from "react";

export function ComboBoxAddComodin() {
	const { localProfile, setLocalProfile } = useContext(
		ProfileContext,
	) as ProfileContextType;
	const [open, setOpen] = useState(false);
	const isDesktop = useMediaQuery("(min-width: 768px)");
	const [selectedFigure, setSelectedFigure] = useState<Figure | null>(null);

	const handleAddNewComodin = () => {
		if (!localProfile || !selectedFigure) return;

		const _localProfile = { ...localProfile };

		if (!_localProfile.tableOptions.comodin) {
			_localProfile.tableOptions.comodin = [];
		}
		if (!_localProfile.tableOptions.comodinPosition) {
			_localProfile.tableOptions.comodinPosition = [];
		}

		if (!_localProfile.tableOptions.comodin.includes(selectedFigure.id)) {
			_localProfile.tableOptions.comodin.push(selectedFigure.id);
		}

		const lastIndex = Math.max(
			..._localProfile.tableOptions.comodinPosition.map((pos) => pos.id),
			0,
		);
		console.log(lastIndex);

		_localProfile.tableOptions.comodinPosition.push({
			id: lastIndex + 1,
			figureId: selectedFigure.id,
			positions: [],
		});

		setLocalProfile(_localProfile);

		// const lastIndex = localProfile.tableOptions.comodinPosition - 1;
	};

	if (isDesktop) {
		return (
			<div className="flex flex-row items-center gap-2">
				<label
					htmlFor="comodin-selector-combobox"
					className={cn("label-text-alt relative min-w-24 md:min-w-16")}
				>
					Comodin
				</label>
				<Popover open={open} onOpenChange={setOpen}>
					<PopoverTrigger asChild>
						<Button
							variant="secondary"
							size="sm"
							className="w-[150px] justify-center"
						>
							{selectedFigure ? (
								<>{selectedFigure.name}</>
							) : (
								<>Seleccionar figura</>
							)}
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-[150px] p-0" align="start">
						<StatusList
							setOpen={setOpen}
							setSelectedFigure={setSelectedFigure}
						/>
					</PopoverContent>
				</Popover>
				<button
					type="button"
					className="btn btn-secondary btn-sm btn-square"
					onClick={handleAddNewComodin}
				>
					<PlusIcon className="h-4 w-4" />
				</button>
			</div>
		);
	}

	return (
		<div className="flex flex-row items-center gap-2">
			<label
				htmlFor="comodin-selector-combobox"
				className={cn("label-text-alt relative min-w-24")}
			>
				Comodin
			</label>
			<Drawer open={open} onOpenChange={setOpen}>
				<DrawerTrigger asChild>
					<Button
						variant="secondary"
						size="sm"
						className="w-[150px] justify-center"
					>
						{selectedFigure ? (
							<>{selectedFigure.name}</>
						) : (
							<>Seleccionar figura</>
						)}
					</Button>
				</DrawerTrigger>
				<DrawerContent>
					<div className="mt-4 border-t">
						<StatusList
							setOpen={setOpen}
							setSelectedFigure={setSelectedFigure}
						/>
					</div>
				</DrawerContent>
			</Drawer>
			<button
				type="button"
				className="btn btn-secondary btn-sm btn-square"
				onClick={handleAddNewComodin}
			>
				<PlusIcon className="h-4 w-4" />
			</button>
		</div>
	);
}

function StatusList({
	setOpen,
	setSelectedFigure,
}: {
	setOpen: (open: boolean) => void;
	setSelectedFigure: (figure: Figure | null) => void;
}) {
	const { figures } = useContext(FiguresContext) as FiguresContextType;
	return (
		<Command>
			<CommandInput placeholder="Filtrar..." />
			<CommandList>
				<CommandEmpty>No results found.</CommandEmpty>
				<CommandGroup>
					{figures.map((fig) => (
						<CommandItem
							key={fig.name}
							value={fig.name}
							onSelect={() => {
								setSelectedFigure(fig);
								setOpen(false);
							}}
						>
							{`${fig.id} - ${fig.name}`}
						</CommandItem>
					))}
				</CommandGroup>
			</CommandList>
		</Command>
	);
}
