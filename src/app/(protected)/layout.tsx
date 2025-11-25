import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main >
                <SidebarTrigger />
                <div className="h-4" >
                    {children}
                </div>
            </main>
        </SidebarProvider>

    );
}
