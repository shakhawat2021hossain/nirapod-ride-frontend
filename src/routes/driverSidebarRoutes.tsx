import Overview from "@/pages/Admin/Overview";
import AvailableRides from "@/pages/Driver/AvailableRides";
import Ongoing from "@/pages/Driver/Ongoing";
import type { ISidebarItem } from "@/types";
import {Car, LayoutDashboard, Timer } from "lucide-react";





export const driverSidebarRoutes: ISidebarItem[] = [
    {
      title: "Dashboard",
      url: "/driver/overview",
      icon: LayoutDashboard,
      badge: null,
      element: <Overview />
    },
    {
      title: "Available Rides",
      url: "/driver/available-rides",
      icon: Car,
      badge: "12",
      element: <AvailableRides />
    },
    {
      title: "Ongoing Ride",
      url: "/driver/ongoing",
      icon: Timer,
      element: <Ongoing />
    },
  ]

