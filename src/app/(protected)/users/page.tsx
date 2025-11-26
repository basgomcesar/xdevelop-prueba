"use client";
import { useUsersPg } from "@/hooks/users.hooks";
import UsersTable from "@/components/user-table";
import { useState, useMemo } from "react";

export default function UsersPage() {
  const [page, setPage] = useState(1);
  const { data: users, isLoading } = useUsersPg(page);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const filteredUsers = useMemo(() => {
    if (!users?.data) return [];

    return users.data
      .map((u, i) => ({
        ...u,
        role: i % 2 === 0 ? "admin" : "user", 
      }))
      .filter((u) =>
        (u.first_name ?? "").toLowerCase().includes(search.toLowerCase())
      )
      .filter((u) =>
        roleFilter === "all" ? true : u.role === roleFilter
      );
  }, [users, search, roleFilter]);

  return (
    <main className="m-4">
      <h1 className="text-2xl mb-4">Usuarios</h1>

      <div className="flex gap-4 mb-4">
        <input
          className="border p-2 rounded"
          placeholder="Buscar usuario..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }} />

        <select
          className="border p-2 rounded"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="all">Todos</option>
          <option value="admin">Admins</option>
          <option value="user">Usuarios</option>
        </select>
      </div>

      <div className="border-t pt-5 w-full flex justify-center">
        <div className="w-full max-w-6xl">
          <UsersTable
            data={filteredUsers}
            total={users?.total || 0}
            page={(users?.page ?? 1) - 1}
            setPage={(p) => setPage(p + 1)}
            pageSize={users?.per_page || 6}
            setPageSize={() => { }}
            totalPages={users?.total_pages || 1}
          />
        </div>
      </div>
    </main>
  );
}
