import { useQuery } from "@tanstack/react-query";
import { usersService, ReqResUsersResponse,User } from "../services/users.service";

export function useUsers() {
    return useQuery<User[]>({
        queryKey: ['users'],
        queryFn: usersService.getUsers,
    });
}  
export function useUsersPg(page: number) {
    return useQuery<ReqResUsersResponse>({
        queryKey: ["users", page],
        queryFn: () => usersService.getUsersPg(page),
    });
}
