import type { ProfileContextType } from "@/vite-env";
import { createContext } from "react";

export const ProfileContext = createContext<ProfileContextType | null>(null);
