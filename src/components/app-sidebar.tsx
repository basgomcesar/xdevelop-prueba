"use client";

import { Users2Icon, Book, Newspaper, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth-store";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  { title: "Posts", url: "/posts", icon: Newspaper },
  { title: "Usuarios", url: "/users", icon: Users2Icon },
  { title: "Libros", url: "/books", icon: Book },
];

export function AppSidebar() {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  return (
    <Sidebar>
      <SidebarContent className="flex flex-col h-full">

        <SidebarGroup>
          <SidebarGroupLabel>App Test XDevelop</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="pt-10 space-y-1">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto border-t px-4">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                className="text-red-600"
                onClick={() => {
                  logout();       
                  router.push("/login"); 
                }}
              >
                <LogOut />
                <span>Logout</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>

      </SidebarContent>
    </Sidebar>
  );
}
