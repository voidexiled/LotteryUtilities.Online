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
					"disabled-select fixed top-0 left-0 z-50 grid h-screen w-screen grid-flow-row gap-3 bg-base-100 bg-opacity-70",
			)}
		>
			<div className="m-auto flex flex-col gap-8">
				<span className="loading loading-bars loading-lg m-auto scale-150 animate-gradient bg-gradient-to-r from-primary via-accent to-secondary text-4xl text-transparent" />
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
