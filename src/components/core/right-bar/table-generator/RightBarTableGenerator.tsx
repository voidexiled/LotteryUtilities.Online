import { FiguresContext } from "@/contexts/FiguresContext";
import { ProfileContext } from "@/contexts/ProfileContext";
import { cn, uploadImage } from "@/utils/utils";
import type {
	Figure,
	FiguresContextType,
	ProfileContextType
} from "@/vite-env";
import {
	LucideUpload,
	Trash2Icon
} from "lucide-react";
import { useContext, useState } from "react";
import { TableGenerator } from "./FormGenerator";

export const RightBarProfileViewer = () => {
	const { profile } = useContext(ProfileContext) as ProfileContextType;
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
		<div className="flex flex-col text-xs h-fit lg:min-h-[2/6]">
			<div className="flex flex-col gap-1 grow ">
				<span className="text-secondary tracking-wider font-bold ">
					Perfil seleccionado:{" "}
					<span className={cn("font-normal invisible", profile && "visible")}>
						{profile.name}
					</span>
				</span>
				<div className="flex flex-col gap-1 text-xs pt-1 flex-1">
					<TableGenerator />
					<div className="flex flex-col gap-2 text-xs pt-2">
						<span className="text-secondary ">Figuras personalizadas</span>
						<div className="flex flex-row gap-2 items-center flex-1">
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
								<LucideUpload className="w-3 h-3 transition-all duration-200 group-hover:scale-110 ease-out" />
							</button>
							<button
								type="button"
								className="btn btn-sm lg:btn-xs btn-error btn-ghost text-error"
								onClick={() => {
									setFiles([]);
								}}
							>
								Limpiar
								<Trash2Icon className="w-3 h-3 transition-all duration-200 group-hover:scale-110 ease-out" />
							</button>
						</div>
						<div id="file_list" className="flex flex-col gap-1 overflow-y-auto">
							{files.length > 0
								? files.map((file, index) => {
									return (
										<div
											key={index}
											className="flex flex-row gap-2 items-center"
										>
											<img
												alt=""
												src={URL.createObjectURL(file)}
												className="w-4 h-4 rounded-full"
											/>
											<span>{file.name}</span>
										</div>
									);
								})
								: "No hay archivos cargados"}
						</div>

					</div>
				</div>
			</div>
		</div>
	);
};
