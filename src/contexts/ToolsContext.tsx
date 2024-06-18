import type { ToolsContextType } from "@/vite-env";
import { createContext } from "react";

export const ToolsContext = createContext<ToolsContextType | null>(null);
