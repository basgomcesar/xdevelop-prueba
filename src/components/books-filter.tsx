"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type BooksFiltersProps = {
  onChange: (filters: { q: string; author: string; year: string }) => void;
};

export function BooksFilters({ onChange }: BooksFiltersProps) {
  const [q, setQ] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");

  return (
    <div className="flex gap-3 mb-5 mt-4 border-t pt-5">
      <Input placeholder="Buscar libro..." value={q} onChange={(e) => setQ(e.target.value)} />
      <Input placeholder="Autor" value={author} onChange={(e) => setAuthor(e.target.value)} />
      <Input placeholder="Año" value={year} onChange={(e) => setYear(e.target.value)} />
      <Button onClick={() => onChange({ q, author, year })}>Buscar</Button>
    </div>
  );
}
