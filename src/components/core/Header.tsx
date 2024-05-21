import {
	MoreHorizontalIcon,
	MoreVerticalIcon,
	Plus,
	PlusIcon,
	PrinterIcon,
	SendIcon,
	Settings2Icon,
	SettingsIcon,
} from "lucide-react";

import { TopBarButton } from "./top-bar/TopBarButton";
import { TopBarGroupButtons } from "./top-bar/TopBarGroupButtons";
import { TopBarSelectProfile } from "./top-bar/TopBarSelectProfile";
import { TopBarTitle } from "./top-bar/TopBarTitle";

export const Header = () => {
	return (
		<div className="flex flex-row justify-center items-center p-4 grow basis-[100px]">
			<div className="flex flex-row justify-between items-center px-4 bg-base-200 grow h-full rounded-lg shadow-lg shadow-base-200/15">
				<TopBarGroupButtons align="start">
					<TopBarButton
						isIcon
						iconRenderer={<MoreVerticalIcon className="text-accent w-5 h-5" />}
					/>
					<TopBarSelectProfile />
					<TopBarButton
						isIcon
						iconRenderer={<PlusIcon className="text-accent w-5 h-5" />}
					/>
				</TopBarGroupButtons>

				<TopBarTitle title="TablasLoteriaMX.Online" />

				<TopBarGroupButtons align="end">
					<TopBarButton
						iconRenderer={<SendIcon className="text-accent w-5 h-5" />}
						isIcon
					/>
					<TopBarButton
						isIcon
						iconRenderer={<PrinterIcon className="text-accent w-5 h-5" />}
					/>

					<TopBarButton
						iconRenderer={<SettingsIcon className="text-accent w-5 h-5" />}
						isIcon
					/>
				</TopBarGroupButtons>
			</div>
		</div>
	);
};
