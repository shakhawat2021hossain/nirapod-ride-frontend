import type { ISidebarItem } from "@/types";

export const driverSidebarRoutes: ISidebarItem[] = [
    {
        title: "Dashboard",
        url: "#",
        items: [
            {
                title: "Earnings",
                url: "/driver/earnings",
                element: <h1>Driver earnings</h1>,
            }
        ],
    },
    {
        title: "Ride Management",
        url: "#",
        items: [
            {
                title: "All Rides",
                url: "/driver/rides",
                element: <h1>Rides Management</h1>
            },
        ],
    },
    {
        title: "Settings",
        url: "#",
        items: [
            {
                title: "Profile",
                url: "/driver/profile",
                element: <h1>Driver Profile</h1>,
            },
            {
                title: "Vehicle Details",
                url: "/driver/vehicle",
            },
        ],
    },
    
]