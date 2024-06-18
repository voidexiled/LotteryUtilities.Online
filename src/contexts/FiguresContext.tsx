import type { FiguresContextType } from "@/vite-env";
import { createContext } from "react";

export const FiguresContext = createContext<FiguresContextType | null>(null);
