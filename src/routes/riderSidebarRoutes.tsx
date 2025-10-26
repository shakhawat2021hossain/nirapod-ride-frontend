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
      url: `/rider/rides/:id`,
      element: <RideDetails />
    },
  ]

