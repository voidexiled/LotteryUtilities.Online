import { ProfileContext } from "@/contexts/ProfileContext";
import { cn } from "@/utils/utils";
import type {
    ProfileContextType
} from "@/vite-env";
import { useContext } from "react";

import { motion } from "framer-motion";


export const GeneratorWrapper = ({ children }: { children?: React.ReactNode | React.ReactNode[] }) => {
    const { profile } = useContext(ProfileContext) as ProfileContextType;


    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.72, filter: "blur(2px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{
                type: "tween",
                duration: 0.15,
            }}
            exit={{ opacity: 0, scale: 0.72, filter: "blur(2px)" }}

            className="flex h-fit flex-col text-xs lg:min-h-[2/6]">
            <div className="flex grow flex-col gap-1">
                <span className="font-bold text-secondary tracking-wider">
                    Perfil seleccionado:{" "}
                    <span className={cn("invisible font-normal", profile && "visible")}>
                        {profile.name}
                    </span>
                </span>
                <div className="flex flex-1 flex-col gap-1 pt-1 text-xs">
                    {children}


                </div>
            </div>
        </motion.div>
    );
};
