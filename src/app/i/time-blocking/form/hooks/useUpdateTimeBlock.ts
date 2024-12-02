import { timeBlockService } from '@/services/time-block.service';
import { TTimeBlockFormState } from '@/types/time-block.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useUpdateTimeBlock(key?: string) {
	const queryClient = useQueryClient();

	const { mutate: updateTimeBlock } = useMutation({
		mutationKey: ['update time-block', key],
		mutationFn: ({ id, data }: { id: string; data: TTimeBlockFormState }) =>
			timeBlockService.updateTimeBlock(id, data),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: ['time-blocks'],
			});
		},
	});
	return { updateTimeBlock };
}
