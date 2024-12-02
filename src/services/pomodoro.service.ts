import { axiosWithAuth } from '@/api/interceptors';
import type {
	IPomodoroCycleResponse,
	IPomodoroSessionResponse,
	TPomodoroCycleState,
	TPomodoroSessionState,
} from '@/types/pomodoro.types';

class PomodoroService {
	private BASE_URL = '/user/timer';

	async getTodaySession() {
		const response = await axiosWithAuth.get<IPomodoroSessionResponse>(
			`${this.BASE_URL}/today`
		);
		return response;
	}

	async createSession() {
		const response = await axiosWithAuth.post(this.BASE_URL);
		return response;
	}

	async updateSession(id: string, data: TPomodoroSessionState) {
		const response = await axiosWithAuth.put<IPomodoroSessionResponse>(
			`${this.BASE_URL}/${id}`,
			data
		);
		return response;
	}

	async deleteSession(id: string) {
		const response = await axiosWithAuth.delete(`${this.BASE_URL}/${id}`);
		return response;
	}

	async updateCycle(id: string, data: TPomodoroCycleState) {
		const response = await axiosWithAuth.put<IPomodoroCycleResponse>(
			`${this.BASE_URL}/cycle/${id}`,
			data
		);
		return response;
	}
}

export const pomodoroService = new PomodoroService();
