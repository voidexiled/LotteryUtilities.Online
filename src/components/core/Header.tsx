import {
	HeadingIcon,
	PlusIcon,
	PrinterIcon,
	SendIcon,
	SettingsIcon,
} from "lucide-react";

import { FiguresContext } from "@/contexts/FiguresContext";
import { ProfileContext } from "@/contexts/ProfileContext";
import { TablesContext } from "@/contexts/TablesContext";
import { generateHeaderImage } from "@/utils/utils";
import type {
	Figure,
	FiguresContextType,
	FlagsContextType,
	Profile,
	ProfileContextType,
	TablesContextType,
} from "@/vite-env";
import jsPDF from "jspdf";
import { useContext } from "react";

import { FlagsContext } from "@/contexts/FlagsContext";
import { TopBarButton } from "./top-bar/TopBarButton";
import { TopBarGroupButtons } from "./top-bar/TopBarGroupButtons";
import { TopBarSelectProfile } from "./top-bar/TopBarSelectProfile";
import { TopBarTitle } from "./top-bar/TopBarTitle";

export const Header = () => {
	const { tables } = useContext(TablesContext) as TablesContextType;

	const { profile, profiles, addProfile } = useContext(
		ProfileContext,
	) as ProfileContextType;

	const { figures } = useContext(FiguresContext) as FiguresContextType;

	const { showProfiles, setShowTables, setShowProfiles } = useContext(
		FlagsContext,
	) as FlagsContextType;
	// useEffect(() => {
	// 	console.log(showProfiles);
	// 	if (showProfiles) {
	// 		setIsOpenProfileEditorDialog(true);
	// 	} else {
	// 		setIsOpenProfileEditorDialog(false);
	// 	}
	// }, [showProfiles]);

	const handleAddNewProfile = () => {
		const qtySameName = profiles.filter((p) =>
			p.name.includes("New Profile"),
		).length;
		const newName = `New Profile ${qtySameName + 1}`;
		const newProfile: Profile = {
			name: newName,
			pdfOptions: {
				paperSize: "A4",
				tableSize: {
					width: 7.6,
					height: 12.4,
				},
			},
			tableOptions: {
				size: "4x4",
				comodin: null,
				comodinPosition: null,
				random: true,
			},
		};
		addProfile(newProfile);
		// setProfile();
	};

	const handlePrint = async () => {
		new Promise((resolve) => {
			const options = profile.pdfOptions;
			const doc = new jsPDF({
				orientation: "p",
				unit: "cm",
				format: options.paperSize,
				putOnlyUsedFonts: true,
				compress: true,
			});
			//    const maxImagesPerPage = 4; // Máximo de imágenes por página
			const imgWidth = options.tableSize.width;
			const imgHeight = options.tableSize.height;

			let x = 1; // Posición X inicial en cm
			let y = 1; // Posición Y inicial en cm

			for (const table of tables) {
				const image = table.imageURL;
				if (!image) {
					return;
				}
				if (x + imgWidth > 21) {
					// Si no hay suficiente espacio en la fila actual, pasa a la siguiente fila
					x = 1;
					y += imgHeight;
				}

				if (y + imgHeight > 29.7) {
					// Si no hay suficiente espacio en la página actual, añade una nueva página
					doc.addPage();
					y = 1;
				}

				doc.setFontSize(12);
				doc.addImage(image, "JPEG", x, y, imgWidth, imgHeight);

				x += imgWidth;

				if (x > 21) {
					// Si llegamos al final de la fila, reinicia X y pasa a la siguiente fila
					x = 1;
					y += imgHeight;
				}

				if (y > 29.7) {
					// Si llegamos al final de la página, añade una nueva página
					doc.addPage();
					y = 1;
				}
			}

			// Guarda o muestra el PDF
			// doc.save();
			const pdfData = doc.output("blob");
			const pdfUrl = URL.createObjectURL(pdfData);
			window.open(pdfUrl);
			resolve(true);
		}).then((va) => {
			console.log(va);
		});
	};

	const getFigure = async (figure: Figure) => {
		const header = await generateHeaderImage(figure).then((canvas) => {
			if (!canvas) return;
			return canvas.toDataURL();
		});
		return header;
	};

	const handlePrintHeader = async () => {
		const header = await getFigure(figures.find((f) => f.id === 54) as Figure);
		if (!header) return;

		new Promise((resolve) => {
			const options = profile.pdfOptions;
			const doc = new jsPDF({
				orientation: "p",
				unit: "cm",
				format: options.paperSize,
				putOnlyUsedFonts: true,
				compress: true,
			});

			const imgWidth = options.tableSize.width;
			const imgHeight = 2.6;

			let x = 1;
			let y = 1;
			console.log(tables.length);
			for (const table of tables) {
				console.log(table);
				// const image = table.imageURL;
				// if (!image) {
				// 	return;
				// }

				if (x + imgWidth > 21) {
					// Si no hay suficiente espacio en la fila actual, pasa a la siguiente fila
					x = 1;
					y += imgHeight;
				}

				if (y + imgHeight > 29) {
					// Si no hay suficiente espacio en la página actual, añade una nueva página
					doc.addPage();
					y = 1;
				}

				doc.addImage(header, "JPEG", x, y, imgWidth, imgHeight);
				x += imgWidth;

				if (x > 21) {
					// Si llegamos al final de la fila, reinicia X y pasa a la siguiente fila
					x = 1;
					y += imgHeight;
				}

				if (y > 29.7) {
					// Si llegamos al final de la página, añade una nueva página
					doc.addPage();
					y = 1;
				}
			}
			const pdfData = doc.output("blob");
			const pdfUrl = URL.createObjectURL(pdfData);
			window.open(pdfUrl);
			resolve(true);
		}).then((va) => {
			console.log(va);
		});
	};
	return (
		<div className="flex grow basis-[100px] flex-row items-center justify-center p-4">
			<div className="flex h-full grow flex-row items-center justify-between rounded-lg bg-base-200 px-4 shadow-base-200/15 shadow-lg">
				<TopBarGroupButtons align="start">
					<TopBarSelectProfile />
					{/* <TopBarButton
						isIcon
						iconRenderer={<EditIcon className="h-5 w-5 text-accent" />}
						onClick={() => setIsOpenProfileEditorDialog(true)}
					/> */}
					<TopBarButton
						isIcon
						iconRenderer={<PlusIcon className="h-5 w-5 text-accent" />}
						onClick={handleAddNewProfile}
					/>
				</TopBarGroupButtons>

				<TopBarTitle title="TablasLoteriaMX.Online" />

				<TopBarGroupButtons align="end">
					<TopBarButton
						iconRenderer={<SendIcon className="h-5 w-5 text-accent" />}
						isIcon
					/>
					<TopBarButton
						isIcon
						iconRenderer={<PrinterIcon className="h-5 w-5 text-accent" />}
						onClick={handlePrint}
					/>
					<TopBarButton
						isIcon
						iconRenderer={<HeadingIcon className="h-5 w-5 text-accent" />}
						onClick={handlePrintHeader}
					/>

					<TopBarButton
						iconRenderer={<SettingsIcon className="h-5 w-5 text-accent" />}
						isIcon
						onClick={() => {
							if (showProfiles) {
								setShowTables(true);
							} else {
								setShowProfiles(true);
							}
						}}
					/>
				</TopBarGroupButtons>
			</div>
			{/* <ProfileManagerToolDialog
				isOpen={isOpenProfileEditorDialog}
				setIsOpen={setIsOpenProfileEditorDialog}
			/> */}
		</div>
	);
};
