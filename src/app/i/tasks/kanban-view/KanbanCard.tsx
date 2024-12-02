import { Checkbox, TransparentField } from '@/components/ui';
import Loader from '@/components/ui/Loader';
import { DatePicker } from '@/components/ui/task-edit/DatePicker';
import { SingleSelect } from '@/components/ui/task-edit/SingleSelect';
import type { ITaskResponse, TTaskFormState } from '@/types/task.types';
import cn from 'clsx';
import { GripVertical, Trash } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { useDeleteTask } from '../hooks/useDeleteTask';
import { useTaskDebounce } from '../hooks/useTaskDebounce';
import styles from './KanbanView.module.scss';

interface IKanbanCard {
	item: ITaskResponse;
	setItems: React.Dispatch<React.SetStateAction<ITaskResponse[] | undefined>>;
}

export function KanbanCard({ item, setItems }: IKanbanCard) {
	const { register, control, watch } = useForm<TTaskFormState>({
		defaultValues: {
			name: item.name,
			isCompleted: item.isCompleted,
			createdAt: item.createdAt,
			priority: item.priority
		}
	})

	useTaskDebounce({ watch, itemId: item.id })

	const { deleteTask, isDeletePending } = useDeleteTask()

	return (
		<div
			className={cn(
				styles.card,
				{
					[styles.completed]: watch('isCompleted')
				},
				'animation-opacity'
			)}
		>
			<div className={styles.cardHeader}>
				<button aria-describedby='todo-item'>
					<GripVertical className={styles.grip} />
				</button>

				<Controller
					control={control}
					name='isCompleted'
					render={({ field: { value, onChange } }) => (
						<Checkbox
							onChange={onChange}
							checked={value}
						/>
					)}
				/>

				<TransparentField {...register('name')} />
			</div>

			<div className={styles.cardBody}>
				<Controller
					control={control}
					name='createdAt'
					render={({ field: { value, onChange } }) => (
						<DatePicker
							onChange={onChange}
							value={value || ''}
							position='left'
						/>
					)}
				/>

				<Controller
					control={control}
					name='priority'
					render={({ field: { value, onChange } }) => (
						<SingleSelect
							data={['high', 'medium', 'low'].map(item => ({
								value: item,
								label: item
							}))}
							onChange={onChange}
							value={value || ''}
						/>
					)}
				/>
			</div>

			<div className={styles.cardActions}>
				<button
					onClick={() =>
						item.id ? deleteTask(item.id) : setItems(prev => prev?.slice(0, -1))
					}
					className='opacity-50 transition-opacity hover:opacity-100'
				>
					{isDeletePending ? <Loader /> : <Trash size={15} />}
				</button>
			</div>
		</div>
	)
}
