import { FILTERS } from '@/app/i/tasks/columns.data';
import { DropResult } from '@hello-pangea/dnd';
import { useUpdateTask } from './useUpdateTask';

export function useTasksDnd() {
	const { updateTask } = useUpdateTask();

	const onDragEnd = (result: DropResult) => {
		if (!result.destination) return;

		const destinationColumnId = result.destination.droppableId;

		if (destinationColumnId === result.source.droppableId) return;

		if (destinationColumnId === 'completed') {
			updateTask({
				id: result.draggableId,
				data: {
					isCompleted: true,
				},
			});
			return;
		}
		const newCreatedAt = FILTERS[destinationColumnId].format();

		updateTask({
			id: result.draggableId,
			data: {
				createdAt: newCreatedAt,
				isCompleted: false,
			},
		});
	};

	return { onDragEnd };
}
