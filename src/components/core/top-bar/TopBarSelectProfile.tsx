import {
	Listbox,
	ListboxButton,
	ListboxOption,
	ListboxOptions,
	Transition,
} from "@headlessui/react";
import { ChevronDown } from "lucide-react";

import { ProfileContext } from "@/contexts/ProfileContext";
import type { ProfileContextType } from "@/vite-env";
import { type LegacyRef, forwardRef, useContext } from "react";

const SelectProfileInput = forwardRef(
	(props, ref: LegacyRef<HTMLButtonElement>) => (
		<button
			type="button"
			ref={ref}
			className="btn btn-sm min-w-[130px] max-w-[180px] flex-nowrap justify-between"
			{...props}
		/>
	),
);
const SelectProfileOption = forwardRef(
	(props, ref: LegacyRef<HTMLButtonElement>) => (
		<button
			ref={ref}
			className="btn btn-sm flex-nowrap justify-start text-left text-xs"
			{...props}
		/>
	),
);

export const TopBarSelectProfile = () => {
	const { profile, setProfile, profiles } = useContext(
		ProfileContext,
	) as ProfileContextType;

	return (
		<Listbox
			value={profile}
			onChange={(e) => {
				console.log("macaco", e);
				const profile = profiles.find(
					(profile) => profile.id === (e as unknown as number),
				);
				if (!profile) return;
				setProfile(profile.id);
			}}
		>
			<ListboxButton as={SelectProfileInput}>
				<span className="flex-[3] overflow-hidden text-ellipsis text-nowrap">
					{profile.name}
				</span>
				<ChevronDown className="ml-2 flex min-h-4 min-w-4 flex-[1] text-accent" />
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
					{profiles.map((profile) => {
						return (
							<ListboxOption
								as={SelectProfileOption}
								key={profile.name + profile.id}
								value={profile.id}
							>
								<span className="overflow-hidden text-ellipsis text-nowrap">
									{profile.name}
								</span>
							</ListboxOption>
						);
					})}
				</ListboxOptions>
			</Transition>
		</Listbox>
	);
};
