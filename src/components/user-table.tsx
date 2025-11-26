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
    role?: string;
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
    selectedIds: (number | string)[];
    onToggleSelection: (id: number | string) => void;
    onSelectAll: (ids: (number | string)[]) => void;
}

export default function UsersTable({
    data = [],
    totalPages,
    page,
    setPage,
    pageSize,
    setPageSize,

    selectedIds = [],
    onToggleSelection,
    onSelectAll,
}: UsersTableProps) {

    const allIds = data.map((d) => d.id);
    const allSelected =
        allIds.length > 0 && allIds.every((id) => selectedIds.includes(id));

    const columns = [
        {
            id: "select",
            size: 40,
            header: () => (
                <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={() =>
                        onSelectAll(allSelected ? [] : allIds)
                    }
                />
            ),
            cell: ({ row }: any) => {
                const id = row.original.id;
                return (
                    <input
                        type="checkbox"
                        checked={selectedIds.includes(id)}
                        onChange={() => onToggleSelection(id)}
                    />
                );
            },
        },
        { accessorKey: "id", header: "ID" },
        { accessorKey: "first_name", header: "Nombre" },
        { accessorKey: "email", header: "Email" },
        { accessorKey: "role", header: "Rol" },
    ];

    const table = useReactTable({
        data,
        columns,
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

            if (next.pageIndex < 0) return;
            if (next.pageIndex >= totalPages) return;

            setPage(next.pageIndex);
            setPageSize(next.pageSize);
        },
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="border rounded-md w-full overflow-hidden">
            <Table className="w-full bg-white dark:bg-gray-800">
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead
                                    key={header.id}
                                    className="p-2"
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
                                <td key={cell.id} className="p-2">
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

            <div className="flex items-center justify-between p-2 border-t bg-gray-50 dark:bg-gray-700">
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
