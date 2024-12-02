'use client';

import { DragDropContext } from '@hello-pangea/dnd';
import { COLUMNS } from '../columns.data';
import { useTasks } from '../hooks/useTasks';
import { useTasksDnd } from '../hooks/useTasksDnd';
import { KanbanColumn } from './KanbanColumn';
import styles from './KanbanView.module.scss';

export function KanbanView() {
	const { items, setItems } = useTasks();
	const { onDragEnd } = useTasksDnd();

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div className={styles.board}>
				{COLUMNS.map((column) => (
					<KanbanColumn
						key={column.value}
						label={column.label}
						value={column.value}
						items={items}
						setItems={setItems}
					/>
				))}
			</div>
		</DragDropContext>
	);
}
