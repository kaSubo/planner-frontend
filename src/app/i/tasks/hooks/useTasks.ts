import { taskService } from '@/services/task.service';
import type { ITaskResponse } from '@/types/task.types';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

export function useTasks() {
	const { data } = useQuery({
		queryKey: ['tasks'],
		queryFn: () => taskService.getTasks(),
	});

	const [items, setItems] = React.useState<ITaskResponse[] | undefined>(data?.data);

	React.useEffect(() => {
		setItems(data?.data);
	}, [data?.data]);

	return { items, setItems };
}
