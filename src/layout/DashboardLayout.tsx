import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Outlet } from "react-router-dom"
import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { ModeToggle } from "@/components/ui/mode-toggle"
import UserMenu from "@/components/user-menu"
import { AppSidebar } from "@/components/app-sidebar"
import { useUserInfoQuery } from "@/redux/features/user/user.api"

export default function DashboardLayout() {
  const { data: userInfo } = useUserInfoQuery(undefined)

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="min-h-screen bg-muted/20">
        {/* Header that matches public navbar styling */}
        <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 h-16 flex items-center gap-4 px-6">
          <div className="flex items-center gap-4 flex-1">
            <SidebarTrigger className="-ml-2 h-9 w-9 hover:bg-muted transition-colors" />

            {/* Search Bar - similar to public navbar spacing */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search dashboard..."
                className="pl-10 bg-muted/50 border-0 focus-visible:ring-2 focus-visible:ring-primary/20"
              />
            </div>
          </div>

          {/* Header Actions - matching public navbar right side */}
          <div className="flex items-center gap-3">
            {/* Dark Mode Toggle - same as public navbar */}
            <ModeToggle />

            {/* Notifications */}
            {/* <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </Button> */}

            {/* Settings */}
            {/* <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button> */}

            {/* User Menu - same component as public navbar */}
            {userInfo && (
              <UserMenu name={userInfo.name} email={userInfo.email} />
            )}
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>

        {/* Footer - optional, can match public site footer */}
        <footer className="bg-background border-t py-4 px-6">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
            <div className="flex items-center gap-4">
              <span>© 2024 Nirapod Ride. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-4 mt-2 sm:mt-0">
              <span>Admin Dashboard</span>
              <span>•</span>
              <span>v1.0.0</span>
            </div>
          </div>
        </footer>
      </SidebarInset>
    </SidebarProvider>
  )
}