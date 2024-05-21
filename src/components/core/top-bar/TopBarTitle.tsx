export const TopBarTitle = ({ title }: { title: string }) => {
	return (
		<div className="hidden lg:flex btn btm-md text-xl font-bold text-base-content filter-none tracking-widest text-center ">
			{title}
		</div>
	);
};
