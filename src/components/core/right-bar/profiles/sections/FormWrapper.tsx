import { cn } from "@/utils/utils";

type FormWrapperProps = {
	orientation?: "horizontal" | "vertical";
	className?: string;
	children?: React.ReactNode | React.ReactNode[] | string;
};
export const FormWrapper = ({
	orientation = "vertical",
	className,
	children,
}: FormWrapperProps) => {
	return (
		<div
			className={cn(
				"flex grow gap-2",
				orientation === "horizontal" && "flex-row",
				orientation === "vertical" && "flex-col",
				className,
			)}
		>
			{children}
		</div>
	);
};
