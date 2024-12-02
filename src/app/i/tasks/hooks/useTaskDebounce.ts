import type { TTaskFormState } from '@/types/task.types';
import debounce from 'lodash.debounce';
import React from 'react';
import { UseFormWatch } from 'react-hook-form';
import { useCreateTask } from './useCreateTask';
import { useUpdateTask } from './useUpdateTask';

interface IUseTaskDebounce {
	watch: UseFormWatch<TTaskFormState>;
	itemId: string;
}

export function useTaskDebounce({ watch, itemId }: IUseTaskDebounce) {
	const { createTask } = useCreateTask();
	const { updateTask } = useUpdateTask();

	const debouncedCreateTask = React.useCallback(
		debounce((formatData: TTaskFormState) => {
			createTask(formatData);
		}, 444),
		[]
	);

	const debouncedUpdateTask = React.useCallback(
		debounce((formatData: TTaskFormState) => {
			updateTask({ id: itemId, data: formatData });
		}, 444),
		[]
	);

	React.useEffect(() => {
		const { unsubscribe } = watch((formData) => {
			if (itemId) {
				debouncedUpdateTask({
					...formData,
					priority: formData.priority || undefined,
				});
			} else {
				debouncedCreateTask(formData);
			}
		});
		return () => {
			unsubscribe();
		};
	}, [watch(), debouncedUpdateTask, debouncedCreateTask]);
}
