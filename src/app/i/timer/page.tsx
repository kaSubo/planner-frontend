import { Heading } from '@/components/ui';
import { NO_INDEX_PAGE } from '@/constants/seo.constants';
import type { Metadata } from 'next';
import { Pomodoro } from './Pomodoro';

export const metadata: Metadata = {
	title: 'Pomodoro Timer',
	...NO_INDEX_PAGE,
};

export default function TimerPage() {
	return (
		<>
			<Heading title='Pomodoro Timer' />
      <div className='flex items-center justify-center h-[70vh]'>
      <Pomodoro />
      </div>
		</>
	);
}
