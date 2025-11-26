'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useBookDetails } from '@/hooks/books.hook';

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { AlertCircle } from "lucide-react";

type AuthorRef = {
  author: { key: string };
};

type DateObject = {
  type?: string;
  value?: string;
};

type Book = {
  key?: string; 
  title?: string;
  first_publish_date?: string;
  first_publish_year?: number;
  authors?: string[] | AuthorRef[];
  covers?: number[];
  subjects?: string[];
  subject_places?: string[];
  subject_people?: string[];
  description?: string | { value?: string };
  created?: DateObject;
  last_modified?: DateObject;
  [key: string]: any;
};

export default function BookDetailPage() {
  const params = useParams();
  const [, workId] = params.id || [];
  const id = workId;

  const { data, error, isLoading } = useBookDetails(id as string);
  const book = data as Book | undefined;

  const coverUrl = (covers?: number[], size: "S" | "M" | "L" = "L") => {
    const id = covers && covers.length ? covers[0] : undefined;
    if (!id) return null;
    return `https://covers.openlibrary.org/b/id/${id}-${size}.jpg`;
  };

  const getAuthorId = (ref?: AuthorRef) => ref?.author?.key?.split("/").pop();
  const getWorkKey = (k?: string) => (k ? k.split("/").pop() : undefined);

  const formatDescription = (d?: string | { value?: string }) =>
    d ? (typeof d === "string" ? d : d.value ?? "") : "No disponible";

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-3xl font-semibold">Detalle del Libro</h1>

      {isLoading && (
        <div className="space-y-4">
          <Skeleton className="h-64 w-44 rounded-md" />
          <Skeleton className="h-6 w-60" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 text-red-600">
          <AlertCircle className="w-5 h-5" />
          Error al cargar los detalles del libro.
        </div>
      )}

      {book && (
        <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-6">
          <div>
            {coverUrl(book.covers) ? (
              <img
                src={coverUrl(book.covers, "L") ?? undefined}
                alt={book.title ?? "Portada"}
                className="w-44 rounded shadow-md border"
              />
            ) : (
              <div className="w-44 h-64 bg-muted rounded flex items-center justify-center text-sm text-muted-foreground">
                Sin portada
              </div>
            )}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{book.title ?? "Título desconocido"}</CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Work ID: {getWorkKey(book.key) ?? "Desconocido"}
              </p>

              <Separator />

              <p>
                <span className="font-medium">Autor(es):</span>{" "}
                {book.authors?.length ? (
                  book.authors.map((author, index) => (
                    <span key={index}>
                      {typeof author === "string" ? author : getAuthorId(author) ?? author.author?.key ?? "Desconocido"}
                      {index < (book.authors?.length || 0) - 1 ? ", " : ""}
                    </span>
                  ))
                ) : (
                  "Desconocido"
                )}
              </p>

              <p>
                <span className="font-medium">Primera publicación:</span>{" "}
                {book.first_publish_date ||
                  book.first_publish_year ||
                  "Desconocido"}
              </p>

              <p>
                <span className="font-medium">Creado:</span>{" "}
                {book.created?.value
                  ? new Date(book.created.value).toLocaleString()
                  : "Desconocido"}
              </p>

              <p>
                <span className="font-medium">Última modificación:</span>{" "}
                {book.last_modified?.value
                  ? new Date(book.last_modified.value).toLocaleString()
                  : "Desconocido"}
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {book && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Descripción</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="leading-relaxed text-sm">
              {formatDescription(book.description)}
            </p>
          </CardContent>
        </Card>
      )}

      {book?.subjects && book.subjects.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Temas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {book.subjects.join(", ")}
            </p>
          </CardContent>
        </Card>
      )}

      {(book?.subject_places?.length || book?.subject_people?.length) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Detalles adicionales</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {book.subject_places && (
              <p>
                <span className="font-medium">Lugares:</span>{" "}
                {book.subject_places.join(", ")}
              </p>
            )}
            {book.subject_people && (
              <p>
                <span className="font-medium">Personajes:</span>{" "}
                {book.subject_people.join(", ")}
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </main>
  );
}
