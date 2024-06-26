import { DEFAULT_FIGURES } from "@/consts/FiguresConsts";
import { FiguresContext } from "@/contexts/FiguresContext";
import type { Figure } from "@/vite-env";
import { useEffect, useState } from "react";

export const FiguresProvider = ({ children }: any) => {
	const [loading, setLoading] = useState(true);
	const [figures, setFigures] = useState<Figure[]>([] as Figure[]);
	const [currentFigure, setCurrentFigure] = useState<Figure | null>(null);

	const addFigure = (figure: Figure) => {
		setFigures([...figures, figure]);
	};

	const addFigures = (_figures: Figure[]) => {
		setFigures([...figures, ..._figures]);
	};

	const removeFigure = (id: number) => {
		const oldFigures = [...figures];
		const indexOfFigure = oldFigures.findIndex((f) => f.id === id);

		const newFigures = oldFigures.map((f, i) => {
			if (i !== indexOfFigure) {
				if (i < indexOfFigure) {
					return f;
				}

				return { ...f, id: f.id - 1 };
			}
		});

		setFigures(
			newFigures.filter((f) => f !== undefined && f !== null) as Figure[],
		);
	};

	const updateFigure = (figure: Figure) => {
		setFigures(figures.map((f) => (f.id === figure.id ? figure : f)));
	};

	const getFigure = (id: number) => {
		return figures.find((f) => f.id === id) || null;
	};

	useEffect(() => {
		const formatFigures = async () => {
			const savedFigures = localStorage.getItem("figures");

			let parsedFigures: Figure[];

			parsedFigures = DEFAULT_FIGURES;
			if (savedFigures && savedFigures !== "[]") {
				const parsed = JSON.parse(savedFigures);
				parsedFigures = parsed as Figure[];
			}

			const newFigures = parsedFigures.filter(async (figure) => {
				if (figure.src === undefined) return figure;
				figure.imageURL = await convertImageToURL(figure.src);

				return figure;
			});

			return newFigures;
		};
		formatFigures().then((newFigures) => {
			setFigures(newFigures);
			setLoading(false);
		});

		// avisar que se cargaron
	}, []);

	useEffect(() => {
		setTimeout(() => {
			localStorage.setItem("figures", JSON.stringify(figures));
		}, 1000);
	}, [figures]);

	async function convertImageToURL(src: string) {
		const response = await fetch(src);
		const blob = await response.blob();
		const dataUrl = await blobToDataUrl(blob);
		return dataUrl as string;
	}

	async function blobToDataUrl(blob: Blob) {
		return new Promise((r) => {
			const a = new FileReader();
			a.onload = r;
			a.readAsDataURL(blob);
		}).then((e: any) => {
			return e.target.result as string;
		});
	}

	return (
		<FiguresContext.Provider
			value={{
				loading,
				setFigures,
				figures,
				setCurrentFigure,
				currentFigure,
				addFigure,
				addFigures,
				removeFigure,
				updateFigure,
				getFigure,
			}}
		>
			{children}
		</FiguresContext.Provider>
	);
};
