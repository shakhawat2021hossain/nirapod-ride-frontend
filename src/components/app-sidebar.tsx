// components/AppSidebar.tsx
import * as React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import {
  Settings,
  LogOut,
  HelpCircle,
  Home
} from 'lucide-react'
import logo from "../assets/nirapod-ride.png"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { authApi, useLogOutMutation, useUserInfoQuery } from "@/redux/features/auth/auth.api"
import { getSidebarItems } from "@/utils/getSidebarItems"
import { toast } from "sonner"
import { useDispatch } from "react-redux"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();
  const navigate = useNavigate();

  const { data } = useUserInfoQuery(undefined)
  const [logOut] = useLogOutMutation()
  const dispatch = useDispatch()


  const mainLinks = [
    ...getSidebarItems(data?.data?.role)
  ]
  console.log("Main Links:", mainLinks);

  const secondaryLinks = [
    {
      title: "Home",
      url: "/",
      icon: Home
    },
    {
      title: "Settings",
      url: "/admin/settings",
      icon: Settings
    },
    {
      title: "Help & Support",
      url: "/admin/support",
      icon: HelpCircle
    },
  ]

  const handleLogout = async () => {
    const result = await logOut(undefined)
    console.log(result);
    toast.success("Logged out successfully")

    // clear api state (jate kore login er r data thakbe na)
    dispatch(authApi.util.resetApiState())
    navigate('/login')

  }
  const isActiveLink = (url: string) => {
    return location.pathname === url || location.pathname.startsWith(url + '/');
  };

  return (
    <Sidebar {...props} className="border-r-0 bg-gradient-to-b from-background to-muted/20">
      <SidebarHeader className="border-b py-1 px-6">
        <div className="mx-auto">
          <img
            src={logo}
            alt="Nirapod Ride"
            className="h-14 w-34"
          />
        </div>
      </SidebarHeader>

      <SidebarContent className="flex flex-col flex-1 mb-2">
        {/* Main Navigation */}
        <div className="flex-1">
          <SidebarMenu className="px-3 py-4">
            {mainLinks.map((item) => {
              const IconComponent = item.icon;
              const isActive = isActiveLink(item.url);

              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    className={`transition-all duration-200 ${isActive
                      ? 'bg-primary text-primary-foreground shaodow-sm'
                      : 'hover:bg-muted hover:text-foreground'
                      }`}
                  >
                    <NavLink to={item.url} className="flex items-center gap-3 py-3 px-3 rounded-lg">
                      <IconComponent className={`h-5 w-5 ${isActive ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
                      <span className="font-medium">{item.title}</span>
                      {item.badge && (
                        <span className="ml-auto bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full min-w-6 text-center">
                          {item.badge}
                        </span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </div>

        {/* Secondary Navigation */}
        <div className="border-t pt-4">
          <SidebarMenu className="px-3">
            {secondaryLinks.map((item) => {
              const IconComponent = item.icon;
              const isActive = isActiveLink(item.url);

              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    className={`transition-all duration-200 ${isActive
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'hover:bg-muted hover:text-foreground'
                      }`}
                  >
                    <a href={item.url} className="flex items-center gap-3 py-3 px-3 rounded-lg">
                      <IconComponent className={`h-5 w-5 ${isActive ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
                      <span className="font-medium">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>

          {/* Logout Button */}
          <SidebarMenu className="px-3 mt-4">
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={handleLogout}
                className="flex items-center gap-3 py-3 px-3 rounded-lg text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200"
              >
                <LogOut className="h-5 w-5" />
                <span className="font-medium">Logout</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </div>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  )
}