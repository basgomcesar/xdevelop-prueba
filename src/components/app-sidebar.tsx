import { Users2Icon,Book ,Newspaper } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const items = [
  {
    title: "Posts",
    url: "/posts",
    icon: Newspaper,
  },
  {
    title: "Usuarios",
    url: "/users",
    icon: Users2Icon,
  },
  {
    title: "Libros",
    url: "/books",
    icon: Book,
  },

]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>App Test XDevelop</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="pt-10 space-y-1">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}