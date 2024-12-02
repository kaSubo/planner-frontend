import { pomodoroService } from '@/services/pomodoro.service';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import type { ITimerState } from '../timer.types';
import { useLoadSettings } from './useLoadSettings';

export function useTodaySession({ setActiveCycle, setSecondsLeft }: ITimerState) {
	const { workInterval } = useLoadSettings();
	const {
		data: sessionResponse,
		isLoading,
		refetch,
		isSuccess,
	} = useQuery({
		queryKey: ['get today session'],
		queryFn: () => pomodoroService.getTodaySession(),
	});

	const cycles = sessionResponse?.data.cycles;

	React.useEffect(() => {
		if (isSuccess && cycles) {
			const activeCycle = cycles.find((cycle) => !cycle.isCompleted);
			setActiveCycle(activeCycle);
			if (activeCycle && activeCycle.totalSeconds !== 0) {
				setSecondsLeft(activeCycle.totalSeconds);
			}
		}
	}, [isSuccess, cycles]);

	return { sessionResponse, isLoading, workInterval };
}
