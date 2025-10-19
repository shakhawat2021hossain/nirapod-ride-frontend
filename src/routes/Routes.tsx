import DashboardLayout from "@/layout/DashboardLayout";
import MainLayout from "@/layout/MainLayout";
import About from "@/pages/About";
import Analytics from "@/pages/Admin/Analytics";
import RideHistory from "@/pages/Common/RideHistory";
import Contact from "@/pages/Contact";
import Earnings from "@/pages/Driver/Earnings";
import RideRequests from "@/pages/Driver/RideRequests";
import FAQ from "@/pages/FAQ";
import Features from "@/pages/Features";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import BookRide from "@/pages/Rider/BookRide";
import { createBrowserRouter } from "react-router-dom";
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
                element: <BookRide />
            },
        ]
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/admin',
        element: <DashboardLayout />,
        children: [
            {
                path: "analytics",
                element: <Analytics />
            }
        ]
    },
    {
        path: '/driver',
        element: <DashboardLayout />,
        children: [
            {
                path: "earnings",
                element: <Earnings />
            },
            {
                path: "ride-requests",
                element: <RideRequests />
            },
        ]
    },
    {
        path: '/rider',
        element: <DashboardLayout />,
        children: [
            {
                path: "ride-history",
                element: <RideHistory />
            },

        ]
    },
    {
        path: '/register',
        element: <Register />
    },
])

