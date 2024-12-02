import { IBase } from './root.types';

export interface IPomodoroCycleResponse extends IBase {
	isCompleted?: boolean;
	totalSeconds: number;
}

export interface IPomodoroSessionResponse extends IBase {
	isCompleted?: boolean;
	cycles?: IPomodoroCycleResponse[];
}

export type TPomodoroSessionState = Partial<
	Omit<IPomodoroSessionResponse, 'id' | 'createdAt' | 'updatedAt'>
>;

export type TPomodoroCycleState = Partial<
	Omit<IPomodoroCycleResponse, 'id' | 'createdAt' | 'updatedAt'>
>;
