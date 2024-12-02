import type { ITaskResponse } from '@/types/task.types';
import React from 'react';
import styles from './ListView.module.scss';

interface IListAddRowInput {
	filterDate?: string;
	setItems: React.Dispatch<React.SetStateAction<ITaskResponse[] | undefined>>;
}

export function ListAddRowInput({ filterDate, setItems }: IListAddRowInput) {
	const addRow = () => {
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
		<div className={styles.addRow}>
			<button
				onClick={addRow}
				className='italic opacity-40 text-sm'>
				Add task...
			</button>
		</div>
	);
}
