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
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/utils/utils";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { useState } from "react";

type Status = {
	value: string;
	label: string;
};

type ComboBoxProps = {
	selected: any | null;
	values: any[];
	setSelected: (value: any) => void;
	label?: string;
	labelClassname?: string;
	buttonClassname?: string;
	buttonDesktopClassname?: string;
	buttonMobileClassname?: string;
	placeholder?: string;
	onSelect?: (value: string) => void;
};

export function ComboBox({
	label,
	labelClassname,
	buttonClassname,
	buttonDesktopClassname,
	buttonMobileClassname,
	placeholder,
	onSelect,
	selected,
	setSelected,
	values,
}: ComboBoxProps) {
	const [open, setOpen] = useState(false);
	const isDesktop = useMediaQuery("(min-width: 768px)");
	// const [selectedStatus, setSelectedStatus] = useState<Status | null>(null);

	if (isDesktop) {
		return (
			<div className="flex flex-row items-center gap-2">
				<label
					htmlFor="status"
					className={cn("label-text-alt relative min-w-24", labelClassname)}
				>
					{label}
				</label>
				<Popover open={open} onOpenChange={setOpen}>
					<PopoverTrigger asChild>
						<Button
							variant="secondary"
							className={cn(
								"w-[120px] justify-between",
								buttonClassname,
								buttonDesktopClassname,
							)}
							size="sm"
						>
							{selected ? <>{selected}</> : <>{placeholder}</>}
							<CaretSortIcon className="h-4 w-4" />
						</Button>
					</PopoverTrigger>
					<PopoverContent
						className={cn(
							"w-[120px] p-0",
							buttonClassname,
							buttonMobileClassname,
						)}
						align="end"
					>
						<StatusList
							values={values}
							onSelect={onSelect}
							setOpen={setOpen}
							setSelected={setSelected}
						/>
					</PopoverContent>
				</Popover>
			</div>
		);
	}

	return (
		<div className="flex flex-row items-center gap-2">
			<label
				htmlFor="status"
				className={cn("label-text-alt relative min-w-24", labelClassname)}
			>
				{label}
			</label>
			<Drawer open={open} onOpenChange={setOpen}>
				<DrawerTrigger asChild>
					<Button
						variant="secondary"
						className="w-[120px] justify-between"
						size="sm"
					>
						{selected ? <>{selected}</> : <>{placeholder}</>}
						<CaretSortIcon className="h-4 w-4" />
					</Button>
				</DrawerTrigger>
				<DrawerContent>
					<div className="mt-4">
						{" "}
						<StatusList
							values={values}
							onSelect={onSelect}
							setOpen={setOpen}
							setSelected={setSelected}
						/>
					</div>
				</DrawerContent>
			</Drawer>
		</div>
	);
}

function StatusList({
	setOpen,
	setSelected,
	onSelect,
	values,
}: {
	setOpen: (open: boolean) => void;
	setSelected: (status: Status | null) => void;
	onSelect: ((value: string) => void) | undefined;
	values: any[];
}) {
	return (
		<Command>
			<CommandInput placeholder="Filtrar..." />
			<CommandList>
				<CommandEmpty>No results found.</CommandEmpty>
				<CommandGroup>
					{values.map((item) => (
						<CommandItem
							key={item}
							value={item}
							// onSelect={(value) => {
							// 	setSelectedStatus(
							// 		statuses.find((priority) => priority.value === value) || null,
							// 	);
							// 	setOpen(false);
							// }}
							onSelect={(value) => {
								if (!onSelect) return;
								onSelect(value);
								setSelected(values.find((v) => v === value) || null);
								setOpen(false);
							}}
						>
							{item}
						</CommandItem>
					))}
				</CommandGroup>
			</CommandList>
		</Command>
	);
}
