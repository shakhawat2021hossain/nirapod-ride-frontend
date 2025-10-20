import type { ISidebarItem } from "@/types";

export const riderSidebarRoutes: ISidebarItem[] = [
    {
        title: "Dashboard",
        url: "#",
        items: [
            {
                title: "Overview",
                url: "/rider/overview",
                element: <h1>Rider overview</h1>,
            }
        ],
    },
    {
        title: "My Rides",
        url: "#",
        items: [
            {
                title: "Rides History",
                url: "/rider/rides",
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