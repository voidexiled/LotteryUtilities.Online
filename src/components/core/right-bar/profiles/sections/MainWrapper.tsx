import { cn } from "@/utils/utils";

type MainWrapperProps = {
	orientation?: "horizontal" | "vertical";
	className?: string;
	children?: React.ReactNode | React.ReactNode[] | string;
};
export const MainWrapper = ({
	orientation = "horizontal",
	className,
	children,
}: MainWrapperProps) => {
	return (
		<div
			className={cn(
				"flex grow gap-2 p-2",
				orientation === "horizontal" && "flex-row",
				orientation === "vertical" && "flex-col",
				className,
			)}
		>
			{children}
		</div>
	);
};
