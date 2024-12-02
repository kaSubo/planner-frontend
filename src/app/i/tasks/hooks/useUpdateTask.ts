import { taskService } from '@/services/task.service';
import type { TTaskFormState } from '@/types/task.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useUpdateTask(key?: string) {
	const queryClient = useQueryClient();

	const { mutate: updateTask } = useMutation({
		mutationKey: ['update task', key],
		mutationFn: ({ id, data }: { id: string; data: TTaskFormState }) =>
			taskService.updateTask(id, data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['tasks'],
			});
		},
	});
	return { updateTask };
}
