import { pomodoroService } from '@/services/pomodoro.service';
import { TPomodoroCycleState } from '@/types/pomodoro.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useUpdateCycles() {
	const queryClient = useQueryClient();

	const { mutate: updateCycle, isPending: isUpdateCyclePending } = useMutation({
		mutationKey: ['update cycle'],
		mutationFn: ({ id, data }: { id: string; data: TPomodoroCycleState }) =>
			pomodoroService.updateCycle(id, data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['get today session'],
			});
		},
	});
	return { updateCycle, isUpdateCyclePending };
}
