import type { Tool } from "@/vite-env";

export const DEFAULT_TOOLS: Tool[] = [
	{
		id: 1,
		name: "Swap figures position",
		icon: "S",
		description: "Swap figures position with another inside the same table.",
		keyboard_shortcut: "CTRL+S",
	},
	{
		id: 2,
		name: "Replace figure",
		icon: "R",
		description:
			"Click in a figure to replace it with the current selected figure.",
		keyboard_shortcut: "CTRL+R",
	},
	{
		id: 3,
		name: "Remove figure",
		icon: "X",
		description: "Remove a figure from the table.",
		keyboard_shortcut: "CTRL+X",
	},
];
