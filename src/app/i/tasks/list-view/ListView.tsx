'use client';

import React from 'react';
import styles from './ListView.module.scss';
import { DragDropContext } from '@hello-pangea/dnd';
import { useTasks } from '../hooks/useTasks';
import { useTasksDnd } from '../hooks/useTasksDnd';
import { COLUMNS } from '../columns.data';
import { ListRowParent } from './ListRowParent';

export function ListView() {
	const { items, setItems } = useTasks();
	const { onDragEnd } = useTasksDnd();

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div className={styles.table}>
				<div className={styles.header}>
					<div>Task name</div>
					<div>Due date</div>
					<div>Priority</div>
				</div>
				<div className={styles.parentsWrapper}>
					{COLUMNS.map((column) => (
						<ListRowParent
							key={column.value}
							items={items}
							label={column.label}
							value={column.value}
							setItems={setItems}
						/>
					))}
				</div>
			</div>
		</DragDropContext>
	);
}
