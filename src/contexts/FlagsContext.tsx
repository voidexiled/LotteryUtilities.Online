
import type { FlagsContextType } from "@/vite-env";
import { createContext, useState } from "react";


export const FlagsContext = createContext<FlagsContextType | null>(null);

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
