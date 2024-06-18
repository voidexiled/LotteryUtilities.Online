import { cn } from "@/utils/utils";
import type { ReactEventHandler } from "react";

type ProfileInputProps = {
	id?: string;
	label: string;
	labelClassname?: string;
	disabled?: boolean | undefined;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const FormCheckbox = ({
	id,
	label,
	labelClassname,

	disabled,
	...props
}: ProfileInputProps) => {
	return (
		<div className="flex flex-row items-center gap-2">
			<label
				htmlFor={id}
				className={cn("label-text-alt relative min-w-24", labelClassname)}
			>
				{label}
			</label>
			<input
				id={id}
				className="checkbox checkbox-secondary checkbox-sm"
				type="checkbox"
				disabled={disabled}
				autoComplete="off"
				{...props}
			/>
		</div>
	);
};
