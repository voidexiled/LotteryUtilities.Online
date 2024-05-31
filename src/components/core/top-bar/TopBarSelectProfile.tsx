import {
	Listbox,
	ListboxButton,
	ListboxOption,
	ListboxOptions,
	Transition,
} from "@headlessui/react";
import { ChevronDown } from "lucide-react";

import { DEFAULT_PROFILES } from "@/consts/ProfileConsts";
import { ProfileContext } from "@/contexts/ProfileContext";
import type { ProfileContextType } from "@/vite-env";
import { type LegacyRef, forwardRef, useContext } from "react";

const SelectProfileInput = forwardRef(
	(props, ref: LegacyRef<HTMLButtonElement>) => (
		<button
			type="button"
			ref={ref}
			className="btn btn-sm min-w-[130px] max-w-[180px] justify-between"
			{...props}
		/>
	),
);
const SelectProfileOption = forwardRef(
	(props, ref: LegacyRef<HTMLButtonElement>) => (
		<button
			ref={ref}
			className="btn btn-sm justify-start text-left text-xs"
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
				<ChevronDown className="ml-2 h-4 w-4 text-accent" />
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
					className="flex w-[180px] origin-top flex-col gap-1 rounded-lg bg-base-200 px-2 py-1 shadow-base-200/20 shadow-lg transition"
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
