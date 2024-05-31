import { FiguresContext } from "@/contexts/FiguresContext";
import type { Figure, FiguresContextType } from "@/vite-env";
import { useContext, useEffect, useState } from "react";
import { FigureItem } from "./FigureItem";

type FiguresListProps = {
    filterValue: string;
}

export const FiguresList = ({ filterValue }: FiguresListProps) => {
    const { figures } = useContext(FiguresContext) as FiguresContextType;
    const [filteredFigures, setFilteredFigures] = useState<Figure[]>([]);


    const handleFilter = (value?: string) => {
        if (value) {
            setFilteredFigures(figures.filter((figure) => {
                return figure.name.toLowerCase().includes(value.toLowerCase()) || figure.id.toString().includes(value);
            }));
        } else {
            setFilteredFigures(figures);
        }
    }

    useEffect(() => {
        handleFilter(filterValue);
    }, [filterValue]);

    useEffect(() => {
        handleFilter();
    }, [figures]);

    return (
        <div className="custom-scrollbar relative mt-6 w-full overflow-y-auto rounded-lg bg-base-100 p-4 text-sm">
            <div className="flex flex-col gap-3">
                {filteredFigures.map((figure) => {
                    return (
                        <FigureItem figure={figure} key={figure.id} />
                    )
                })}
            </div>
        </div>
    )

}