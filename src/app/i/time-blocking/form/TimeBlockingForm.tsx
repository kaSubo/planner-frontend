import { Button, Field } from '@/components/ui';
import { SingleSelect } from '@/components/ui/task-edit/SingleSelect';
import type { TTimeBlockFormState } from '@/types/time-block.types';
import { Controller, SubmitHandler, useFormContext } from 'react-hook-form';
import { COLORS } from './colors.data';
import { useCreateTimeBlock } from './hooks/useCreateTimeBlock';
import { useUpdateTimeBlock } from './hooks/useUpdateTimeBlock';

export function TimeBlockingForm() {
	const { register, control, watch, reset, handleSubmit } =
		useFormContext<TTimeBlockFormState>();

	const existsId = watch('id');

	const { createTimeBlock, isPending } = useCreateTimeBlock();
	const { updateTimeBlock } = useUpdateTimeBlock(existsId);

	const onSubmit: SubmitHandler<TTimeBlockFormState> = (data) => {
		const { color, id, ...rest } = data;
		const dto = { ...rest, color: color || undefined };

		if (id) {
			updateTimeBlock({
				id,
				data: dto,
			});
		} else {
			createTimeBlock(dto);
		}

		reset({
			color: COLORS[COLORS.length - 1],
			duration: 0,
			name: '',
			id: undefined,
			order: 1,
		});
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='w-3/5'>
			<Field
				id='name'
				label='Enter time block name: '
				placeholder='Enter name: '
				{...register('name', {
					required: true,
				})}
				extra='mb-4'
			/>

			<Field
				id='duration'
				label='Enter time block duration (min.): '
				placeholder='Enter duration (min.): '
				{...register('duration', {
					required: true,
					valueAsNumber: true,
				})}
				extra='mb-4'
			/>

			<div>
				<span className='inline-block mb-1.5'>Color:</span>
				<Controller
					control={control}
					name='color'
					render={({ field: { onChange, value } }) => (
						<SingleSelect
							data={COLORS.map((item) => ({
								value: item,
								label: item,
							}))}
							onChange={onChange}
							value={value || COLORS[COLORS.length - 1]}
							isColorSelect
						/>
					)}
				/>
			</div>

			<Button
				type='submit'
				disabled={isPending}
				className='mt-6'>
				{existsId ? 'Update' : 'Create'}
			</Button>
		</form>
	);
}
