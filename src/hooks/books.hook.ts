import { useQuery } from "@tanstack/react-query";
import { booksService } from "@/services/books.service";

export const useBooks = (params: {
  q: string;
  page: number;
  author?: string;
  year?: string;
}) => {
  return useQuery({
    queryKey: ["books", params],
    queryFn: () => booksService.searchBooks(params),
    keepPreviousData: true, // paginación suave
  } as any);
};
