import { DEFAULT_TOOLS } from "@/consts/ToolsConsts";
import { ToolsContext } from "@/contexts/ToolsContext";
import type { Tool } from "@/vite-env";
import { useState } from "react";
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
