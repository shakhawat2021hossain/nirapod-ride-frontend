import Overview from "@/pages/Admin/Overview";
import MyRides from "@/pages/Rider/MyRides";
import type { ISidebarItem } from "@/types";
import {Car, LayoutDashboard } from "lucide-react";
import { lazy } from "react";

const RideDetails = lazy(() =>import("@/pages/Rider/RideDetails"))




export const riderSidebarRoutes: ISidebarItem[] = [
    {
      title: "Dashboard",
      url: "/rider/overview",
      icon: LayoutDashboard,
      badge: null,
      element: <Overview />
    },
    {
      title: "My Rides",
      url: "/rider/my-rides",
      icon: Car,
      badge: "12",
      element: <MyRides />
    },
    {
      title: "Ride Details",
      url: "/rider/ride-details",
      icon: Car,
      badge: "12",
      element: <RideDetails />
    },
  ]


// export const riderSidebarRoutes: ISidebarItem[] = [
//     {
//         title: "Dashboard",
//         url: "#",
//         items: [
//             {
//                 title: "Overview",
//                 url: "/rider/overview",
//                 element: <h1>Rider overview</h1>,
//             }
//         ],
//     },
//     {
//         title: "My Rides",
//         url: "#",
//         items: [
//             {
//                 title: "Rides History",
//                 url: "/rider/ride-details",
//                 element: <RideDetails/>,
//             },
//         ],
//     },
//     {
//         title: "Settings",
//         url: "#",
//         items: [
//             {
//                 title: "Profile",
//                 url: "/rider/profile",
//             },
//             {
//                 title: "security",
//                 url: "/rider/security",
//             },
//         ],
//     },
    
// ]