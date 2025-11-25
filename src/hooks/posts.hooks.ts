"use client";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { postsService, Post } from '../services/posts.service';

export function usePosts() {
    return useQuery<Post[]>({
        queryKey: ['posts'],
        queryFn: postsService.getPosts,
    });
};
export function usePostDetails(postId: number) {
    return useQuery<Post>({
        queryKey: ['post', postId],
        queryFn: () => postsService.getPostById(postId),
    });
}
export function usePostComments(postId: number) {
    return useQuery({
        queryKey: ['postComments', postId],
        queryFn: () => postsService.getCommentsByPostId(postId),
    });
}