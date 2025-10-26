import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, User, Navigation, CheckCircle, Car, Phone, NavigationIcon } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useDriverRidesQuery, useUpdateStatusMutation } from "@/redux/features/rider/ride.api";

const Ongoing = () => {
    const { data: rides, isLoading, refetch, isError } = useDriverRidesQuery(undefined);
    const [updateStatus] = useUpdateStatusMutation();
    const [processingRide, setProcessingRide] = useState<string | null>(null);

    // Filter only accepted rides (excluding completed rides)
    const acceptedRides = rides?.data?.filter((ride: any) =>
        ride.status === "accepted" || ride.status === "in_transit" || ride.status === "picked_up"
    ) || [];

    const handleNextStatus = async (ride: any) => {
        let nextStatus: "picked_up" | "in_transit" | "completed";

        switch (ride.status) {
            case "accepted":
                nextStatus = "picked_up";
                break;
            case "picked_up":
                nextStatus = "in_transit";
                break;
            case "in_transit":
                nextStatus = "completed";
                break;
            default:
                return;
        }

        try {
            setProcessingRide(ride._id);
            await updateStatus({ id: ride._id, status: { status: nextStatus } }).unwrap();
            refetch(); // Refresh rides list after status update
        } catch (error) {
            console.error("Failed to update status", error);
        } finally {
            setProcessingRide(null);
        }
    };

    const getStatusConfig = (status: string) => {
        const config = {
            accepted: {
                label: "Accepted",
                badge: "bg-blue-100 text-blue-800 border-blue-200",
                nextAction: "Mark as Picked Up",
                icon: User,
                description: "Go to pickup location"
            },
            picked_up: {
                label: "Picked Up",
                badge: "bg-yellow-100 text-yellow-800 border-yellow-200",
                nextAction: "Start Trip",
                icon: Navigation,
                description: "Begin journey to destination"
            },
            in_transit: {
                label: "In Transit",
                badge: "bg-purple-100 text-purple-800 border-purple-200",
                nextAction: "Complete Ride",
                icon: CheckCircle,
                description: "Arrived at destination"
            }
        };
        return config[status as keyof typeof config] || { label: status, badge: "", nextAction: "", icon: Car };
    };

    const getTimeAgo = (timestamp: string) => {
        return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-center">
                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Loading your rides...</p>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="text-center py-8">
                <div className="text-red-500 mb-4">
                    <NavigationIcon className="h-12 w-12 mx-auto mb-2" />
                    <p>Failed to load rides</p>
                </div>
                <Button onClick={() => refetch()} variant="outline">
                    Try Again
                </Button>
            </div>
        );
    }

    if (acceptedRides.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Car className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No Active Rides</h3>
                <p className="text-muted-foreground mb-6">
                    You don't have any ongoing rides at the moment.
                </p>
                <Button onClick={() => refetch()} variant="outline">
                    Refresh
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold">Ongoing Rides</h1>
                    <p className="text-muted-foreground">
                        Manage your active rides and update their status
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-sm">
                        {acceptedRides.length} Active
                    </Badge>
                    <Button variant="outline" onClick={() => refetch()} size="sm">
                        Refresh
                    </Button>
                </div>
            </div>

            {/* Rides Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {acceptedRides.map((ride: any) => {
                    const statusConfig = getStatusConfig(ride.status);
                    const ActionIcon = statusConfig.icon;

                    return (
                        <Card key={ride._id} className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
                            <CardHeader className="pb-3">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="text-lg flex items-center gap-2">
                                            <User className="h-5 w-5 text-blue-500" />
                                            {ride.passenger?.name || "Passenger"}
                                        </CardTitle>
                                        <CardDescription className="flex items-center gap-2 mt-1">
                                            <Phone className="h-4 w-4" />
                                            {ride.passenger?.phone || "N/A"}
                                        </CardDescription>
                                    </div>
                                    <Badge variant="outline" className={statusConfig.badge}>
                                        {statusConfig.label}
                                    </Badge>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                {/* Route Information */}
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <MapPin className="h-4 w-4 text-green-500 flex-shrink-0 mt-1" />
                                        <div className="min-w-0">
                                            <div className="text-sm text-muted-foreground">Pickup Location</div>
                                            <div className="font-medium">{ride.startLocation}</div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <MapPin className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
                                        <div className="min-w-0">
                                            <div className="text-sm text-muted-foreground">Destination</div>
                                            <div className="font-medium">{ride.endLocation}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Ride Details */}
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div className="text-center bg-muted/50 rounded-lg p-3">
                                        <div className="text-muted-foreground">Fare</div>
                                        <div className="font-bold text-primary">৳{ride.fare}</div>
                                    </div>
                                    <div className="text-center bg-muted/50 rounded-lg p-3">
                                        <div className="text-muted-foreground">Distance</div>
                                        <div className="font-bold">{ride.distance || "N/A"} km</div>
                                    </div>
                                </div>

                                {/* Timeline */}
                                <div className="text-center text-sm text-muted-foreground">
                                    <Clock className="h-4 w-4 inline-block mr-1" />
                                    {ride.status === "accepted" ? "Accepted" :
                                        ride.status === "picked_up" ? "Picked up" : "Started"} {" "}
                                    {getTimeAgo(ride.requestedAt || ride.acceptedAt)}
                                </div>

                                {/* Action Button */}
                                <Button
                                    onClick={() => handleNextStatus(ride)}
                                    disabled={processingRide === ride._id}
                                    className="w-full gap-2"
                                >
                                    {processingRide === ride._id ? (
                                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                        <ActionIcon className="h-4 w-4" />
                                    )}
                                    {statusConfig.nextAction}
                                </Button>

                                <div className="text-xs text-center text-muted-foreground">
                                    {statusConfig.description}
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Status Progress Guide */}
            <Card className="bg-muted/50 border-0">
                <CardContent className="p-6">
                    <h3 className="font-semibold mb-4 text-center">Ride Status Flow</h3>
                    <div className="flex items-center justify-between max-w-2xl mx-auto">
                        {[
                            { status: 'accepted', label: 'Accepted', description: 'Passenger waiting' },
                            { status: 'picked_up', label: 'Picked Up', description: 'Passenger onboard' },
                            { status: 'in_transit', label: 'In Transit', description: 'On the way' },
                            { status: 'completed', label: 'Completed', description: 'Trip finished' }
                        ].map((step, index) => (
                            <div key={step.status} className="flex flex-col items-center text-center">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${index <= 2 ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted border-muted-foreground/30'
                                    }`}>
                                    {index + 1}
                                </div>
                                <div className="text-sm font-medium mt-2">{step.label}</div>
                                <div className="text-xs text-muted-foreground mt-1">{step.description}</div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Ongoing;