import { ProfileContext } from "@/contexts/ProfileContext";
import { cn } from "@/utils/utils";
import type { ProfileContextType } from "@/vite-env";
import { useContext } from "react";

export const GeneratorWrapper = ({
	children,
}: { children?: React.ReactNode | React.ReactNode[] }) => {
	const { profile } = useContext(ProfileContext) as ProfileContextType;

	return (
		<div className="flex h-fit flex-col text-xs lg:min-h-[2/6]">
			<div className="flex grow flex-col gap-1">
				<span className="font-bold text-secondary tracking-wider">
					Perfil seleccionado:{" "}
					<span className={cn("invisible font-normal", profile && "visible")}>
						{profile.name}
					</span>
				</span>
				<div className="flex flex-1 flex-col gap-1 pt-1 text-xs">
					{children}
				</div>
			</div>
		</div>
	);
};
