import {
	MoreVerticalIcon,
	PlusIcon,
	PrinterIcon,
	SendIcon,
	SettingsIcon,
} from "lucide-react";

import { ProfileContext } from "@/contexts/ProfileContext";
import { TablesContext } from "@/contexts/TablesContext";
import type { ProfileContextType, TablesContextType } from "@/vite-env";
import jsPDF from "jspdf";
import { useContext } from "react";
import { TopBarButton } from "./top-bar/TopBarButton";
import { TopBarGroupButtons } from "./top-bar/TopBarGroupButtons";
import { TopBarSelectProfile } from "./top-bar/TopBarSelectProfile";
import { TopBarTitle } from "./top-bar/TopBarTitle";

export const Header = () => {
	const { tables } = useContext(TablesContext) as TablesContextType;

	const { profile } = useContext(ProfileContext) as ProfileContextType;

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
			const imgWidth = options.tableSize.width
			const imgHeight = options.tableSize.height


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
				doc.addImage(
					image,
					"JPEG",
					x,
					y,
					imgWidth,
					imgHeight
				);

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
		})

	}
	return (
		<div className="flex grow basis-[100px] flex-row items-center justify-center p-4">
			<div className="flex h-full grow flex-row items-center justify-between rounded-lg bg-base-200 px-4 shadow-base-200/15 shadow-lg">
				<TopBarGroupButtons align="start">
					<TopBarButton
						isIcon
						iconRenderer={<MoreVerticalIcon className="h-5 w-5 text-accent" />}
					/>
					<TopBarSelectProfile />
					<TopBarButton
						isIcon
						iconRenderer={<PlusIcon className="h-5 w-5 text-accent" />}
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
						iconRenderer={<SettingsIcon className="h-5 w-5 text-accent" />}
						isIcon
					/>
				</TopBarGroupButtons>
			</div>
		</div>
	);
};
