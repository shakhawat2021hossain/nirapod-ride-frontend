import AvailableRides from "@/pages/Driver/AvailableRides";
import DriverOverview from "@/pages/Driver/DriverOverview";
import Earnings from "@/pages/Driver/Earnings";
import Ongoing from "@/pages/Driver/Ongoing";
import RideHistory from "@/pages/Driver/RideHistory";
import type { ISidebarItem } from "@/types";
import {Car, Coins, History, LayoutDashboard, Timer } from "lucide-react";





export const driverSidebarRoutes: ISidebarItem[] = [
    {
      title: "Dashboard",
      url: "/driver/overview",
      icon: LayoutDashboard,
      badge: null,
      element: <DriverOverview />
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
    {
      title: "Ride History",
      url: "/driver/ride-history",
      icon: History,
      element: <RideHistory />
    },
    {
      title: "Earnings",
      url: "/driver/earnings",
      icon: Coins,
      element: <Earnings />
    },
  ]

