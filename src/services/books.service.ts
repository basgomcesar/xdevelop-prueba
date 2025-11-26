const BASE_URL = "https://openlibrary.org";

export interface SearchBooksParams {
  q: string;
  page: number;
  author?: string;
  year?: string;
}

export const booksService = {
  async searchBooks({ q, page, author, year }: SearchBooksParams) {
    const params = new URLSearchParams({
      q,
      page: String(page),
      limit: "10", 
    });

    if (author) params.append("author", author);
    if (year) params.append("first_publish_year", year);

    const res = await fetch(`${BASE_URL}/search.json?${params.toString()}`);
    if (!res.ok) throw new Error("Error fetching books");

    return res.json();
  },
};
