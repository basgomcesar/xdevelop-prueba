"use client";

import { useState } from "react";
import { useBooks } from "@/hooks/books.hook";
import { BooksFilters } from "@/components/books-filter";
import { BooksTable } from "@/components/books-table";
import { Button } from "@/components/ui/button";

export default function BooksPage() {
  const [params, setParams] = useState({
    q: "",
    author: "",
    year: "",
    page: 1,
  });

  const { data, isLoading } = useBooks(params);

  const results = (data as any)?.docs ?? [];
  const numFound = (data as any)?.numFound ?? 0;

  return (
    <div className="p-4">
      <h1 className="text-2xl">Buscador de Libros</h1>

      <BooksFilters onChange={(filters) => setParams({ ...params, page: 1, ...filters })} />

      {isLoading && <p className="mt-4">Cargando...</p>}

      {!isLoading && (
        <>
          <BooksTable data={results} />

          <div className="flex justify-between mt-4">
            <Button
              disabled={params.page === 1}
              onClick={() => setParams((p) => ({ ...p, page: p.page - 1 }))}
            >
              Anterior
            </Button>

            <p>Página {params.page}</p>

            <Button
              disabled={results.length < 10}
              onClick={() => setParams((p) => ({ ...p, page: p.page + 1 }))}
            >
              Siguiente
            </Button>
          </div>

          <p className="mt-2 text-sm text-muted">
            Resultados totales: {numFound}
          </p>
        </>
      )}
    </div>
  );
}
