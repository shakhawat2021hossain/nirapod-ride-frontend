import DashboardLayout from "@/layout/DashboardLayout";
import MainLayout from "@/layout/MainLayout";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import FAQ from "@/pages/FAQ";
import Features from "@/pages/Features";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import BookRide from "@/pages/Rider/BookRide";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { adminSidebarRoutes } from "./adminSidebarRoutes";
import { driverSidebarRoutes } from "./driverSidebarRoutes";
import { riderSidebarRoutes } from "./riderSidebarRoutes";
import NotFound from "@/pages/NotFound";
import RoleBasedAccess from "./RoleBasedAccess";
import { roles } from "@/constants/role";
export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/about',
                element: <About />
            },
            {
                path: '/Features',
                element: <Features />
            },
            {
                path: '/contact',
                element: <Contact />
            },
            {
                path: '/faq',
                element: <RoleBasedAccess><FAQ /></RoleBasedAccess>
            },
            {
                path: '/book-ride',
                element: <RoleBasedAccess><BookRide /></RoleBasedAccess>
            },
        ]
    },
    {
        path: '/admin',
        element: <RoleBasedAccess allowedRoles={[roles.admin]}><DashboardLayout /></RoleBasedAccess>,
        children: [...generateRoutes(adminSidebarRoutes)]
    },
    {
        path: '/driver',
        element: <DashboardLayout />,
        children: [...generateRoutes(driverSidebarRoutes)]
    },
    {
        path: '/rider',
        element: <DashboardLayout />,
        children: [
            {
                index: true,
                element: <Navigate to='/rider/overview' />
            },
            ...generateRoutes(riderSidebarRoutes)
        ]
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: "*",
        element: <NotFound />,
    },

])

