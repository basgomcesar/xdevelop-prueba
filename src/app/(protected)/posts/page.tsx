"use client";

import Link from "next/link";
import { useState } from "react";
import { usePosts } from "../../../hooks/posts.hooks";
import { useUsers } from "../../../hooks/users.hooks";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";


export default function PostsPage() {
  const [selectedUser, setSelectedUser] = useState<string>("all");

  const { data: posts, isLoading, error } = usePosts();
  const { data: users, isLoading: isLoadingUsers, error: errorUsers } = useUsers();

  const loading = isLoading || isLoadingUsers;
  const hasError = error || errorUsers;

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center flex-col text-muted-foreground">
        <Loader2 className="animate-spin w-8 h-8 mb-2" />
        Cargando posts...
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="flex h-[80vh] items-center justify-center text-red-600">
        Error al cargar los posts.
      </div>
    );
  }

  const filteredPosts =
    selectedUser === "all"
      ? posts
      : posts?.filter((post) => post.userId === Number(selectedUser));

  return (
    <main className="p-6">
      <h1 className="text-2xl  tracking-tight">Posts</h1>

      <div className="mt-6 max-w-sm">
        <Select onValueChange={setSelectedUser} defaultValue="all">
          <SelectTrigger>
            <SelectValue placeholder="Filtrar por usuario" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los usuarios</SelectItem>
            {users?.map((u) => (
              <SelectItem key={u.id} value={String(u.id)}>
                {u.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {filteredPosts?.map((post) => (
          <Link key={post.id} href={`/posts/${post.id}`}>
            <Card className="group h-full rounded-xl border hover:shadow-lg transition-all cursor-pointer">
              <CardHeader>
                <CardTitle className="line-clamp-2 text-lg group-hover:text-primary transition-colors">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground line-clamp-3">
                {post.body}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {filteredPosts?.length === 0 && (
        <p className="text-muted-foreground mt-8">No hay posts para este usuario.</p>
      )}
    </main>
  );
}
