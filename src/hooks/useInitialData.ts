import React from 'react';
import { useProfile } from './useProfile';
import type { UseFormReset } from 'react-hook-form';
import type { TUserForm } from '@/types/auth.types';

export function useInitialData(reset: UseFormReset<TUserForm>) {
	const { data, isSuccess } = useProfile();
	React.useEffect(() => {
		if (isSuccess && data) {
			reset({
				email: data.user.email,
				name: data.user.name,
				breakInterval: data.user.breakInterval,
				intervalsCount: data.user.intervalsCount,
				workInterval: data.user.workInterval,
			});
		}
	}, [isSuccess]);
}
