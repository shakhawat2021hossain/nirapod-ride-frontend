import Analytics from "@/pages/Admin/Analytics";
import Overview from "@/pages/Admin/Overview";
import type { ISidebarItem } from "@/types";
import { BarChart3, Car, LayoutDashboard, Shield, User } from "lucide-react";

export const adminSidebarRoutes: ISidebarItem[] = [
    {
      title: "Dashboard",
      url: "/admin/overview",
      icon: LayoutDashboard,
      badge: null,
      element: <Overview />
    },
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
      badge: "12",
    },
    {
      title: "Users",
      url: "/admin/users",
      icon: User,
      badge: null
    },
    {
      title: "Security",
      url: "/admin/security",
      icon: Shield,
      badge: null
    }
  ]
// export const adminSidebarRoutes: ISidebarItem[] = [
//     {
//         title: "Dashboard",
//         url: "#",
//         items: [
//             {
//                 title: "Overview",
//                 url: "/admin/overview",
//                 element: <Overview />,
//             },
//             {
//                 title: "Analytics",
//                 url: "/admin/analytics",
//                 element: <Analytics />,
//             },
//         ],
//     },
//     {
//         title: "Ride Management",
//         url: "#",
//         items: [
//             {
//                 title: "All Rides",
//                 url: "/admin/overview",
//             },
//         ],
//     },
//     {
//         title: "Settings",
//         url: "#",
//         items: [
//             {
//                 title: "Profile",
//                 url: "/admin/profile",
//             },
//             {
//                 title: "security",
//                 url: "/admin/security",
//             },
//         ],
//     },
    
// ]

