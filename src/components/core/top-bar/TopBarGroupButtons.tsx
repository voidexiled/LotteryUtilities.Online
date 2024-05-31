import { cn } from "@/utils/utils";

type TopBarGroupButtonsProps = {
	className?: string;
	children?: JSX.Element | JSX.Element[];
	orientation?: "horizontal" | "vertical";
	align?: "start" | "end" | "center";
};

export const TopBarGroupButtons = ({
	className,
	children,
	orientation,
	align,
}: TopBarGroupButtonsProps) => {
	return (
		<div
			className={cn(
				"flex flex-1 flex-row items-center gap-2",
				className,
				orientation === "vertical" && "flex-col",
				align === "start" && "justify-start",
				align === "end" && "justify-end",
				align === "center" && "justify-center",
			)}
		>
			{children}
		</div>
	);
};
