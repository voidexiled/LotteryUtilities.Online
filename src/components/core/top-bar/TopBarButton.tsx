import { cn } from "@/utils/utils";

type TopBarButtonProps = {
	onClick?: () => void;
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
	onClick,
	iconPosition = "start",
}: TopBarButtonProps) => {
	return (
		<button
			type="button"
			onClick={onClick}
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
