import type { FlagsContextType } from "@/vite-env";
import { createContext } from "react";

export const FlagsContext = createContext<FlagsContextType | null>(null);
