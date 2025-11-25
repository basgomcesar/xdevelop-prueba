// Página /posts protegida. 
// Mostrar posts por usuario. 
// Al entrar a un post, mostrar sus comentarios. 
// Crear y editar posts con TanStack Query y actualizaciones optimistas. 
// Guardar posts favoritos en Zustand o IndexedDB. 
// Datos y Relaciones Avanzadas: JSONPlaceholder 
// GET /users, GET /posts, GET /posts/:id/comments. 
// POST /posts y PUT /posts/:id para crear/editar posts. 
// Estado Global: Zustand. 
// Data Fetching: TanStack Query (useQuery, useMutation).
"use client";
import Link from 'next/link';
import { usePosts } from '../../../hooks/posts.hooks';
import { useUsers } from '../../../hooks/users.hooks';
import { Card } from '@/components/ui/card';
//Mostrar posts por usuarios

export default function PostsPage() {
  const { data: posts, isLoading, error } = usePosts();
  const { data: users, isLoading: isLoadingUsers, error: errorUsers } = useUsers();

  if (isLoading || isLoadingUsers) {
    return <div>Loading...</div>;
  }
  if (error || errorUsers) {
    return <div>Error loading posts</div>;
  }
  //Mostrar usuarios en un desplegable 

  //filtrar posts por usuario
  return <main className="m-4"><h1 className="text-2xl ">Posts</h1>
    <div className="flex flex-col gap-4 mt-4 border-t pt-5">
      {users?.map(user => (
        <div key={user.id} >{user.name}
          <div className='flex flex-1 flex-col gap-4 p-4'>
            <div className="grid auto-rows-min gap-4 md:grid-cols-5">
              {posts?.filter(post => post.userId === user.id).map(post => (
                <Link href={`/posts/${post.id}`} key={post.id}>
                  <Card key={post.id} className="rounded-md border p-4 shadow-sm hover:shadow-md hover:cursor-pointer transition-shadow">
                    <h2 className="mb-2 text-lg font-semibold">{post.title}</h2>
                    <p>{post.body}</p>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  </main>;
}