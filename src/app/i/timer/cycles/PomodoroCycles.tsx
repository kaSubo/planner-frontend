import React from 'react';
import cn from 'clsx';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { IPomodoroCycleResponse } from '@/types/pomodoro.types';
import styles from './PomodoroCycle.module.scss';

interface IPomodoroCycles {
	cycles: IPomodoroCycleResponse[] | undefined;
	nextCycleHandler: () => void;
	prevCycleHandler: () => void;
	activeCycle: IPomodoroCycleResponse | undefined;
}

export function PomodoroCycles({
	activeCycle,
	cycles,
	nextCycleHandler,
	prevCycleHandler,
}: IPomodoroCycles) {
	const isValidPrevCycle = cycles ? cycles.some((cycle) => cycle.isCompleted) : false;
	const isValidNextCycle = cycles ? !cycles[cycles.length - 1].isCompleted : false;
	return (
		<div className={styles.container}>
			<button
				onClick={() => (isValidPrevCycle ? prevCycleHandler() : false)}
				disabled={!isValidPrevCycle}
				className={styles.button}>
				<ChevronLeft size={23} />
			</button>
			<div className={styles.cyclesContainer}>
				{cycles &&
					cycles.map((cycle, index) => (
						<div
							key={index}
							className={cn(styles.cycle, {
								[styles.completed]: cycle.isCompleted,
								[styles.active]: cycle.id === activeCycle?.id && !cycle.isCompleted,
							})}
						/>
					))}
			</div>
			<button
				onClick={() => (isValidNextCycle ? nextCycleHandler() : false)}
				disabled={!isValidNextCycle}
				className={styles.button}>
				<ChevronRight size={23} />
			</button>
		</div>
	);
}
