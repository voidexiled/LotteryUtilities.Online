import { cn } from "@/utils/utils";
import type React from "react";
import type { ReactEventHandler } from "react";

type ProfileInputProps = {
	id?: string;
	label: string;
	labelClassname?: string;
	placeholder?: string;
	value?: number | string | undefined;
	onChange?: ReactEventHandler<HTMLInputElement> | undefined;
	type?: React.HTMLInputTypeAttribute | undefined;
	disabled?: boolean | undefined;
	rightDecorator?: React.ReactNode | string | undefined;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const FormInput = ({
	id,
	label,
	labelClassname,
	placeholder,
	value,
	rightDecorator,
	onChange,
	type,
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
				className="input input-sm input-secondary min-w-[50px] grow bg-accent/10"
				type={type ?? "text"}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				disabled={disabled}
				autoComplete="off"
				{...props}
			/>
		</div>
	);
};
