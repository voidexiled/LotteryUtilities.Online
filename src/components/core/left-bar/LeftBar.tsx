import { DEFAULT_TOOLS } from "@/consts/ToolsConsts";
import { ToggleTool } from "./ToggleTool";
import { BrushIcon, MoveIcon } from "lucide-react";
export const LeftBar = () => {
	return (
		<div className="flex flex-row lg:flex-col bg-base-200 rounded-lg items-center p-3 gap-2 text-xs order-1 ">
			<ToggleTool tool={DEFAULT_TOOLS[0]} tooltip="Insertar figura">
				<BrushIcon className="w-4 h-4 transition-all" />
			</ToggleTool>
			<ToggleTool tool={DEFAULT_TOOLS[1]} tooltip="Mover figura">
				<MoveIcon className="w-4 h-4 transition-all" />
			</ToggleTool>
		</div>
	);
};