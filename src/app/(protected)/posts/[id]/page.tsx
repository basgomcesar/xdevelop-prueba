"use client";

import { useParams } from "next/navigation";
import { usePostComments, usePostDetails } from "../../../../hooks/posts.hooks";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Loader2, MessageSquare } from "lucide-react";


export default function PostDetailsPage() {
  const { id } = useParams();

  const {
    data: post,
    isLoading: isLoadingPost,
    error: errorPost,
  } = usePostDetails(Number(id));

  const {
    data: comments,
    isLoading: isLoadingComments,
    error: errorComments,
  } = usePostComments(Number(id));

  const loading = isLoadingPost || isLoadingComments;
  const hasError = errorPost || errorComments;

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center flex-col text-muted-foreground">
        <Loader2 className="animate-spin w-8 h-8 mb-2" />
        Cargando detalles del post...
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="flex h-[80vh] items-center justify-center text-red-600">
        Error cargando los detalles del post.
      </div>
    );
  }

  return (
    <main className="p-6">
      <Card className="border rounded-xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-3xl font-semibold tracking-tight">
            {post?.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {post?.body}
          </p>
        </CardContent>
      </Card>

      <section className="mt-10">
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare className="w-5 h-5 text-primary" />
          <h2 className="text-2xl font-semibold">Comentarios ({comments?.length})</h2>
        </div>

        <div className="flex flex-col gap-4">
          {comments?.map((comment) => (
            <Card
              key={comment.id}
              className="rounded-xl border p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-semibold">{comment.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">{comment.email}</p>

              <p className="text-sm leading-relaxed">{comment.body}</p>
            </Card>
          ))}
        </div>

        {comments?.length === 0 && (
          <p className="text-muted-foreground mt-6">No hay comentarios.</p>
        )}
      </section>
    </main>
  );
}
