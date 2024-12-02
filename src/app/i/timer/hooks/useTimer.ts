import type { IPomodoroCycleResponse } from '@/types/pomodoro.types';
import React from 'react';
import type { ITimerState } from '../timer.types';
import { useLoadSettings } from './useLoadSettings';

export function useTimer(): ITimerState {
	const { breakInterval, workInterval } = useLoadSettings();

	const [isRunning, setIsRunning] = React.useState(false);
	const [isBreakTime, setIsBreakTime] = React.useState(false);

	const [secondsLeft, setSecondsLeft] = React.useState(workInterval * 60);
	const [activeCycle, setActiveCycle] = React.useState<IPomodoroCycleResponse>();

	React.useEffect(() => {
		let interval: NodeJS.Timeout | null = null;

		if (isRunning) {
			interval = setInterval(() => {
				setSecondsLeft((secondsLeft) => secondsLeft - 1);
			}, 1000);
		} else if (!isRunning && secondsLeft !== 0 && interval) {
			clearInterval(interval);
		}

		return () => {
			if (interval) clearInterval(interval);
		};
	}, [isRunning, secondsLeft, workInterval, activeCycle]);

	React.useEffect(() => {
		if (secondsLeft > 0) return;

		setIsBreakTime(!isBreakTime);
		setSecondsLeft((isBreakTime ? workInterval : breakInterval) * 60);
	}, [secondsLeft, isBreakTime, workInterval, breakInterval]);

	return { activeCycle, secondsLeft, setActiveCycle, setIsRunning, setSecondsLeft, isRunning };
}
