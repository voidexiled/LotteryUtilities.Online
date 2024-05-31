import { FiguresContext } from "@/contexts/FiguresContext";
import type { Figure, FiguresContextType } from "@/vite-env"
import { Trash2Icon } from 'lucide-react'
import { useContext } from "react";
import { TopBarButton } from "../../top-bar/TopBarButton"

export const FigureItem = ({ figure }: { figure: Figure }) => {
    const { removeFigure } = useContext(FiguresContext) as FiguresContextType;

    const handleDelete = () => {
        removeFigure(figure.id);
    }

    return (
        <div className="group relative flex h-[75px] flex-row items-center justify-normal gap-6 rounded-lg border border-transparent bg-base-300/50 py-3 pr-8 pl-4 text-lg text-white/80 tracking-wider shadow-sm transition-all duration-200 ease-out hover:border-accent hover:bg-base-300/65 hover:text-white/95 hover:shadow-md">
            <div className="relative flex h-full grow flex-row items-center gap-4">
                <img src={figure.imageURL} alt="" className="h-full rounded-sm object-contain opacity-60 drop-shadow-sm" loading="lazy" />
                <span className="pl-8">{figure.id}.</span>
                <span>{figure.name}</span>


            </div>
            <div>
                <TopBarButton className="btn-ghost text-error hover:bg-error/20" isIcon iconRenderer={<Trash2Icon className="h-4 w-4" />}
                    onClick={handleDelete}
                />

            </div>
        </div >
    )

}