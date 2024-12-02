import { userService } from '@/services/user.service';
import type { TUserForm } from '@/types/auth.types';
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useUpdateSettings() {
	const queryClient = useQueryClient();
	const { mutate, isPending } = useMutation({
		mutationKey: ['update-profile'],
		mutationFn: (data: TUserForm) => userService.update(data),
		onSuccess() {
			toast.success('Profile updated successfully!');
			queryClient.invalidateQueries({ queryKey: ['profile'] });
		},
	});
	return { mutate, isPending };
}
