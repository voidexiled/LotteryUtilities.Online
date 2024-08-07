import { defaultProfile } from "@/consts/ProfileConsts";
import { ProfileContext } from "@/contexts/ProfileContext";
import type { FigurePosition, Profile } from "@/vite-env";
import { useEffect, useState } from "react";

export const ProfileProvider = ({ children }: any) => {
	const [profiles, setProfiles] = useState<Profile[]>([]);
	const [profile, _setProfile] = useState<Profile>(defaultProfile);
	const [localProfile, setLocalProfile] = useState<Profile | null>(null);
	// const [fallbackProfile, setFallbackProfile] = useState<Profile | null>(null);
	const [selectedComodinFromEdit, setSelectedComodinFromEdit] =
		useState<FigurePosition | null>(null);
	const [selectedPosition, setSelectedPosition] = useState<number | null>(null);

	useEffect(() => {
		console.log("profile", profile);
	}, [profile]);

	const setProfile = (name: string) => {
		//const profileToSet = profiles.find((p) => p.name === name);
		//console.log("Perfil", profileToSet);
		_setProfile(profiles.find((p) => p.name === name) || defaultProfile);
	};

	const updateProfile = (profileName: string, newProfile: Profile) => {
		const newProfiles = profiles?.map((p) => {
			if (p.name === profileName) {
				return { ...newProfile };
			}
			return p;
		});
		console.log("newProfiles", newProfiles);
		setProfiles(newProfiles);
		console.log("profile", newProfile);
		setProfile(newProfile.name);
	};

	const addProfile = (profile: Profile) => {
		setProfiles([...profiles, profile]);
	};

	const deleteProfile = (name: string) => {
		const newProfiles = profiles.filter((p) => p.name !== name);
		setProfiles(newProfiles);
		setProfile(newProfiles[newProfiles.length - 1].name);
	};

	useEffect(() => {
		const tryGetProfiles = async () => {
			const _profiles = localStorage.getItem("profiles");
			if (_profiles) {
				setProfiles(JSON.parse(_profiles));
			} else {
				setProfiles([defaultProfile]);
			}
		};
		tryGetProfiles();
	}, []);

	useEffect(() => {
		const trySaveProfiles = async () => {
			if (profiles.length > 0) {
				localStorage.setItem("profiles", JSON.stringify(profiles));
				console.log("saving..", profiles);
			}
		};
		trySaveProfiles();
	}, [profiles]);

	useEffect(() => {
		console.log("selectedPosition", selectedPosition);
	}, [selectedPosition]);

	return (
		<ProfileContext.Provider
			value={{
				profile,
				profiles,
				selectedComodin: selectedComodinFromEdit,
				localProfile,
				// fallbackProfile,
				// setFallbackProfile,
				setLocalProfile,
				setProfile,
				updateProfile,
				addProfile,
				deleteProfile,
				setSelectedComodin: setSelectedComodinFromEdit,
				selectedPosition,
				setSelectedPosition,
			}}
		>
			{children}
		</ProfileContext.Provider>
	);
};
