import type { ITaskResponse } from '@/types/task.types';
import React from 'react';

interface IKanbanAddCardInput {
	filterDate?: string;
	setItems: React.Dispatch<React.SetStateAction<ITaskResponse[] | undefined>>;
}

export function KanbanAddCardInput({ filterDate, setItems }: IKanbanAddCardInput) {
	const addCard = () => {
		setItems((prev) => {
			if (!prev) return;

			return [
				...prev,
				{
					id: '',
					name: '',
					isCompleted: false,
					createdAt: filterDate,
				},
			];
		});
	};
	return (
		<div className='mt-5'>
			<button
				onClick={addCard}
				className='italic opacity-40 text-sm'>
				Add task...
			</button>
		</div>
	);
}
