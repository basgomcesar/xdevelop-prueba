'use client';
import React from 'react';

import { useParams } from 'next/navigation';
import { useBookDetails } from '@/hooks/books.hook';

type AuthorRef = {
  author: { key: string };
  type?: { key: string };
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
  authors?: AuthorRef[];
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

  const getWorkKey = (k?: string) => (k ? k.split('/').pop() : undefined);
  const getAuthorId = (ref?: AuthorRef) => ref?.author?.key?.split('/').pop();
  const coverUrl = (covers?: number[], size: 'S' | 'M' | 'L' = 'L') => {
    const id = covers && covers.length ? covers[0] : undefined;
    if (!id || id <= 0) return null;
    return `https://covers.openlibrary.org/b/id/${id}-${size}.jpg`;
  };
  const formatDescription = (d?: string | { value?: string }) =>
    d ? (typeof d === 'string' ? d : d.value ?? '') : 'No disponible';
  const formatDate = (d?: string) => d ?? 'Desconocido';

  return (
    <main className="m-4">
      <h1 className="text-2xl">Detalle del Libro</h1>

      {isLoading && <p>Cargando detalles del libro...</p>}
      {error && <p>Error al cargar los detalles del libro.</p>}

      {book && (
        <div className="mt-4 space-y-3">
          <div className="flex items-start gap-4">
            {coverUrl(book.covers) ? (
              <img
                src={coverUrl(book.covers, 'M') || undefined}
                alt={book.title ?? 'Portada'}
                className="w-32 h-auto rounded shadow"
              />
            ) : (
              <div className="w-32 h-48 bg-gray-200 rounded flex items-center justify-center text-sm">
                Sin portada
              </div>
            )}

            <div>
              <h2 className="text-xl font-semibold">{book.title ?? 'Título desconocido'}</h2>
              <p className="text-sm text-gray-600">
                Work ID: {getWorkKey(book.key) ?? getWorkKey(book.location) ?? 'Desconocido'}
              </p>
              <p>
                Autor:{' '}
                {book.authors && book.authors.length ? (
                  book.authors.map((a, idx) => {
                    const aid = getAuthorId(a) ?? a?.author?.key ?? 'Desconocido';
                    return (
                      <span key={idx}>
                        <a href={`/authors/${aid}`} className="text-blue-600 underline">
                          {aid}
                        </a>
                        {idx < (book.authors?.length ?? 0) - 1 ? ', ' : ''}
                      </span>
                    );
                  })
                ) : (
                  <span>Desconocido</span>
                )}
              </p>
              <p>Fecha primera publicación: {formatDate(book.first_publish_date ?? book.first_publish_year?.toString())}</p>
              <p>Creado: {book.created?.value ? new Date(book.created.value).toLocaleString() : 'Desconocido'}</p>
              <p>Última modificación: {book.last_modified?.value ? new Date(book.last_modified.value).toLocaleString() : 'Desconocido'}</p>
            </div>
          </div>

          <div>
            <h3 className="font-medium">Descripción</h3>
            <p>{formatDescription(book.description)}</p>
          </div>

          {book.subjects && book.subjects.length > 0 && (
            <div>
              <h3 className="font-medium">Subjects</h3>
              <p>{book.subjects.join(', ')}</p>
            </div>
          )}

          {(book.subject_places || book.subject_people) && (
            <div>
              {book.subject_places && book.subject_places.length > 0 && (
                <>
                  <h4 className="font-medium">Lugares</h4>
                  <p>{book.subject_places.join(', ')}</p>
                </>
              )}
              {book.subject_people && book.subject_people.length > 0 && (
                <>
                  <h4 className="font-medium">Personajes</h4>
                  <p>{book.subject_people.join(', ')}</p>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </main>
  );
}