"use client";
import { useUsersPg, useBulkDelete } from "@/hooks/users.hooks";
import UsersTable from "@/components/user-table";
import { useState, useMemo } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function UsersPage() {
  const [page, setPage] = useState(1);
  const { data: users, isLoading } = useUsersPg(page);

  const bulkDeleteMutation = useBulkDelete(page);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [selected, setSelected] = useState<number[]>([]);

  const filteredUsers = useMemo(() => {
    if (!users?.data) return [];
    return users.data
      .map((u, i) => ({ ...u, role: i % 2 === 0 ? "admin" : "user" }))
      .filter((u) =>
        (u.first_name ?? "").toLowerCase().includes(search.toLowerCase())
      )
      .filter((u) => (roleFilter === "all" ? true : u.role === roleFilter));
  }, [users, search, roleFilter]);

  const toggleSelect = (id: number | string) => {
    setSelected((prev) =>
      prev.includes(Number(id))
        ? prev.filter((x) => x !== Number(id))
        : [...prev, Number(id)]
    );
  };

  const selectAll = () => setSelected(filteredUsers.map((u) => Number(u.id)));
  const clearSelection = () => setSelected([]);

  const bulkDelete = async () => {
    await bulkDeleteMutation.mutateAsync(selected);
    clearSelection();
  };

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl mb-4">Usuarios</h1>

        <div className="flex flex-col md:flex-row gap-4">
          <Input
            placeholder="Buscar usuario..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/3"
          />

          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="Filtrar por rol" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="admin">Admins</SelectItem>
              <SelectItem value="user">Usuarios</SelectItem>
            </SelectContent>
          </Select>
        </div>


      {selected.length > 0 && (
        <Card className="p-4 border border-red-300 bg-red-50">
          <div className="flex flex-wrap items-center gap-4">
            <Badge variant="destructive">{selected.length} seleccionados</Badge>

            <Button
              variant="destructive"
              onClick={bulkDelete}
              disabled={bulkDeleteMutation.isPending}
            >
              {bulkDeleteMutation.isPending ? "Eliminando..." : "Eliminar seleccionados"}
            </Button>

            <Button variant="secondary" onClick={clearSelection}>
              Limpiar
            </Button>

            <Button onClick={selectAll}>
              Seleccionar todos
            </Button>
          </div>
        </Card>
      )}

      <Separator />

      <Card className="shadow-sm">
        <CardContent className="pt-4">
          <UsersTable
            data={filteredUsers}
            total={users?.total || 0}
            page={(users?.page ?? 1) - 1}
            setPage={(p: number) => setPage(p + 1)}
            pageSize={users?.per_page || 6}
            setPageSize={() => { }}
            totalPages={users?.total_pages || 1}
            selectedIds={selected}
            onToggleSelection={toggleSelect}
            onSelectAll={(ids) => setSelected(ids.map((id) => Number(id)))}
          />
        </CardContent>
      </Card>
    </main>
  );
}
