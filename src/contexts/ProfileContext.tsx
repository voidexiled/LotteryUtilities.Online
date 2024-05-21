import type { Profile, ProfileContextType } from "@/vite-env";
import { createContext, useEffect, useState } from "react";
import { DEFAULT_PROFILES, defaultProfile } from "../consts/ProfileConsts";

export const ProfileContext = createContext<ProfileContextType | null>(null);

export const ProfileProvider = ({ children }: any) => {
	const [profiles, setProfiles] = useState<Profile[]>(DEFAULT_PROFILES);
	const [profile, setProfile] = useState<Profile>(defaultProfile);

	useEffect(() => {
		const tryGetProfiles = async () => {
			const _profiles = localStorage.getItem("profiles");
			if (_profiles) {
				setProfiles(JSON.parse(_profiles));
			}
		};
		tryGetProfiles();
	}, []);

	useEffect(() => {
		const trySaveProfiles = async () => {
			localStorage.setItem("profiles", JSON.stringify(profiles));
		};
		trySaveProfiles();
	}, [profiles]);

	return (
		<ProfileContext.Provider value={{ setProfile, profile }}>
			{children}
		</ProfileContext.Provider>
	);
};
