import { timeBlockService } from '@/services/time-block.service';
import type { ITimeBlockResponse } from '@/types/time-block.types';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

export function useTimeBlocks() {
	const { data, isLoading } = useQuery({
		queryKey: ['time-blocks'],
		queryFn: () => timeBlockService.getTimeBlocks(),
	});

	const [items, setItems] = React.useState<ITimeBlockResponse[] | undefined>(data?.data);

	React.useEffect(() => {
		setItems(data?.data);
	}, [data?.data]);

	return { items, setItems, isLoading };
}
