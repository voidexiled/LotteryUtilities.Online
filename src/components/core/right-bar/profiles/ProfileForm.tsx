import { FormInput } from "@/components/core/right-bar/profiles/sections/reusable/FormInput";
import { ComboBox } from "@/components/ui/combobox";
import { defaultProfile } from "@/consts/ProfileConsts";
import { ProfileContext } from "@/contexts/ProfileContext";
import type { PaperSize, ProfileContextType } from "@/vite-env";
import { Trash2Icon, XCircleIcon } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Flip, toast } from "react-toastify";
import { FormWrapper } from "./sections/FormWrapper";
import { MainWrapper } from "./sections/MainWrapper";
import { PreviewPositions } from "./sections/positions/PreviewPositions";
import { ComboBoxAddComodin } from "./sections/reusable/ComboBoxAddComodin";
import { ComboBoxAddSkipFigure } from "./sections/reusable/ComboBoxAddFigure";
import { FormCheckbox } from "./sections/reusable/FormCheckbox";
import { FormComodinList } from "./sections/reusable/FormComodinList";
import { FormSkipFiguresList } from "./sections/reusable/FormSkipFiguresList";
import { ProfileFormTitle } from "./sections/title/ProfileFormTitle";

const validPaperSizes: PaperSize[] = ["A4", "A5", "A6", "Letter", "Legal"];
const validTableSizes: string[] = ["2x2", "4x4", "5x5"];

export const ProfileForm = () => {
	const {
		profile,
		updateProfile,
		deleteProfile,
		addProfile,
		profiles,
		setProfile,
		// selectedComodin,
		localProfile,
		// fallbackProfile,
		// setFallbackProfile,
		setLocalProfile,
	} = useContext(ProfileContext) as ProfileContextType;

	const [paperSize, setPaperSize] = useState<PaperSize>(
		localProfile?.pdfOptions.paperSize || "A4",
	);
	const [tableSize, setTableSize] = useState<string>(
		localProfile?.tableOptions.size || "4x4",
	);
	//const [figurasAleatorias, setFigurasAleatorias] = useState<boolean>(false);

	useEffect(() => {
		// console.log("profile", profile);
		// setLocalProfile(null);
		setLocalProfile({
			...profile,
		});
		// setFallbackProfile({ ...profile });
	}, [profile]);

	useEffect(() => {
		if (!localProfile) return;
		setPaperSize(localProfile.pdfOptions.paperSize);
		setTableSize(localProfile.tableOptions.size);
	}, [localProfile]);

	useEffect(() => {
		if (!localProfile) return;
		setLocalProfile({
			...localProfile,
			pdfOptions: {
				...localProfile.pdfOptions,
				paperSize,
			},
			tableOptions: {
				...localProfile.tableOptions,
				size: tableSize as "2x2" | "4x4" | "5x5",
			},
		});
	}, [paperSize, tableSize]);

	const notifyDeleted = (message: string) =>
		toast(message, {
			type: "error",
			transition: Flip,
			autoClose: 3200,
			bodyStyle: { fontSize: "0.75rem" },
			icon: <Trash2Icon className="h-4 w-4" />,
		});

	const notifyError = (message: string) => {
		toast(message, {
			type: "error",
			transition: Flip,
			autoClose: 3200,
			bodyStyle: { fontSize: "0.75rem" },
			icon: <XCircleIcon className="h-4 w-4" />,
		});
	};
	const notifySuccess = (message: string) => {
		toast(message, {
			type: "success",
			transition: Flip,
			autoClose: 3200,
			bodyStyle: { fontSize: "0.75rem" },
		});
	};

	const handleSave = () => {
		if (!localProfile) return;
		if (!profile) {
			notifyError("No hay perfil seleccionado");
			return;
		}
		console.log("localProfile", localProfile);
		updateProfile(profile.name, localProfile);
		notifySuccess(`Se ha actualizado el perfil ${profile.name} correctamente.`);
	};

	const handleDeleteProfile = () => {
		if (!profile) {
			notifyError("No hay perfil seleccionado");
			return;
		}
		const nameProfile = profile.name;
		deleteProfile(profile.name);
		notifyDeleted(`Se ha eliminado el perfil ${nameProfile} correctamente.`);
		const lenProfiles = profiles.length;
		if (lenProfiles === 0) {
			addProfile(defaultProfile);
		} else {
			setProfile(profiles[lenProfiles - 1].name);
		}
	};

	useEffect(() => {
		if (!localProfile) return;
		console.log("comodin", localProfile.tableOptions.comodin);
		console.log("comodinPosition", localProfile.tableOptions.comodinPosition);
	}, [localProfile]);

	if (!localProfile) {
		return null;
	}
	return (
		<>
			<MainWrapper orientation="vertical" className="pb-0">
				<FormInput
					label="Nombre del perfil"
					value={localProfile.name}
					onChange={(e) => {
						if (!localProfile) return;
						setLocalProfile({
							...localProfile,
							name: e.currentTarget.value,
						});
					}}
				/>
			</MainWrapper>
			<MainWrapper
				orientation="horizontal"
				className="flex-col gap-2 pb-0 md:flex-row"
			>
				<FormWrapper className="md:w-1/2">
					<ProfileFormTitle label="Opciones de pdf" />
					<ComboBox
						label="Tamaño de hoja"
						placeholder="Seleccionar"
						values={validPaperSizes}
						selected={paperSize}
						setSelected={setPaperSize}
						onSelect={(value) => {
							console.log(value);
							setPaperSize(value as PaperSize);
						}}
					/>
					<FormInput
						label="Alto de tabla"
						type="number"
						min={0}
						value={localProfile.pdfOptions.tableSize.height}
						onChange={(e) => {
							if (!localProfile) return;
							setLocalProfile({
								...localProfile,
								pdfOptions: {
									...localProfile.pdfOptions,
									tableSize: {
										...localProfile.pdfOptions.tableSize,
										height: +e.currentTarget.value,
									},
								},
							});
						}}
					/>
					<FormInput
						label="Ancho de tabla"
						type="number"
						min={0}
						value={localProfile.pdfOptions.tableSize.width}
						onChange={(e) => {
							if (!localProfile) return;
							setLocalProfile({
								...localProfile,
								pdfOptions: {
									...localProfile.pdfOptions,
									tableSize: {
										...localProfile.pdfOptions.tableSize,
										width: +e.currentTarget.value,
									},
								},
							});
						}}
					/>
				</FormWrapper>
				<FormWrapper className="md:w-1/2">
					<ProfileFormTitle label="Opciones de tablas" />
					<ComboBox
						label="Tamaño"
						placeholder="Selecciona"
						labelClassname="min-w-24 md:min-w-16"
						values={validTableSizes}
						selected={tableSize}
						setSelected={setTableSize}
						onSelect={(value) => {
							console.log(value);
							setTableSize(value);
						}}
					/>

					{/* <ComboBox
						values={figures}
						selected={cbSelectedComodin}
						setSelected={setCbSelectedComodin}
					/> */}
					<ComboBoxAddSkipFigure />
					<ComboBoxAddComodin />
					<FormCheckbox
						label="Figuras aleatorias"
						checked={localProfile.tableOptions.random}
						onChange={(e) => {
							setLocalProfile({
								...localProfile,
								tableOptions: {
									...localProfile.tableOptions,
									random: e.currentTarget.checked,
								},
							});
						}}
					/>
				</FormWrapper>
			</MainWrapper>
			<MainWrapper
				orientation="horizontal"
				className="relative flex-wrap gap-6 pb-0 md:gap-2"
			>
				<FormWrapper className="w-[calc(50%-16px)] grow-0 md:max-h-[300px] md:w-[calc(33%-24px)] md:grow">
					<ProfileFormTitle label="Figuras omitidas" />
					<FormSkipFiguresList />
				</FormWrapper>
				<FormWrapper className="w-[calc(50%-16px)] grow-0 md:max-h-[300px] md:w-[calc(33%-24px)] md:grow">
					<ProfileFormTitle label="Comodines" />
					<FormComodinList />
				</FormWrapper>
				<FormWrapper className="items-center">
					<ProfileFormTitle label="Posiciones" />
					<PreviewPositions
						tableSize={localProfile.tableOptions.size}
						positions={localProfile.tableOptions.comodinPosition}
					/>
				</FormWrapper>
			</MainWrapper>
			<MainWrapper orientation="horizontal" className="justify-end">
				<button
					type="button"
					className="btn btn-error btn-sm border-error/40 bg-error/40 text-white/80"
					onClick={handleDeleteProfile}
				>
					Eliminar perfil
				</button>
				{/* <button
					type="button"
					className="btn btn-accent btn-sm border-accent/40 bg-accent/40"
					onClick={() => {
						// setProfile(profile.name);
						if (fallbackProfile) {
							setLocalProfile(fallbackProfile);
						}
						console.log(fallbackProfile);
						console.log(profile);
						console.log(localProfile);
					}}
				>
					Deshacer todo
				</button> */}
				<button
					type="button"
					className="btn btn-primary btn-sm"
					onClick={handleSave}
				>
					Guardar
				</button>
			</MainWrapper>
		</>
	);
};
