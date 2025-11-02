import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, User, Navigation, CheckCircle, Car, RefreshCw } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useDriverRidesQuery, useUpdateStatusMutation } from "@/redux/features/rider/ride.api";
import SOSButton from '@/components/Dashboard/EmergencyButton';

const Ongoing = () => {
    const { data: rides, isLoading, refetch } = useDriverRidesQuery(undefined);
    const [updateStatus] = useUpdateStatusMutation();
    const [processingRide, setProcessingRide] = useState<string | null>(null);

    // Filter active rides
    const activeRides = rides?.data?.filter((ride: any) =>
        ride.status === "accepted" || ride.status === "in_transit" || ride.status === "picked_up"
    ) || [];

    const handleNextStatus = async (ride: any) => {
        const statusMap = {
            "accepted": "picked_up",
            "picked_up": "in_transit",
            "in_transit": "completed"
        };

        const nextStatus = statusMap[ride.status as keyof typeof statusMap];
        if (!nextStatus) return;

        try {
            setProcessingRide(ride._id);
            await updateStatus({ id: ride._id, status: { status: nextStatus } }).unwrap();
            refetch();
        } catch (error) {
            console.error("Failed to update status", error);
        } finally {
            setProcessingRide(null);
        }
    };

    const getStatusInfo = (status: string) => {
        const info = {
            accepted: { label: "Accepted", action: "Mark Picked Up", icon: User, color: "bg-blue-500" },
            picked_up: { label: "Picked Up", action: "Start Trip", icon: Navigation, color: "bg-yellow-500" },
            in_transit: { label: "In Transit", action: "Complete Ride", icon: CheckCircle, color: "bg-purple-500" }
        };
        return info[status as keyof typeof info] || { label: status, action: "", icon: Car, color: "bg-gray-500" };
    };

    // Get current progress step based on ride status
    const getCurrentStep = (status: string) => {
        const steps = ["accepted", "picked_up", "in_transit", "completed"];
        return steps.indexOf(status);
    };

    // Get progress color for each step based on current ride status
    const getStepColor = (stepIndex: number, currentStep: number) => {
        if (stepIndex < currentStep) {
            return "bg-green-500 text-white"; // Completed steps
        }
        if (stepIndex === currentStep) {
            return "bg-blue-500 text-white"; // Current step
        }
        return "bg-gray-300 text-gray-600"; // Future steps
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <RefreshCw className="w-10 h-10 text-primary animate-spin mx-auto mb-4" />
            </div>
        );
    };

    if (activeRides.length === 0) {
        return (
            <div className="text-center py-16">
                <Car className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No Active Rides</h3>
                <Button onClick={() => refetch()} variant="outline">
                    Refresh
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">Active Rides</h1>
                    <p className="text-gray-600">{activeRides.length} ongoing</p>
                </div>
                <Button variant="outline" onClick={() => refetch()} size="sm">
                    Refresh
                </Button>
            </div>

            {/* Rides List */}
            <div className="grid gap-4">
                {activeRides.map((ride: any) => {
                    const statusInfo = getStatusInfo(ride.status);
                    const ActionIcon = statusInfo.icon;
                    const currentStep = getCurrentStep(ride.status);

                    return (
                        <Card key={ride._id} className="p-4">
                            {/* Passenger & Status */}
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-2">
                                    <User className="h-5 w-5 text-blue-600" />
                                    <span className="font-medium">{ride.passenger?.name || "Passenger"}</span>
                                </div>
                                <Badge variant="secondary">{statusInfo.label}</Badge>
                            </div>

                            {/* Locations */}
                            <div className="space-y-2 mb-4">
                                <div className="flex items-center gap-2 text-sm">
                                    <MapPin className="h-4 w-4 text-green-600" />
                                    <span>{ride.startLocation}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                    <MapPin className="h-4 w-4 text-red-600" />
                                    <span>{ride.endLocation}</span>
                                </div>
                            </div>

                            {/* Details */}
                            <div className="flex justify-between text-sm mb-4">
                                <div>
                                    <div className="text-gray-600">Fare</div>
                                    <div className="font-bold">৳{ride.fare}</div>
                                </div>
                                <div>
                                    <div className="text-gray-600">Distance</div>
                                    <div className="font-bold">{ride.distance || "N/A"} km</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-gray-600">Time</div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="h-3 w-3" />
                                        {formatDistanceToNow(new Date(ride.requestedAt || ride.acceptedAt), { addSuffix: true })}
                                    </div>
                                </div>
                            </div>

                            {/* Ride Progress */}
                            <div className="mb-4">
                                <div className="flex justify-between text-sm text-center mb-2">
                                    {["Accepted", "Picked Up", "In Transit", "Completed"].map((step, index) => (
                                        <div key={step} className="flex flex-col items-center flex-1">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors duration-300 ${getStepColor(index, currentStep)}`}>
                                                {index + 1}
                                            </div>
                                            <div className="mt-1 text-xs">{step}</div>
                                        </div>
                                    ))}
                                </div>

                                {/* Progress Line */}
                                <div className="relative">
                                    <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-300 -translate-y-1/2"></div>
                                    <div
                                        className="absolute top-1/2 left-0 h-1 bg-green-500 -translate-y-1/2 transition-all duration-500 ease-in-out"
                                        style={{ width: `${(currentStep / 3) * 100}%` }}
                                    ></div>
                                </div>
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
                                {statusInfo.action}
                            </Button>
                        </Card>
                    );
                })}
            </div>
            <SOSButton />
        </div>
    );
};

export default Ongoing;