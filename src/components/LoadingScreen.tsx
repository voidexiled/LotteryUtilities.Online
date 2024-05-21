import { FiguresContext } from "@/contexts/FiguresContext";
import { TablesContext } from "@/contexts/TablesContext";
import { cn } from "@/utils/utils";
import type { FiguresContextType, TablesContextType } from "@/vite-env";
import { useContext, useEffect, useState } from "react";

export const LoadingScreen = () => {
	const [loading, setLoading] = useState(false);
	const {
		loading: loadingTables,
		transformingToDataUrl,
		totalTables,
	} = useContext(TablesContext) as TablesContextType;
	const { loading: loadingFigures } = useContext(
		FiguresContext,
	) as FiguresContextType;

	useEffect(() => {
		if (loadingTables || loadingFigures || transformingToDataUrl) {
			setLoading(true);
		} else {
			setLoading(false);
		}
	}, [loadingTables, loadingFigures, transformingToDataUrl]);

	return (
		<div
			className={cn(
				"hidden",
				loading &&
					"fixed grid w-screen h-screen top-0 left-0 bg-base-100 bg-opacity-70 z-50 grid-flow-row gap-3 disabled-select",
			)}
		>
			<div className="m-auto flex flex-col gap-8">
				<span className="loading loading-bars loading-lg m-auto bg-gradient-to-r from-primary via-accent to-secondary text-transparent animate-gradient text-4xl scale-150" />
				{loading && (
					<span className="opacity-80">
						Cargando{" "}
						{loadingFigures ? "figuras..." : `${totalTables} tablas...`}
					</span>
				)}
			</div>
		</div>
	);
};
