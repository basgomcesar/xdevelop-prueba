export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
}

export const usersService = {
    //GET /users
    async getPosts(): Promise<User[]> {
        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        return res.json();
    }
}