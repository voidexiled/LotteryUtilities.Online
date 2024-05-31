import { ToolsContext } from "@/contexts/ToolsContext";
import { cn } from "@/utils/utils";
import type { Tool } from "@/vite-env";
import { useContext, useEffect } from "react";
import type { ToolsContextType } from "../../../vite-env";

type ToggleToolProps = {
	tool: Tool;
	tooltip?: string;
	children: React.ReactNode | string;
	shortcutModifier?: string;
	shortcutKey?: string;
};
export const ToggleTool = ({ children, tool, tooltip, shortcutModifier, shortcutKey }: ToggleToolProps) => {
	const { selectedTool, setSelectedTool } = useContext(
		ToolsContext,
	) as ToolsContextType;



	useEffect(() => {
		if (shortcutModifier && shortcutKey) {
			const keyManagerListener = (e: KeyboardEvent) => {
				const modifier: boolean = shortcutModifier === "ctrl" ? e.ctrlKey
					: shortcutModifier === "shift" ? e.shiftKey
						: shortcutModifier === "alt" ? e.altKey
							: false;
				if (modifier && e.key === shortcutKey) {
					e.preventDefault();
					e.stopPropagation();
					setSelectedTool(tool);
				}

			};
			document.addEventListener("keydown", keyManagerListener);
			return () => {
				document.removeEventListener("keydown", keyManagerListener);
			}
		}
	});

	return (
		<>
			{tooltip ? (
				<div
					className="lg:tooltip lg:tooltip-right text-xs"
					data-tip={tooltip}
				>
					<button
						type="button"
						className={cn(
							"btn btn-square btn-sm lg:btn-xs btn-ghost flex items-center justify-center",
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
						"btn btn-square btn-sm lg:btn-xs btn-ghost flex items-center justify-center",
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
