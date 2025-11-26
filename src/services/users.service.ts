export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
}

export const usersService = {
    //GET /users
    async getUsers(): Promise<User[]> {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        return res.json();
    }
    //GET /users?_page={page}&_limit={limit}
    ,
    async getUsersPg(page: number, limit: number): Promise<User[]> {
        const res = await fetch(`https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=${limit}`);
        return res.json();
    }
}
