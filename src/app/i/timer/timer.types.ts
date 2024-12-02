import type { IPomodoroCycleResponse } from '@/types/pomodoro.types';
import React from 'react';

export interface ITimerState {
	isRunning: boolean;
	secondsLeft: number;
	setSecondsLeft: React.Dispatch<React.SetStateAction<number>>;
	activeCycle: IPomodoroCycleResponse | undefined;
	setActiveCycle: React.Dispatch<
		React.SetStateAction<IPomodoroCycleResponse | undefined>
	>;
	setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
}
