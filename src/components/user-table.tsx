"use client";

import {
    useReactTable,
    getCoreRowModel,
    flexRender,
} from "@tanstack/react-table";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "./ui/table";
import { Button } from "./ui/button";

type User = {
    id: number | string;
    first_name: string;
    email: string;
    [key: string]: any;
};

interface UsersTableProps {
    data?: User[];
    total: number;
    totalPages: number;
    page: number;         
    setPage: (p: number) => void;
    pageSize: number;
    setPageSize: (s: number) => void;
}

export default function UsersTable({
    data,
    total,
    totalPages,
    page,
    setPage,
    pageSize,
    setPageSize,
}: UsersTableProps) {
    const table = useReactTable({
        data: data ?? [],
        columns: [
            { accessorKey: "id", header: "ID" },
            { accessorKey: "first_name", header: "Nombre" },
            { accessorKey: "email", header: "Email" },
            { accessorKey: "role", header: "Rol" },
        ],
        manualPagination: true,
        pageCount: totalPages, 
        state: {
            pagination: {
                pageIndex: page,
                pageSize,
            },
        },
        onPaginationChange: (updater) => {
            const next =
                typeof updater === "function"
                    ? updater({ pageIndex: page, pageSize })
                    : updater;

            setPage(next.pageIndex);
            setPageSize(next.pageSize);
        },
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="border rounded-md w-full">
            <Table className="w-full">
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead
                                    key={header.id}
                                    className="p-2"
                                    style={{
                                        width: `${100 / headerGroup.headers.length}%`,
                                    }}
                                >
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                              header.column.columnDef.header,
                                              header.getContext()
                                          )}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>

                <TableBody>
                    {table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id} className="border-t">
                            {row.getVisibleCells().map((cell) => (
                                <td
                                    key={cell.id}
                                    className="p-2"
                                    style={{
                                        width: `${100 / row.getVisibleCells().length}%`,
                                    }}
                                >
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </td>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <div className="flex items-center justify-between p-2 border-t">
                <Button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 0}
                >
                    Anterior
                </Button>

                <span>
                    Página {page + 1} de {totalPages}
                </span>

                <Button
                    onClick={() => setPage(page + 1)}
                    disabled={page + 1 >= totalPages}
                >
                    Siguiente
                </Button>
            </div>
        </div>
    );
}
