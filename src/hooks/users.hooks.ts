import { useQuery } from '@tanstack/react-query';
import { usersService, User } from '../services/users.service';

export function useUsers() {
    return useQuery<User[]>({
        queryKey: ['users'],
        queryFn: usersService.getUsers,
    });
}  
export function useUsersPg(page: number, limit: number) {
    return useQuery<User[]>({
        queryKey: ['users', page, limit],
        queryFn: () => usersService.getUsersPg(page, limit),
    });
}