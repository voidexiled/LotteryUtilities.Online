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

	const setProfile = (id: number) => {
		//const profileToSet = profiles.find((p) => p.name === name);
		//console.log("Perfil", profileToSet);
		const profileToSet = profiles.find((p) => p.id === id) || defaultProfile;
		_setProfile(profileToSet);
		setLocalProfile(profileToSet);
	};

	const updateProfile = (profileId: number, newProfile: Profile) => {
		const newProfiles = profiles?.map((p) => {
			if (p.id === profileId) {
				return { ...newProfile };
			}
			return p;
		});
		setProfiles(newProfiles);
		setProfile(newProfile.id);
	};

	const addProfile = (profile: Profile) => {
		setProfiles([...profiles, profile]);
	};

	const deleteProfile = (id: number) => {
		const newProfiles = profiles.filter((p) => p.id !== id);
		setProfiles(newProfiles);
		setProfile(newProfiles[newProfiles.length - 1].id);
	};

	useEffect(() => {
		if (profile) {
			setProfile(profile.id);
		}
	}, profiles);

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
