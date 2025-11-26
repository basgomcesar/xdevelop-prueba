"use client";
import { useUsersPg } from "@/hooks/users.hooks";
import UsersTable from "@/components/user-table";
import { useState } from "react";

export default function UsersPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const { data: users, isLoading, isError } = useUsersPg(page, pageSize);

  return (
    <main className="m-4 ">
      <h1 className="text-2xl">Usuarios</h1>
      <div className="mt-4 border-t pt-5 w-full flex justify-center">
        <div className="w-full max-w-6xl"> 
          <UsersTable 
            total={users?.length || 0} 
            data={users || []} 
            page={page - 1} 
            setPage={(p) => setPage(p + 1)} 
            pageSize={pageSize}
            setPageSize={setPageSize}
          />
        </div>
      </div>
    </main>
  );
}