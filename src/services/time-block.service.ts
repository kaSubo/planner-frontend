import { axiosWithAuth } from '@/api/interceptors';
import type { ITimeBlockResponse, TTimeBlockFormState } from '@/types/time-block.types';

class TimeBlockService {
	private BASE_URL = '/user/time-blocks';

	async getTimeBlocks() {
		const response = await axiosWithAuth.get<ITimeBlockResponse[]>(this.BASE_URL);
		return response;
	}

	async createTimeBlock(data: TTimeBlockFormState) {
		const response = await axiosWithAuth.post(this.BASE_URL, data);
		return response;
	}

	async updateTimeBlock(id: string, data: TTimeBlockFormState) {
		const response = await axiosWithAuth.put(`${this.BASE_URL}/${id}`, data);
		return response;
	}

	async updateTimeBlockOrder(ids: string[]) {
		const response = await axiosWithAuth.put(`${this.BASE_URL}/update-order`, { ids });
		return response;
	}

	async deleteTimeBlock(id: string) {
		const response = await axiosWithAuth.delete(`${this.BASE_URL}/${id}`);
		return response;
	}
}

export const timeBlockService = new TimeBlockService();
