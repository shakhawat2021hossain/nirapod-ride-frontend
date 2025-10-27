import { useEarningsQuery } from "@/redux/features/rider/ride.api";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Loader2,
    TrendingUp,
    DollarSign,
    Calendar,
    Clock,
    Download,
    BarChart3
} from "lucide-react";
import { format, parseISO, isThisWeek, isThisMonth, isToday, startOfWeek, startOfMonth, eachDayOfInterval, eachWeekOfInterval, eachMonthOfInterval } from "date-fns";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";



export interface IEarning {
    rideId: string;
    startLocation: string;
    endLocation: string;
    fare: number;
    completedAt: string;
}


const Earnings = () => {
    const { data, isLoading, error, refetch } = useEarningsQuery(undefined);
    const earnings: IEarning[] = data?.data?.earnings || [];
    const totalEarnings = data?.data?.totalEarnings || 0;

    // Calculate time-based earnings
    const todayEarnings = earnings
        .filter(e => isToday(parseISO(e.completedAt)))
        .reduce((sum, e) => sum + e.fare, 0);

    const weekEarnings = earnings
        .filter(e => isThisWeek(parseISO(e.completedAt)))
        .reduce((sum, e) => sum + e.fare, 0);

    const monthEarnings = earnings
        .filter(e => isThisMonth(parseISO(e.completedAt)))
        .reduce((sum, e) => sum + e.fare, 0);

    // Enhanced chart data preparation
    const prepareChartData = (period: 'daily' | 'weekly' | 'monthly') => {
        const now = new Date();
        let dates: Date[];
        let dateFormat: string;

        switch (period) {
            case 'daily':
                dates = eachDayOfInterval({
                    start: startOfWeek(now),
                    end: now
                });
                dateFormat = "EEE";
                break;
            case 'weekly':
                dates = eachWeekOfInterval({
                    start: startOfMonth(now),
                    end: now
                }, { weekStartsOn: 0 });
                dateFormat = "MMM dd";
                break;
            case 'monthly':
                dates = eachMonthOfInterval({
                    start: new Date(now.getFullYear(), 0, 1),
                    end: now
                });
                dateFormat = "MMM";
                break;
        }

        return dates.map(date => {
            const dateStr = format(date, dateFormat);
            const fullDateStr = format(date, 'yyyy-MM-dd');

            const amount = earnings
                .filter(e => {
                    const rideDate = format(parseISO(e.completedAt), 'yyyy-MM-dd');
                    switch (period) {
                        case 'daily':
                            return rideDate === fullDateStr;
                        case 'weekly':
                            return isThisWeek(parseISO(e.completedAt), { weekStartsOn: 0 }) &&
                                format(parseISO(e.completedAt), 'yyyy-MM-dd') <= fullDateStr;
                        case 'monthly':
                            return format(parseISO(e.completedAt), 'yyyy-MM') === format(date, 'yyyy-MM');
                    }
                })
                .reduce((sum, e) => sum + e.fare, 0);

            return {
                date: dateStr,
                amount,
                fullDate: format(date, 'MMM dd, yyyy')
            };
        }).slice(-7); // Last 7 data points
    };

    const dailyChartData = prepareChartData('daily');
    const weeklyChartData = prepareChartData('weekly');
    const monthlyChartData = prepareChartData('monthly');
    

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-center">
                    <Loader2 className="w-10 h-10 text-primary animate-spin mx-auto mb-4" />
                    <p className="text-muted-foreground">Loading earnings data...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-10">
                <div className="text-red-500 mb-4">
                    <BarChart3 className="h-12 w-12 mx-auto mb-2" />
                    <p>Failed to load earnings data</p>
                </div>
                <Button onClick={() => refetch()} variant="outline">
                    Try Again
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold">Earnings Analytics</h1>
                    <p className="text-muted-foreground">
                        Comprehensive overview of your ride earnings and performance metrics
                    </p>
                </div>
                <Button variant="outline" className="gap-2">
                    <Download className="h-4 w-4" />
                    Export Report
                </Button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 border-blue-200">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-blue-600">Today</p>
                                <p className="text-2xl font-bold">৳{todayEarnings}</p>
                                <p className="text-xs text-muted-foreground">
                                    {earnings.filter(e => isToday(parseISO(e.completedAt))).length} rides
                                </p>
                            </div>
                            <div className="p-3 bg-blue-100 rounded-full">
                                <Calendar className="h-6 w-6 text-blue-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-green-500/10 to-green-600/10 border-green-200">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-green-600">This Week</p>
                                <p className="text-2xl font-bold">৳{weekEarnings}</p>
                                <p className="text-xs text-muted-foreground">
                                    {earnings.filter(e => isThisWeek(parseISO(e.completedAt))).length} rides
                                </p>
                            </div>
                            <div className="p-3 bg-green-100 rounded-full">
                                <TrendingUp className="h-6 w-6 text-green-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-purple-500/10 to-purple-600/10 border-purple-200">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-purple-600">This Month</p>
                                <p className="text-2xl font-bold">৳{monthEarnings}</p>
                                <p className="text-xs text-muted-foreground">
                                    {earnings.filter(e => isThisMonth(parseISO(e.completedAt))).length} rides
                                </p>
                            </div>
                            <div className="p-3 bg-purple-100 rounded-full">
                                <BarChart3 className="h-6 w-6 text-purple-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-orange-500/10 to-orange-600/10 border-orange-200">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-orange-600">Total</p>
                                <p className="text-2xl font-bold">৳{totalEarnings}</p>
                                <p className="text-xs text-muted-foreground">
                                    {earnings.length} total rides
                                </p>
                            </div>
                            <div className="p-3 bg-orange-100 rounded-full">
                                <DollarSign className="h-6 w-6 text-orange-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Chart */}
                <div className="lg:col-span-2">
                    <Tabs defaultValue="weekly" className="w-full">
                        <TabsList className="grid grid-cols-3 w-full">
                            <TabsTrigger value="daily">Daily</TabsTrigger>
                            <TabsTrigger value="weekly">Weekly</TabsTrigger>
                            <TabsTrigger value="monthly">Monthly</TabsTrigger>
                        </TabsList>

                        <TabsContent value="daily" className="mt-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <BarChart3 className="h-5 w-5" />
                                        Daily Earnings Trend
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <BarChart data={dailyChartData}>
                                            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                                            <XAxis dataKey="date" />
                                            <YAxis />
                                            <Tooltip
                                                formatter={(value) => [`৳${value}`, 'Earnings']}
                                                labelFormatter={(label) => `Date: ${label}`}
                                            />
                                            <Bar
                                                dataKey="amount"
                                                fill="#3b82f6"
                                                radius={[4, 4, 0, 0]}
                                                className="cursor-pointer"
                                            />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="weekly" className="mt-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <TrendingUp className="h-5 w-5" />
                                        Weekly Earnings Trend
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <LineChart data={weeklyChartData}>
                                            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                                            <XAxis dataKey="date" />
                                            <YAxis />
                                            <Tooltip
                                                formatter={(value) => [`৳${value}`, 'Earnings']}
                                                labelFormatter={(label) => `Week: ${label}`}
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="amount"
                                                stroke="#10b981"
                                                strokeWidth={3}
                                                dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                                                activeDot={{ r: 6, fill: '#059669' }}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="monthly" className="mt-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Calendar className="h-5 w-5" />
                                        Monthly Earnings Trend
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <BarChart data={monthlyChartData}>
                                            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                                            <XAxis dataKey="date" />
                                            <YAxis />
                                            <Tooltip
                                                formatter={(value) => [`৳${value}`, 'Earnings']}
                                                labelFormatter={(label) => `Month: ${label}`}
                                            />
                                            <Bar
                                                dataKey="amount"
                                                fill="#8b5cf6"
                                                radius={[4, 4, 0, 0]}
                                                className="cursor-pointer"
                                            />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Sidebar - Top Routes & Stats */}
                <div className="space-y-6">
                    

                    {/* Recent Earnings */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Clock className="h-5 w-5" />
                                Recent Rides
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {earnings.slice(0, 3).map((earning, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-sm truncate">
                                            {earning.startLocation} → {earning.endLocation}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {format(parseISO(earning.completedAt), 'MMM dd, yyyy')}
                                        </p>
                                    </div>
                                    <Badge variant="secondary" className="ml-2">
                                        ৳{earning.fare}
                                    </Badge>
                                </div>
                            ))}
                            {earnings.length === 0 && (
                                <p className="text-center text-muted-foreground py-4">
                                    No recent rides
                                </p>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Performance Metrics */}
            <Card>
                <CardHeader>
                    <CardTitle>Performance Summary</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                        <div className="p-4 bg-blue-50 rounded-lg">
                            <p className="text-2xl font-bold text-blue-600">{earnings.length}</p>
                            <p className="text-sm text-muted-foreground">Total Rides</p>
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg">
                            <p className="text-2xl font-bold text-green-600">
                                ৳{earnings.length ? Math.round(totalEarnings / earnings.length) : 0}
                            </p>
                            <p className="text-sm text-muted-foreground">Average per Ride</p>
                        </div>
                        <div className="p-4 bg-purple-50 rounded-lg">
                            <p className="text-2xl font-bold text-purple-600">
                                {monthEarnings ? Math.round(monthEarnings / 4) : 0}
                            </p>
                            <p className="text-sm text-muted-foreground">Weekly Average</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Earnings;