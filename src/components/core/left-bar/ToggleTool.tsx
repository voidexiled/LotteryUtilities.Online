import type { Tool } from "@/vite-env";
import type { ToolsContextType } from "../../../vite-env";
import { useContext } from "react";
import { cn } from "@/utils/utils";
import { ToolsContext } from "@/contexts/ToolsContext";

type ToggleToolProps = {
	tool: Tool;
	tooltip?: string;
	children: React.ReactNode | string;
};
export const ToggleTool = ({ children, tool, tooltip }: ToggleToolProps) => {
	const { selectedTool, setSelectedTool } = useContext(
		ToolsContext,
	) as ToolsContextType;

	return (
		<>
			{tooltip ? (
				<div
					className="lg:tooltip lg:tooltip-right text-xs "
					data-tip={tooltip}
				>
					<button
						type="button"
						className={cn(
							"btn btn-square btn-sm lg:btn-xs btn-ghost flex justify-center items-center",
							selectedTool === tool && "btn-active",
						)}
						onClick={() => {
							if (selectedTool !== tool) {
								setSelectedTool(tool);
							} else {
								setSelectedTool(null);
							}
						}}
					>
						{children}
					</button>
				</div>
			) : (
				<button
					type="button"
					className={cn(
						"btn btn-square btn-sm lg:btn-xs btn-ghost flex justify-center items-center",
						selectedTool === tool && "btn-active",
					)}
					onClick={() => {
						if (selectedTool !== tool) {
							setSelectedTool(tool);
						} else {
							setSelectedTool(null);
						}
					}}
				>
					{children}
				</button>
			)}
		</>
	);
};
