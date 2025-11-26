"use client";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useRouter } from "next/navigation";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableCaption,
} from "@/components/ui/table";

type Book = {
  title: string;
  author_name?: string;
  first_publish_year?: number;
  [key: string]: any;
};

export function BooksTable({ data }: { data: Book[] }) {
  const router = useRouter();
  const columns = [
    { accessorKey: "title", header: "Título" },
    { accessorKey: "author_name", header: "Autor" },
    { accessorKey: "first_publish_year", header: "Año" },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table className="w-full border rounded-lg bg-white dark:bg-gray-800">
      <TableHeader>
        {table.getHeaderGroups().map((hg) => (
          <TableRow key={hg.id}>
            {hg.headers.map((h) => (
              <TableHead key={h.id}>
                {flexRender(h.column.columnDef.header, h.getContext())}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>

      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow className="cursor-pointer hover:bg-gray-100" key={row.id} onClick={() => router.push(`/books/${row.original.key}`)}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
