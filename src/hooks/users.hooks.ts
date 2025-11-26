import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { usersService, ReqResUsersResponse, User } from "../services/users.service";

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

export const useBulkDelete = (page: number) => {
    const qc = useQueryClient();

    return useMutation<any, Error, number[], { prev?: ReqResUsersResponse }>({
        mutationFn: async (ids: number[]) => usersService.bulkAction('delete', ids),
        onMutate: async (ids: number[]) => {
            await qc.cancelQueries({ queryKey: ['users', page] });
            const prev = qc.getQueryData<ReqResUsersResponse>(['users', page]);

            if (prev) {
                const newData = {
                    ...prev,
                    data: prev.data.filter(u => !ids.includes(u.id)),
                    total: Math.max(0, prev.total - ids.length),
                };
                qc.setQueryData(['users', page], newData);
            }

            return { prev };
        },
        onError: (err: Error, ids: number[] | undefined, context?: { prev?: ReqResUsersResponse }) => {
            if (context?.prev) {
                qc.setQueryData(['users', page], context.prev);
            }
        },
        onSettled: () => {
            qc.invalidateQueries({ queryKey: ['users'] });
        },
    });
};

export const useBulkChangeRole = (page: number) => {
    const qc = useQueryClient();

    return useMutation<any, Error, { ids: number[]; role: 'admin' | 'user' }, { prev?: ReqResUsersResponse }>({
        mutationFn: async ({ ids, role }: { ids: number[]; role: 'admin' | 'user' }) =>
            usersService.bulkAction('changeRole', ids, { role }),
        onMutate: async ({ ids, role }) => {
            await qc.cancelQueries({ queryKey: ['users', page] });
            const prev = qc.getQueryData<ReqResUsersResponse>(['users', page]);

            if (prev) {
                const newData = {
                    ...prev,
                    data: prev.data.map(u => (ids.includes(u.id) ? { ...u, role } : u)),
                };
                qc.setQueryData(['users', page], newData);
            }

            return { prev };
        },
        onError: (err, vars, context: any) => {
            if (context?.prev) qc.setQueryData(['users', page], context.prev);
        },
        onSettled: () => qc.invalidateQueries({ queryKey: ['users'] }),
    });
};