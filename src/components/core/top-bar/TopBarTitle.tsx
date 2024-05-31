export const TopBarTitle = ({ title }: { title: string }) => {
	return (
		<div className="btn btm-md hidden text-center font-bold text-base-content text-xl tracking-widest filter-none lg:flex">
			{title}
		</div>
	);
};
