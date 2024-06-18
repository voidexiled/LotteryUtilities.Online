import type { TablesContextType } from "@/vite-env";
import { createContext } from "react";

export const TablesContext = createContext<TablesContextType | null>(null);
