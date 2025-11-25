//Posts details page
"use client";
import { useParams } from 'next/navigation';
import { usePostComments, usePostDetails } from '../../../../hooks/posts.hooks';
import { Card } from '@/components/ui/card';
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
  if (isLoadingPost || isLoadingComments) {
    return <div>Loading...</div>;
  }
  if (errorPost || errorComments) {
    return <div>Error loading post details</div>;
  }
  return <main className="m-4">
    <h1 className="mb-4 text-2xl font-bold">{post?.title}</h1>
    <p className="mb-8">{post?.body}</p>
    <section>
      <h2 className="mb-4 text-xl font-semibold">Comments</h2>
      <div className="flex flex-col gap-4">
        {comments?.map(comment => (
          <Card key={comment.id} className="rounded-md border p-4 shadow-sm">
            <h3 className="mb-2 text-lg font-semibold">{comment.name} ({comment.email})</h3>
            <p>{comment.body}</p>
          </Card>
        ))}
      </div>
    </section>
  </main>;
}