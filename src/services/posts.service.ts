export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export interface Comment {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}

export const postsService = {
    //GET /posts
    async getPosts(): Promise<Post[]> {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts');
        return res.json();
    }
    //GET /posts/:id
    , async getPostById(postId: number): Promise<Post> {
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
        return res.json();
    }
    //GET /posts/:id/comments
    , async getCommentsByPostId(postId: number): Promise<Comment[]> {
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
        return res.json();
    }
}