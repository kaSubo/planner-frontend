import type { ITaskResponse } from '@/types/task.types';
import { Draggable, Droppable } from '@hello-pangea/dnd';
import React from 'react';
import styles from './ListView.module.scss';
import { ListRow } from './ListRow';
import { FILTERS } from '../columns.data';
import { filterTasks } from '../filterTasks';
import { ListAddRowInput } from './ListAddRowInput';

interface IListRowParent {
	value: string;
	label: string;
	items: ITaskResponse[] | undefined;
	setItems: React.Dispatch<React.SetStateAction<ITaskResponse[] | undefined>>;
}

export function ListRowParent({ value, label, items, setItems }: IListRowParent) {
	return (
		<Droppable droppableId={value}>
			{(provided) => (
				<div
					ref={provided.innerRef}
					{...provided.droppableProps}>
					<div className={styles.colHeading}>
						<div className='w-full'>{label}</div>
					</div>
					{filterTasks(items, value)?.map((item, index) => (
						<Draggable
							key={item.id}
							draggableId={item.id}
							index={index}>
							{(provided) => (
								<div
									ref={provided.innerRef}
									{...provided.draggableProps}
									{...provided.dragHandleProps}
									className='relative'>
									<ListRow
										key={item.id}
										item={item}
										setItems={setItems}
									/>
								</div>
							)}
						</Draggable>
					))}
					{provided.placeholder}

					{value !== 'completed' && !items?.some((item) => !item.id) && (
						<ListAddRowInput
							setItems={setItems}
							filterDate={FILTERS[value] ? FILTERS[value].format() : undefined}
						/>
					)}
				</div>
			)}
		</Droppable>
	);
}
