import { DEFAULT_TOOLS } from "@/consts/ToolsConsts";
import type { Tool, ToolsContextType } from "@/vite-env";
import { createContext, useState } from "react";

export const ToolsContext = createContext<ToolsContextType | null>(null);

export const ToolsProvider = ({ children }: any) => {

	const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
	const [tools, setTools] = useState<Tool[]>(DEFAULT_TOOLS);


	return (
		<ToolsContext.Provider
			value={{
				selectedTool,
				tools,
				setSelectedTool,
				setTools,
			}}
		>
			{children}
		</ToolsContext.Provider>
	);
};
