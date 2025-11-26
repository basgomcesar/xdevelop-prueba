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
    keepPreviousData: true, 
  } as any);
};

export const useBookDetails = (workKey: string | null) => {
  return useQuery({
    queryKey: ["book-details", workKey],
    queryFn: () => booksService.getBookDetails(workKey!),
    enabled: !!workKey, 
  } as any);
};