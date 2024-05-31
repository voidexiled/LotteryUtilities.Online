import { DEFAULT_TOOLS } from "@/consts/ToolsConsts";
import { BrushIcon, MoveIcon } from "lucide-react";
import { ToggleTool } from "./ToggleTool";
export const LeftBar = () => {



	return (
		<div className="sticky top-0 left-0 order-1 flex flex-row items-center gap-2 rounded-lg bg-base-200 p-3 text-xs lg:relative lg:flex-col">
			<ToggleTool
				tool={DEFAULT_TOOLS[0]}
				tooltip="Insertar figura"
				shortcutModifier="ctrl"
				shortcutKey="z"
			>
				<BrushIcon className="flex h-4 w-4 transition-all" />
			</ToggleTool>
			<ToggleTool
				tool={DEFAULT_TOOLS[1]}
				tooltip="Mover figura"
				shortcutModifier="ctrl"
				shortcutKey="x"
			>
				<MoveIcon className="h-4 w-4 transition-all" />
			</ToggleTool>

		</div>
	);
};
