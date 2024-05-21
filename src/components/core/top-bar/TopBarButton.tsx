import { cn } from "@/utils/utils";

type TopBarButtonProps = {
	value?: string;
	className?: string;
	isIcon?: boolean;
	iconRenderer?: JSX.Element;
	iconPosition?: "start" | "end";
};

export const TopBarButton = ({
	value,
	className,
	isIcon,
	iconRenderer,
	iconPosition = "start",
}: TopBarButtonProps) => {
	return (
		<button
			type="button"
			className={cn(
				"btn btn-sm inline-flex",
				className,
				!isIcon && "btn-secondary",
				!value && "btn-square",
				isIcon && value && iconPosition === "start" && "pl-2",
				isIcon && value && iconPosition === "end" && "pr-2",
			)}
		>
			{isIcon && iconPosition === "start" && iconRenderer}
			{value}
			{isIcon && iconPosition === "end" && iconRenderer}
		</button>
	);
};
