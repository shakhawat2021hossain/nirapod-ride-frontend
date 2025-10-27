import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
    DollarSign,
    Car,
    Clock,
    TrendingUp,
    Wifi,
    WifiOff,
    Navigation,
    Calendar,
    BarChart3,
    Loader2,
    RefreshCw
} from "lucide-react";
import { useDriverRidesQuery, useEarningsQuery } from "@/redux/features/rider/ride.api";
import { parseISO, isToday, isThisWeek, isThisMonth } from "date-fns";
import { useToggleAvailabilityMutation, useUserInfoQuery } from '@/redux/features/user/user.api';

const DriverOverview = () => {
    // --- User info ---
    const { data: userData, refetch, isLoading: userLoading } = useUserInfoQuery(undefined);
    const availability = userData?.availability;

    // --- Mutations & Queries ---
    const [toggleAvailability, { isLoading: toggleLoading }] = useToggleAvailabilityMutation();
    const { data: ridesData, isLoading: ridesLoading, refetch: refetchRides } = useDriverRidesQuery(undefined);
    const { data: earningsData, isLoading: earningsLoading, refetch: refetchEarnings } = useEarningsQuery(undefined);

    const rides = ridesData?.data || [];
    const earnings = earningsData?.data?.earnings || [];
    const totalEarnings = earningsData?.data?.totalEarnings || 0;

    // --- Statistics ---
    const totalRides = rides.length;
    const completedRides = rides.filter((ride: any) => ride.status === 'completed').length;
    const ongoingRides = rides.filter((ride: any) =>
        ride.status === 'accepted' || ride.status === 'picked_up' || ride.status === 'in_transit'
    ).length;

    const todayEarnings = earnings
        .filter((e: any) => isToday(parseISO(e.completedAt)))
        .reduce((sum: number, e: any) => sum + e.fare, 0);

    const todayRides = earnings.filter((e: any) => isToday(parseISO(e.completedAt))).length;

    const weekEarnings = earnings
        .filter((e: any) => isThisWeek(parseISO(e.completedAt)))
        .reduce((sum: number, e: any) => sum + e.fare, 0);

    const monthEarnings = earnings
        .filter((e: any) => isThisMonth(parseISO(e.completedAt)))
        .reduce((sum: number, e: any) => sum + e.fare, 0);

    const recentRides = rides.slice(0, 5);

    
    const isOnline = availability === "ONLINE";

    // --- Handlers ---
    const handleToggleAvailability = async () => {
        try {
            await toggleAvailability(undefined).unwrap();
            await refetch();
        } catch (error) {
            console.error("Failed to toggle availability:", error);
        }
    };

    const handleRefresh = () => {
        refetchRides();
        refetchEarnings();
    };

    const isLoading = userLoading || ridesLoading || earningsLoading;

    // --- Loading state ---
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-center">
                    <Loader2 className="w-10 h-10 text-primary animate-spin mx-auto mb-4" />
                    <p className="text-muted-foreground">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold">Driver Dashboard</h1>
                    <p className="text-muted-foreground">
                        Overview of your driving performance and earnings
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" onClick={handleRefresh} className="gap-2">
                        <RefreshCw className="h-4 w-4" />
                        Refresh
                    </Button>
                    <div className="flex items-center gap-3 bg-muted/50 rounded-lg p-3">
                        <div className="flex items-center gap-2">
                            {isOnline ? (
                                <Wifi className="h-4 w-4 text-green-500" />
                            ) : (
                                <WifiOff className="h-4 w-4 text-red-500" />
                            )}
                            <span className="text-sm font-medium">
                                {isOnline ? "ONLINE" : "OFFLINE"}
                            </span>
                        </div>
                        <Switch
                            checked={isOnline}
                            onCheckedChange={handleToggleAvailability}
                            disabled={toggleLoading || userLoading}
                            className="data-[state=checked]:bg-green-500"
                        />
                        {(toggleLoading || userLoading) && (
                            <Loader2 className="h-3 w-3 animate-spin" />
                        )}
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Total Earnings */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
                        <DollarSign className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">৳{totalEarnings}</div>
                        <p className="text-xs text-muted-foreground">
                            +৳{todayEarnings} today
                        </p>
                    </CardContent>
                </Card>

                {/* Total Rides */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Rides</CardTitle>
                        <Car className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalRides}</div>
                        <p className="text-xs text-muted-foreground">
                            {completedRides} completed, {ongoingRides} ongoing
                        </p>
                    </CardContent>
                </Card>

                {/* Today's Performance */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Today's Earnings</CardTitle>
                        <TrendingUp className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">৳{todayEarnings}</div>
                        <p className="text-xs text-muted-foreground">
                            {todayRides} rides completed today
                        </p>
                    </CardContent>
                </Card>

                {/* Online Status */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Availability</CardTitle>
                        {isOnline ? (
                            <Wifi className="h-4 w-4 text-green-500" />
                        ) : (
                            <WifiOff className="h-4 w-4 text-red-500" />
                        )}
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {isOnline ? 'Online' : 'Offline'}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {isOnline ? 'Accepting rides' : 'Not available'}
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Charts and Detailed Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Period Earnings */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-sm">Earnings Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-blue-500" />
                                <span className="text-sm">Today</span>
                            </div>
                            <span className="font-semibold">৳{todayEarnings}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <TrendingUp className="h-4 w-4 text-green-500" />
                                <span className="text-sm">This Week</span>
                            </div>
                            <span className="font-semibold">৳{weekEarnings}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <BarChart3 className="h-4 w-4 text-purple-500" />
                                <span className="text-sm">This Month</span>
                            </div>
                            <span className="font-semibold">৳{monthEarnings}</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4" />
                            Recent Rides
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {recentRides.length > 0 ? recentRides.map((ride: any) => (
                            <div key={ride._id} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-full ${ride.status === 'completed' ? 'bg-green-100' :
                                            ride.status === 'in_transit' ? 'bg-blue-100' : 'bg-yellow-100'
                                        }`}>
                                        <Car className={`h-3 w-3 ${ride.status === 'completed' ? 'text-green-600' :
                                                ride.status === 'in_transit' ? 'text-blue-600' : 'text-yellow-600'
                                            }`} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">
                                            {ride.startLocation} → {ride.endLocation}
                                        </p>
                                        <p className="text-xs text-muted-foreground capitalize">
                                            {ride.status.replace('_', ' ')}
                                        </p>
                                    </div>
                                </div>
                                <Badge variant="secondary">৳{ride.fare}</Badge>
                            </div>
                        )) : (
                            <p className="text-center text-muted-foreground py-4 text-sm">
                                No recent rides
                            </p>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="p-3 bg-blue-100 rounded-full">
                            <Navigation className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold">Start Driving</h3>
                            <p className="text-sm text-muted-foreground">
                                Go online to accept ride requests
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-green-50 border-green-200">
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="p-3 bg-green-100 rounded-full">
                            <DollarSign className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold">View Earnings</h3>
                            <p className="text-sm text-muted-foreground">
                                Check detailed earnings report
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-orange-50 border-orange-200">
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="p-3 bg-orange-100 rounded-full">
                            <Car className="h-6 w-6 text-orange-600" />
                        </div>
                        <div>
                            <h3 className="font-semibold">Manage Rides</h3>
                            <p className="text-sm text-muted-foreground">
                                View and manage your rides
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default DriverOverview;
