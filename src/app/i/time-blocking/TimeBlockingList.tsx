import React from 'react';
import { useTimeBlocks } from './hooks/useTimeBlocks';
import { useTimeBlockDnd } from './hooks/useTimeBlockDnd';
import Loader from '@/components/ui/Loader';
import { calcHoursLeft } from './calcHoursLeft';
import styles from './TimeBlocking.module.scss';
import { closestCenter, DndContext } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { TimeBlock } from './TimeBlock';

export function TimeBlockingList() {
	const { items, setItems, isLoading } = useTimeBlocks();
	const { sensors, handleDragEnd } = useTimeBlockDnd(items, setItems);

	if (isLoading) return <Loader />;

	const { hoursLeft } = calcHoursLeft(items);

	return (
		<div>
			<DndContext
				sensors={sensors}
				collisionDetection={closestCenter}
				onDragEnd={handleDragEnd}>
				<div className={styles.list}>
					<SortableContext
						items={items || []}
						strategy={verticalListSortingStrategy}>
						{items?.length ? (
							items.map((item) => (
								<TimeBlock
									key={item.id}
									item={item}
								/>
							))
						) : (
							<div>Add you first time block!</div>
						)}
					</SortableContext>
				</div>
			</DndContext>
			<div className='text-gray-200/70 text-center'>
				{items && items?.length > 0
					? hoursLeft > 0
						? `${hoursLeft} hours out of 24 are free!`
						: 'No hours are free'
					: ''}
			</div>
		</div>
	);
}
