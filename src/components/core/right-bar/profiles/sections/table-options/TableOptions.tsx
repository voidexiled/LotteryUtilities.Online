import { FormWrapper } from "@/components/core/right-bar/profiles/sections/FormWrapper";
import { FormInput } from "@/components/core/right-bar/profiles/sections/reusable/FormInput";
import type { Profile } from "@/vite-env";
import { ProfileFormTitle } from "../title/ProfileFormTitle";

type TableOptionsProps = {
	localProfile: Profile;
};
export const TableOptions = ({ localProfile }: TableOptionsProps) => {
	return (
		<FormWrapper>
			<ProfileFormTitle label="Opciones de tabla" />
		</FormWrapper>
	);
};
