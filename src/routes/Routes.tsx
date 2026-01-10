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
import Profile from "@/pages/Common/Profile";
import OtpVerification from "@/pages/Auth/OtpVerification";
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
                element: <FAQ />
            },
            {
                path: '/book-ride',
                element: <RoleBasedAccess><BookRide /></RoleBasedAccess>
            },
            {
                path: '/profile/:id',
                element: <RoleBasedAccess><Profile /></RoleBasedAccess>
            },
        ]
    },
    {
        path: '/admin',
        element: <RoleBasedAccess allowedRoles={[roles.admin]}><DashboardLayout /></RoleBasedAccess>,
        children: [
            {
                index: true,
                element: <Navigate to='/admin/analytics' />
            },
            ...generateRoutes(adminSidebarRoutes)
        ]
    },
    {
        path: '/driver',
        element: <RoleBasedAccess allowedRoles={[roles.driver]}><DashboardLayout /></RoleBasedAccess>,
        children: [
            {
                index: true,
                element: <Navigate to='/driver/overview' />
            },
            ...generateRoutes(driverSidebarRoutes)
        ]
    },
    {
        path: '/rider',
        element: <RoleBasedAccess allowedRoles={[roles.rider]}><DashboardLayout /></RoleBasedAccess>,
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
        path: '/verify-otp',
        element: <OtpVerification />
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

