import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Car,
    Clock,
    DollarSign,
    MapPin,
    User,
    TrendingUp,
    Calendar,
    Navigation,
    Shield,
    CheckCircle
} from 'lucide-react';

import { format } from 'date-fns';
import { useRidesQuery } from '@/redux/features/rider/ride.api';
import type { IRide } from '@/types/ride.type';

const RiderOverview = () => {
    const { data: ridesData, isLoading: ridesLoading } = useRidesQuery(undefined);


    const rides: IRide[] = ridesData?.data || [];

    // Calculate quick stats
    const totalRides = rides.length;
    const completedRides = rides.filter(ride => ride.status === 'completed').length;
    const cancelledRides = rides.filter(ride => ride.status === 'cancelled').length;
    const totalSpent = rides
        .filter(ride => ride.status === 'completed')
        .reduce((sum, ride) => sum + (ride.fare || 0), 0);

    // Recent rides (last 5)
    const recentRides = rides.slice(0, 5);

    // Stats cards data
    const statCards = [
        {
            title: "Total Rides",
            value: totalRides,
            description: "All time rides",
            icon: Car,
            color: "text-blue-600",
            bgColor: "bg-blue-100"
        },
        {
            title: "Completed",
            value: completedRides,
            description: "Successful rides",
            icon: CheckCircle,
            color: "text-green-600",
            bgColor: "bg-green-100"
        },
        {
            title: "Cancelled",
            value: cancelledRides,
            description: "Cancelled rides",
            icon: Shield,
            color: "text-red-600",
            bgColor: "bg-red-100"
        },
        {
            title: "Total Spent",
            value: `৳${totalSpent}`,
            description: "All time spending",
            icon: DollarSign,
            color: "text-purple-600",
            bgColor: "bg-purple-100"
        }
    ];

    if (ridesLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-center">
                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Loading your dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold">Rider Dashboard</h1>
                    <p className="text-muted-foreground">
                        Overview of your rides and activity
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                        <Calendar className="h-4 w-4 mr-2" />
                        {format(new Date(), 'MMM dd, yyyy')}
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={index} className="hover:shadow-md transition-shadow">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">
                                            {stat.title}
                                        </p>
                                        <p className="text-2xl font-bold mt-1">
                                            {stat.value}
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            {stat.description}
                                        </p>
                                    </div>
                                    <div className={`p-3 rounded-full ${stat.bgColor}`}>
                                        <Icon className={`h-6 w-6 ${stat.color}`} />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Main Content Tabs */}
            <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3 lg:grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="recent">Recent Rides</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Recent Activity */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Clock className="h-5 w-5" />
                                    Recent Activity
                                </CardTitle>
                                <CardDescription>
                                    Your latest ride requests and updates
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {recentRides.length > 0 ? (
                                        recentRides.map((ride) => (
                                            <div key={ride._id} className="flex items-center justify-between p-3 border rounded-lg">
                                                <div className="flex items-center gap-3">
                                                    <div className={`p-2 rounded-full ${ride.status === 'completed' ? 'bg-green-100 text-green-600' :
                                                            ride.status === 'cancelled' ? 'bg-red-100 text-red-600' :
                                                                'bg-blue-100 text-blue-600'
                                                        }`}>
                                                        <Car className="h-4 w-4" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-sm">
                                                            {ride.startLocation} → {ride.endLocation}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground">
                                                            {format(new Date(ride.createdAt), 'MMM dd, h:mm a')}
                                                        </p>
                                                    </div>
                                                </div>
                                                <Badge variant={
                                                    ride.status === 'completed' ? 'default' :
                                                        ride.status === 'cancelled' ? 'destructive' : 'secondary'
                                                }>
                                                    {ride.status}
                                                </Badge>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-8 text-muted-foreground">
                                            <Car className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                            <p>No recent rides</p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Quick Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Navigation className="h-5 w-5" />
                                    Quick Actions
                                </CardTitle>
                                <CardDescription>
                                    Get started with your next ride
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <Button className="w-full justify-start gap-3 h-14" size="lg">
                                        <MapPin className="h-5 w-5" />
                                        <div className="text-left">
                                            <div className="font-medium">Book a Ride</div>
                                            <div className="text-xs text-muted-foreground">Request a new ride</div>
                                        </div>
                                    </Button>

                                    <Button variant="outline" className="w-full justify-start gap-3 h-14" size="lg">
                                        <Clock className="h-5 w-5" />
                                        <div className="text-left">
                                            <div className="font-medium">Ride History</div>
                                            <div className="text-xs text-muted-foreground">View all your past rides</div>
                                        </div>
                                    </Button>

                                    <Button variant="outline" className="w-full justify-start gap-3 h-14" size="lg">
                                        <User className="h-5 w-5" />
                                        <div className="text-left">
                                            <div className="font-medium">Profile</div>
                                            <div className="text-xs text-muted-foreground">Update your information</div>
                                        </div>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Monthly Summary */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <TrendingUp className="h-5 w-5" />
                                Monthly Summary
                            </CardTitle>
                            <CardDescription>
                                Your ride activity for {format(new Date(), 'MMMM yyyy')}
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </TabsContent>

                {/* Recent Rides Tab */}
                <TabsContent value="recent">
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Rides</CardTitle>
                            <CardDescription>
                                Your complete ride history with details
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {rides.length > 0 ? (
                                <div className="space-y-4">
                                    {rides.map((ride) => (
                                        <div key={ride._id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <MapPin className="h-4 w-4 text-green-500" />
                                                        <span className="font-medium">{ride.startLocation}</span>
                                                        <span className="text-muted-foreground">→</span>
                                                        <MapPin className="h-4 w-4 text-red-500" />
                                                        <span className="font-medium">{ride.endLocation}</span>
                                                    </div>

                                                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                                        <div className="flex items-center gap-1">
                                                            <Clock className="h-3 w-3" />
                                                            {format(new Date(ride.createdAt), 'MMM dd, yyyy • h:mm a')}
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <DollarSign className="h-3 w-3" />
                                                            ৳{ride.fare}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-3">
                                                    <Badge variant={
                                                        ride.status === 'completed' ? 'default' :
                                                            ride.status === 'cancelled' ? 'destructive' :
                                                                'secondary'
                                                    }>
                                                        {ride.status}
                                                    </Badge>
                                                    <Button variant="outline" size="sm">
                                                        Details
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <Car className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                                    <h3 className="text-lg font-medium mb-2">No Rides Yet</h3>
                                    <p className="text-muted-foreground mb-4">
                                        Start your first ride to see your history here
                                    </p>
                                    <Button>Book Your First Ride</Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Analytics Tab */}
                <TabsContent value="analytics">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Ride Distribution</CardTitle>
                                <CardDescription>
                                    Breakdown of your rides by status
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {[
                                        { status: 'Completed', count: completedRides, color: 'bg-green-500' },
                                        { status: 'Cancelled', count: cancelledRides, color: 'bg-red-500' },
                                        {
                                            status: 'Upcoming', count: rides.filter(r =>
                                                ['accepted', 'picked_up', 'in_transit'].includes(r.status)).length,
                                            color: 'bg-blue-500'
                                        },
                                    ].map((item) => (
                                        <div key={item.status} className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                                                <span className="text-sm font-medium">{item.status}</span>
                                            </div>
                                            <div className="text-right">
                                                <span className="font-bold">{item.count}</span>
                                                <span className="text-muted-foreground text-sm ml-2">
                                                    ({totalRides > 0 ? Math.round((item.count / totalRides) * 100) : 0}%)
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Spending Overview</CardTitle>
                                <CardDescription>
                                    Your ride expenses analysis
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium">Total Spent</span>
                                        <span className="font-bold text-green-600">৳{totalSpent}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium">Average per Ride</span>
                                        <span className="font-bold">
                                            ৳{completedRides > 0 ? Math.round(totalSpent / completedRides) : 0}
                                        </span>
                                    </div>
                                    
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default RiderOverview;