export interface User {
    id: number;
    first_name: string;
    username: string;
    email: string;
}
export interface ReqResUsersResponse {
    page: number;
    per_page: number;
    first_name: string;
    last_name: string;
    total: number;
    total_pages: number;
    data: User[];
}

export const usersService = {
    //GET /users
    async getUsers(): Promise<User[]> {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        return res.json();
    }
    //GET /users?_page={page}&_limit={limit}
    ,
    async getUsersPg(page: number): Promise<ReqResUsersResponse> {
        const res = await fetch(`https://reqres.in/api/users?page=${page}`, {
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json",
                "User-Agent": "xdevelop-test-client",
                "x-api-key": "reqres-free-v1"
            },
        });
        if (!res.ok) throw new Error("Error al obtener usuarios");
        return res.json();
    }
}
