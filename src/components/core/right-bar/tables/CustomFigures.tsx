import { FiguresContext } from "@/contexts/FiguresContext";
import { uploadImage } from "@/utils/utils";
import type {
    Figure,
    FiguresContextType
} from "@/vite-env";
import {
    LucideUpload,
    Trash2Icon
} from "lucide-react";
import { useContext, useState } from "react";


export const CustomFigures = () => {
    const { figures, addFigures } = useContext(
        FiguresContext,
    ) as FiguresContextType;

    const [files, setFiles] = useState<File[]>([]);

    const handleAddCustomFigures = async () => {
        let fileCounter = 1;
        const tempFigures = await Promise.all(files.map(async (file) => {
            const url = await uploadImage(file);
            if (url) {
                return {
                    id: figures.length + fileCounter++,
                    name: file.name,
                    imageURL: url,
                };
            }
            return null;
        }));
        return tempFigures.filter(figure => figure !== null);
    }
    return (
        <div className="flex flex-col gap-2 pt-2 text-xs">
            <span className="text-secondary">Figuras personalizadas</span>
            <div className="flex flex-1 flex-row items-center gap-2">
                <input

                    id="upload_figure"
                    type="file"
                    accept="image/*"
                    className="input file-input-ghost input-sm lg:input-xs input-secondary grow cursor-pointer"
                    multiple={true}
                    onChange={(e) => {
                        const files = e.target.files;
                        if (!files) return;
                        setFiles((prevFiles) => [...prevFiles, ...files]);
                    }}
                />
                <button
                    type="button"
                    className="btn btn-sm lg:btn-xs btn-secondary"
                    onClick={async () => {
                        if (files.length > 0) {
                            await handleAddCustomFigures().then((newFigures) => {
                                if (!newFigures) return;
                                addFigures(newFigures as Figure[]);
                            });

                        }
                    }}
                >
                    Cargar{" "}
                    <LucideUpload className="h-3 w-3 transition-all duration-200 ease-out group-hover:scale-110" />
                </button>
                <button
                    type="button"
                    className="btn btn-sm lg:btn-xs btn-error btn-ghost text-error"
                    onClick={() => {
                        setFiles([]);
                    }}
                >
                    Limpiar
                    <Trash2Icon className="h-3 w-3 transition-all duration-200 ease-out group-hover:scale-110" />
                </button>
            </div>
            <div id="file_list" className="flex flex-col gap-1 overflow-y-auto">
                {files.length > 0
                    ? files.map((file, index) => {
                        return (
                            <div
                                key={index}
                                className="flex flex-row items-center gap-2"
                            >
                                <img
                                    alt=""
                                    src={URL.createObjectURL(file)}
                                    className="h-4 w-4 rounded-full"
                                />
                                <span>{file.name}</span>
                            </div>
                        );
                    })
                    : "No hay archivos cargados"}
            </div>

        </div>
    )
}