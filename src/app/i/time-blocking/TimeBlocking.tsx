'use client';

import type { TTimeBlockFormState } from '@/types/time-block.types';
import { FormProvider, useForm } from 'react-hook-form';
import { TimeBlockingForm } from './form/TimeBlockingForm';
import { TimeBlockingList } from './TimeBlockingList';

export function TimeBlocking() {
	const methods = useForm<TTimeBlockFormState>();

	return (
		<FormProvider {...methods}>
			<div className='grid grid-cols-2 gap-12'>
				<TimeBlockingList />  
				<TimeBlockingForm />
			</div>
		</FormProvider>
	);
}
