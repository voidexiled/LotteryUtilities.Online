
import { RightBarProfileViewer } from "./table-generator/RightBarTableGenerator";
import { RightBarTableThumbs } from "./table-thumbs/RightBarTableThumbs";



export const RightBar = () => {

	return (
		<div className="flex flex-col bg-base-200 lg:min-w-[560px] lg:max-w-[560px] min-h-[320px] max-h-[480px]  lg:min-h-full rounded-lg px-4 p-4 overflow-hidden order-2 lg:order-3 mt-4 lg:mt-0 ">
			<RightBarProfileViewer />
			<RightBarTableThumbs />

		</div>
	);
};
