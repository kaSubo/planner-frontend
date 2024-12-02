import { IPomodoroCycleResponse } from '@/types/pomodoro.types';
import type { ITimerState } from '../timer.types';
import { useLoadSettings } from './useLoadSettings';
import { useUpdateCycles } from './useUpdateCycles';

type TUseTimerActions = ITimerState & {
	cycles: IPomodoroCycleResponse[] | undefined;
};

export function useTimerActions({
	activeCycle,
	setActiveCycle,
	secondsLeft,
	setIsRunning,
	cycles,
}: TUseTimerActions) {
	const { workInterval } = useLoadSettings();
	const { isUpdateCyclePending, updateCycle } = useUpdateCycles();

	const pauseHandler = () => {
		setIsRunning(false);
		if (!activeCycle?.id) return  

			updateCycle({
				id: activeCycle.id,
				data: {
					totalSeconds: secondsLeft,
					isCompleted: Math.floor(secondsLeft / 60) >= workInterval,
				},
			});
		
	};

	const playHandler = () => {
		setIsRunning(true);
	};

	const nextCycleHandler = () => {
		if (!activeCycle?.id) return;

		updateCycle({
			id: activeCycle.id,
			data: {
				isCompleted: true,
				totalSeconds: workInterval * 60,
			},
		});
	};

	const prevCycleHandler = () => {
		const lastCompletedCycle = cycles?.findLast((cycle) => cycle.isCompleted);

		if (!lastCompletedCycle?.id) return;

		updateCycle({
			id: lastCompletedCycle?.id,
			data: {
				isCompleted: false,
				totalSeconds: 0,
			},
		});
		setActiveCycle(lastCompletedCycle);
	};

	return {
		isUpdateCyclePending,
		pauseHandler,
		playHandler,
		nextCycleHandler,
		prevCycleHandler,
	};
}
