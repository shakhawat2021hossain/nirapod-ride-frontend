import Analytics from "@/pages/Admin/Analytics";
import UserManagement from "@/pages/Admin/UserManagement";
import AllRides from "@/pages/Common/AllRides";
import type { ISidebarItem } from "@/types";
import { BarChart3, Car, Shield, User } from "lucide-react";

export const adminSidebarRoutes: ISidebarItem[] = [
  {
    title: "Analytics",
    url: "/admin/analytics",
    icon: BarChart3,
    badge: null,
    element: <Analytics />
  },
  {
    title: "All Rides",
    url: "/admin/rides",
    icon: Car,
    element: <AllRides />
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: User,
    element: <UserManagement />
  }
]