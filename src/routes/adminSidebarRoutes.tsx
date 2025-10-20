import Analytics from "@/pages/Admin/Analytics";
import Overview from "@/pages/Admin/Overview";
import type { ISidebarItem } from "@/types";

export const adminSidebarRoutes: ISidebarItem[] = [
    {
        title: "Dashboard",
        url: "#",
        items: [
            {
                title: "Overview",
                url: "/admin/overview",
                element: <Overview />,
            },
            {
                title: "Analytics",
                url: "/admin/analytics",
                element: <Analytics />,
            },
        ],
    },
    {
        title: "Ride Management",
        url: "#",
        items: [
            {
                title: "All Rides",
                url: "/admin/overview",
            },
        ],
    },
    {
        title: "Settings",
        url: "#",
        items: [
            {
                title: "Profile",
                url: "/admin/profile",
            },
            {
                title: "security",
                url: "/admin/security",
            },
        ],
    },
    
]