import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend } from "recharts";
import { Badge } from "@/components/ui/badge";
import { useAllRidesQuery } from "@/redux/features/rider/ride.api";
import { useAllUsersQuery } from "@/redux/features/user/user.api";
import { roles } from "@/constants/role";
import type { IUser } from "@/types";
import { RefreshCw } from "lucide-react";

const rideVolumeData = [
    { month: "Jan", rides: 320 },
    { month: "Feb", rides: 400 },
    { month: "Mar", rides: 380 },
    { month: "Apr", rides: 460 },
    { month: "May", rides: 520 },
    { month: "Jun", rides: 480 },
];

const revenueData = [
    { month: "Jan", revenue: 1200 },
    { month: "Feb", revenue: 1700 },
    { month: "Mar", revenue: 1600 },
    { month: "Apr", revenue: 1900 },
    { month: "May", revenue: 2200 },
    { month: "Jun", revenue: 2100 },
];

const driverActivityData = [
    { name: "Active", value: 68 },
    { name: "Inactive", value: 20 },
    { name: "On Ride", value: 12 },
];

const COLORS = ["#3b82f6", "#f59e0b", "#10b981"];

// Static recent activities
const recentActivities = [
    { id: 1, type: "Ride Completed", user: "Rider: Mahir | Driver: Rafi", time: "2 min ago" },
    { id: 2, type: "New Driver Registered", user: "Shuvo Rahman", time: "15 min ago" },
    { id: 3, type: "Ride Cancelled", user: "Rider: Tanvir", time: "1 hour ago" },
    { id: 4, type: "Payment Received", user: "৳560 from Arafat", time: "3 hours ago" },
];

export default function Analytics() {
    const { data: allRides, isLoading: rideLoading } = useAllRidesQuery(undefined);
    const { data: usersResponse, isLoading: userLoading } = useAllUsersQuery(undefined);
    console.log(usersResponse)
    const users: IUser[] = usersResponse || [];

    const totalRides = allRides?.data?.length
    const totalRevenue = 12023

    const totalDrivers = users.reduce(
        (count: number, user: IUser) => (user.role === roles.driver ? count + 1 : count),
        0
    );
    const totalRiders = users.reduce(
        (count: number, user: IUser) => (user.role === roles.rider ? count + 1 : count),
        0
    );

    if (userLoading || rideLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <RefreshCw className="w-10 h-10 text-primary animate-spin mx-auto mb-4" />
                <p className="text-muted-foreground">Loading users...</p>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-8">
            <h1 className="text-3xl font-bold tracking-tight">Admin Analytics Dashboard</h1>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="shadow-md">
                    <CardHeader>
                        <CardTitle>Total Drivers</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-semibold">{totalDrivers}</p>
                    </CardContent>
                </Card>

                <Card className="shadow-md">
                    <CardHeader>
                        <CardTitle>Total Riders</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-semibold">{totalRiders}</p>
                    </CardContent>
                </Card>

                <Card className="shadow-md">
                    <CardHeader>
                        <CardTitle>Total Rides</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-semibold">{totalRides}</p>
                    </CardContent>
                </Card>

                <Card className="shadow-md">
                    <CardHeader>
                        <CardTitle>Total Money Flow</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-semibold">৳{totalRevenue}</p>
                    </CardContent>
                </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Ride Volume */}
                <Card className="shadow-md">
                    <CardHeader>
                        <CardTitle>Ride Volume Over Time</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={rideVolumeData}>
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="rides" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Revenue Trends */}
                <Card className="shadow-md">
                    <CardHeader>
                        <CardTitle>Revenue Trends</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={250}>
                            <LineChart data={revenueData}>
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} dot={{ r: 5 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            {/* Driver Activity + Recent Activity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Driver Activity */}
                <Card className="shadow-md">
                    <CardHeader>
                        <CardTitle>Driver Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={driverActivityData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {driverActivityData.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                                    ))}

                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card className="shadow-md">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {recentActivities.map((activity) => (
                            <div
                                key={activity.id}
                                className="flex justify-between items-center border-b pb-2"
                            >
                                <div>
                                    <p className="font-medium">{activity.type}</p>
                                    <p className="text-sm text-gray-500">{activity.user}</p>
                                </div>
                                <Badge variant="secondary">{activity.time}</Badge>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
