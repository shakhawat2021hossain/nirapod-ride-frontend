import type { ISidebarItem } from "@/types";
import { lazy } from "react";

const RideDetails = lazy(() =>import("@/pages/Rider/RideDetails"))


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
                url: "/rider/ride-details",
                element: <RideDetails/>,
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