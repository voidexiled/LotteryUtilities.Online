import { FormWrapper } from "@/components/core/right-bar/profiles/sections/FormWrapper";
// import type { Profile } from "@/vite-env";
import { ProfileFormTitle } from "../title/ProfileFormTitle";

// type TableOptionsProps = {
// 	localProfile: Profile;
// };
export const TableOptions = () => {
	return (
		<FormWrapper>
			<ProfileFormTitle label="Opciones de tabla" />
		</FormWrapper>
	);
};
