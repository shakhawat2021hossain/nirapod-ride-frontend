
import MyRides from "@/pages/Rider/MyRides";
import RiderOverview from "@/pages/Rider/RiderOverview";
import RideTracking from "@/pages/Rider/RideTracking";
import type { ISidebarItem } from "@/types";
import {Car, LayoutDashboard, Navigation } from "lucide-react";
// import { lazy } from "react";

// const RideDetails = lazy(() =>import("@/pages/Rider/RideDetails"))




export const riderSidebarRoutes: ISidebarItem[] = [
    {
      title: "Dashboard",
      url: "/rider/overview",
      icon: LayoutDashboard,
      badge: null,
      element: <RiderOverview />
    },
    {
      title: "My Rides",
      url: "/rider/my-rides",
      icon: Car,
      element: <MyRides />
    },
    // {
    //   url: `/rider/rides/:id`,
    //   element: <RideDetails />
    // },
    {
      title: "Ride Tracking",
      icon: Navigation,
      url: `/rider/ride-tracking`,
      element: <RideTracking />
    },
  ]

