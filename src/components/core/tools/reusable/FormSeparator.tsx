export const FormSeparator = ({ label }: { label?: string }) => {
	return (
		<div className="flex w-full flex-col items-center justify-center pt-2">
			<span className="text-info-content text-xs">{label}</span>
		</div>
	);
};
