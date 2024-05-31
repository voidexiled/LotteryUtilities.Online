
import { FiguresContext } from "@/contexts/FiguresContext";
import { uploadImage } from "@/utils/utils";
import type { Figure, FiguresContextType } from "@/vite-env";
import { Dropzone, type ExtFile, FileMosaic } from "@files-ui/react";
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { CheckIcon, UploadCloudIcon, XCircleIcon } from "lucide-react";
import { useContext, useState } from "react";
import { Flip, toast } from "react-toastify";

export const FigureManagerToolDialog = ({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
	const { figures, addFigures } = useContext(FiguresContext) as FiguresContextType;

	const [files, setFiles] = useState<ExtFile[]>([]);

	const updateFiles = (files: ExtFile[]) => {
		setFiles(files);
		console.log(files);

	}

	const removeFile = (fileId: string | number | undefined) => {
		setFiles(files.filter((f) => f.id !== fileId));
	}

	const handleAddCustomFigures = async () => {
		let fileCounter = 1;
		const tempFigures = await Promise.all(files.map(async (file) => {
			if (!file.file) return;
			const url = await uploadImage(file.file);
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

	const notifyAdded = () => {
		toast("Se han agregado las figuras correctamente.", {
			bodyStyle: { fontSize: "0.75rem" },
			transition: Flip,
			autoClose: 2200,
			type: "success",
			closeOnClick: true,
			icon: <CheckIcon className="h-4 w-4" />,
		});

	}

	const notifyError = () => {
		toast("Se ha producido un error al agregar las figuras.", {
			bodyStyle: { fontSize: "0.75rem" },
			transition: Flip,
			autoClose: 2200,
			type: "error",
			closeOnClick: true,
			icon: <XCircleIcon className="h-4 w-4" />,
		});
	}

	return (
		<Transition appear show={isOpen}>
			<Dialog as="div" className="relative z-30 focus:outline-none" onClose={() => {
				setIsOpen(false);
			}}>
				<TransitionChild
					enter="delay-100"
					enterFrom="opacity-0 transform-[scale(95%)]"
					enterTo="opacity-100 transform-[scale(100%)]"
					leave="ease-in duration-200"
					leaveFrom="opacity-100 transform-[scale(100%)]"
					leaveTo="opacity-0 transform-[scale(95%)]"
				>
					<div className="fixed inset-0 flex w-screen items-center justify-center p-4 backdrop-blur-[3px] transition-all">
						<DialogPanel className="max-h-[450px] w-full max-w-md overflow-y-auto rounded-xl bg-base-200 p-6 backdrop-blur-2xl">
							<DialogTitle as="h3" className="sticky top-0 font-medium text-base text-white">
								Subir imagen

							</DialogTitle>
							<Dropzone
								onChange={updateFiles}
								value={files}
								accept="image/*"
								allowFullScreen
								allowTransparency

							>
								{files.map((file) => (
									<FileMosaic key={file.id} {...file} onDelete={removeFile} info preview darkMode />
								))}
							</Dropzone>
							<div className="mt-4 flex flex-row items-center justify-end gap-4">
								<button type="button" className="btn btn-sm btn-link btn-error text-error decoration-transparent hover:decoration-error"
									onClick={() => {
										setIsOpen(false);
									}}
								>
									Cerrar
								</button>
								<button
									type="button"
									className="btn btn-sm btn-accent px-6"
									onClick={async () => {
										await handleAddCustomFigures().then((newFigures) => {
											if (!newFigures) return;
											addFigures(newFigures as Figure[]);
											setIsOpen(false);
											notifyAdded();
										}).finally(() => {

										}).catch((e) => {
											notifyError();
											console.log(e);
										});
									}}
								>
									<UploadCloudIcon className="h-4 w-4" />
									Agregar figuras
								</button>
							</div>
						</DialogPanel>
					</div>
				</TransitionChild>

			</Dialog>

		</Transition>
	)

}