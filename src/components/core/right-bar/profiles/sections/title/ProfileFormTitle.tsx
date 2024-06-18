type ProfileFormTitleProps = {
	label?: string;
};

export const ProfileFormTitle = ({ label }: ProfileFormTitleProps) => {
	return (
		<div className="flex w-full flex-col items-center justify-center p-2">
			<span className="text-info-content text-xs">{label}</span>
		</div>
	);
};
