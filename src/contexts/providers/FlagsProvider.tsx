import { FlagsContext } from "@/contexts/FlagsContext";
import { useState } from "react";

export const FlagsProvider = ({ children }: any) => {
	const [showProfiles, setShowProfiles] = useState(false);
	const [showFigures, setShowFigures] = useState(false);
	const [showTables, setShowTables] = useState(true);

	return (
		<FlagsContext.Provider
			value={{
				showFigures,
				showProfiles,
				showTables,
				setShowProfiles,
				setShowFigures,
				setShowTables,
			}}
		>
			{children}
		</FlagsContext.Provider>
	);
};
