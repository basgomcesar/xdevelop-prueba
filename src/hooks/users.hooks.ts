import { useQuery } from '@tanstack/react-query';
import { usersService, User } from '../services/users.service';

export function useUsers() {
    return useQuery<User[]>({
        queryKey: ['users'],
        queryFn: usersService.getPosts,
    });
}  