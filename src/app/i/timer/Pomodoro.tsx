'use client';

import Loader from '@/components/ui/Loader';
import { Pause, Play, RefreshCcw } from 'lucide-react';
import { PomodoroCycles } from './cycles/PomodoroCycles';
import { formatTime } from './formatTime';
import { useCreateSession } from './hooks/useCreateSession';
import { useDeleteSession } from './hooks/useDeleteSession';
import { useTimer } from './hooks/useTimer';
import { useTimerActions } from './hooks/useTimerActions';
import { useTodaySession } from './hooks/useTodaySession';
import { Button } from '@/components/ui';

export function Pomodoro() {
	const timerState = useTimer();
	const { sessionResponse, isLoading, workInterval } = useTodaySession(timerState);

	const cycles = sessionResponse?.data.cycles;
	const actions = useTimerActions({ ...timerState, cycles });

	const { isPending, mutate } = useCreateSession();
	const { deleteSession, isDeletePending } = useDeleteSession(() =>
		timerState.setSecondsLeft(workInterval * 60)
	);

	return (
		<div className='relative flex flex-col items-center justify-center text-center'>
			{!isLoading && (
				<div className='text-9xl font-semibold'>{formatTime(timerState.secondsLeft)}</div>
			)}
			{isLoading ? (
				<Loader />
			) : sessionResponse?.data ? (
				<>
					<PomodoroCycles
						cycles={cycles}
						nextCycleHandler={actions.nextCycleHandler}
						prevCycleHandler={actions.prevCycleHandler}
						activeCycle={timerState.activeCycle}
					/>
					<button
						onClick={timerState.isRunning ? actions.pauseHandler : actions.playHandler}
						disabled={actions.isUpdateCyclePending}
						className='mt-6 opacity-80 hover:opacity-100 transition-opacity'>
						{timerState.isRunning ? <Pause size={50} /> : <Play size={50} />}
					</button>
					<button
						onClick={() => {
							timerState.setIsRunning(false);
							deleteSession(sessionResponse.data.id);
						}}
						disabled={isDeletePending}
						className='absolute top-0 right-0 opacity-40 hover:opacity-90 transition-opacity'>
						<RefreshCcw size={19} />
					</button>
				</>
			) : (
				<Button
					onClick={() => mutate()}
					disabled={isPending}
					className='mt-1'>
					Create session
				</Button>
			)}
		</div>
	);
}
