import { ChevronDown, MoreVertical, Plus } from "lucide-react";
import {
	Listbox,
	ListboxButton,
	ListboxOption,
	ListboxOptions,
	Transition,
} from "@headlessui/react";

import { forwardRef, type LegacyRef, useContext } from "react";
import type { ProfileContextType } from "@/vite-env";
import { DEFAULT_PROFILES } from "@/consts/ProfileConsts";
import { ProfileContext } from "@/contexts/ProfileContext";

const SelectProfileInput = forwardRef(
	(props, ref: LegacyRef<HTMLButtonElement>) => (
		<button
			type="button"
			ref={ref}
			className="btn btn-sm min-w-[130px] max-w-[180px] justify-between "
			{...props}
		/>
	),
);
const SelectProfileOption = forwardRef(
	(props, ref: LegacyRef<HTMLButtonElement>) => (
		<button
			ref={ref}
			className="btn btn-sm text-xs text-left justify-start "
			{...props}
		/>
	),
);

export const TopBarSelectProfile = () => {
	const { profile, setProfile } = useContext(
		ProfileContext,
	) as ProfileContextType;

	return (
		<Listbox
			value={profile}
			onChange={(e) => {
				const profile = DEFAULT_PROFILES.find(
					(profile) => profile.name === (e as unknown as string),
				);
				if (!profile) return;
				setProfile(profile);
			}}
		>
			<ListboxButton as={SelectProfileInput}>
				{profile.name}
				<ChevronDown className="ml-2 w-4 h-4 text-accent" />
			</ListboxButton>
			<Transition
				enter="duration-300 ease-out"
				enterFrom="opacity-0 scale-95"
				enterTo="opacity-100 scale-100"
				leave="duration-300 ease-out"
				leaveFrom="opacity-100 scale-100"
				leaveTo=" opacity-0 scale-95"
			>
				<ListboxOptions
					anchor="bottom start"
					className="flex flex-col gap-1 px-2 py-1 bg-base-200 rounded-lg shadow-lg shadow-base-200/20 origin-top transition w-[180px]"
				>
					{DEFAULT_PROFILES.map((profile) => {
						return (
							<ListboxOption
								as={SelectProfileOption}
								key={profile.name}
								value={profile.name}
							>
								{profile.name}
							</ListboxOption>
						);
					})}
				</ListboxOptions>
			</Transition>
		</Listbox>
	);
};
