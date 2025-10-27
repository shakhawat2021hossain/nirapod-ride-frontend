import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, DollarSign, Clock, ArrowLeft, User, Car, Phone, Navigation, CheckCircle, XCircle, PlayCircle } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { useGetRideByIdQuery } from '@/redux/features/rider/ride.api';

interface RideDetails {
    _id: string;
    rider: string;
    startLocation: string;
    endLocation: string;
    fare: number;
    isCancelled: boolean;
    status: 'requested' | 'accepted' | 'in-progress' | 'completed' | 'cancelled';
    requestedAt: string;
    createdAt: string;
    updatedAt: string;
    acceptedAt?: string;
    driver?: string;
    pickedUpAt?: string;
    completedAt?: string;
    driverInfo?: {
        name: string;
        phone: string;
        vehicle: string;
        licensePlate: string;
        rating: number;
    };
}

interface TimelineEvent {
    status: string;
    timestamp: string;
    description: string;
    icon: React.ReactNode;
    completed: boolean;
}

const RideDetails = () => {
    const { id } = useParams();
    const { data: rideData, isLoading, error } = useGetRideByIdQuery(id);
    const navigate = useNavigate();
    const [timeline, setTimeline] = useState<TimelineEvent[]>([]);

    // Extract ride from API response data
    const ride = rideData?.data;

    // Generate timeline when ride data is available
    useEffect(() => {
        if (ride) {
            generateTimeline(ride);
        }
    }, [ride]);

    const generateTimeline = (rideData: RideDetails) => {
        const events: TimelineEvent[] = [];

        // Requested
        events.push({
            status: 'requested',
            timestamp: rideData.requestedAt,
            description: 'Ride requested',
            icon: <PlayCircle className="h-5 w-5 text-blue-500" />,
            completed: true
        });

        // Accepted
        if (rideData.acceptedAt) {
            events.push({
                status: 'accepted',
                timestamp: rideData.acceptedAt,
                description: 'Driver accepted the ride',
                icon: <CheckCircle className="h-5 w-5 text-green-500" />,
                completed: true
            });
        }

        // Picked Up
        if (rideData.pickedUpAt) {
            events.push({
                status: 'picked-up',
                timestamp: rideData.pickedUpAt,
                description: 'You were picked up',
                icon: <User className="h-5 w-5 text-purple-500" />,
                completed: true
            });
        }

        // Completed or Cancelled
        if (rideData.completedAt && !rideData.isCancelled) {
            events.push({
                status: 'completed',
                timestamp: rideData.completedAt,
                description: 'Ride completed successfully',
                icon: <CheckCircle className="h-5 w-5 text-green-600" />,
                completed: true
            });
        } else if (rideData.isCancelled) {
            events.push({
                status: 'cancelled',
                timestamp: rideData.updatedAt,
                description: 'Ride was cancelled',
                icon: <XCircle className="h-5 w-5 text-red-500" />,
                completed: true
            });
        }

        // Sort by timestamp
        events.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
        setTimeline(events);
    };

    const getStatusBadge = (status: string, isCancelled: boolean) => {
        if (isCancelled) {
            return <Badge className="bg-red-100 text-red-800 border-red-200">Cancelled</Badge>;
        }

        const statusConfig = {
            requested: { label: 'Requested', color: 'bg-blue-100 text-blue-800 border-blue-200' },
            accepted: { label: 'Accepted', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
            'in-progress': { label: 'In Progress', color: 'bg-orange-100 text-orange-800 border-orange-200' },
            completed: { label: 'Completed', color: 'bg-green-100 text-green-800 border-green-200' }
        };

        const config = statusConfig[status as keyof typeof statusConfig];
        if (!config) return null;
        return <Badge className={`${config.color} border`}>{config.label}</Badge>;
    };

    const formatTimestamp = (timestamp?: string) => {
        if (!timestamp) return { date: '-', time: '-', relative: '-' };
        const date = new Date(timestamp);
        return {
            date: format(date, 'MMM dd, yyyy'),
            time: format(date, 'hh:mm a'),
            relative: formatDistanceToNow(date, { addSuffix: true }),
        };
    };

    const calculateDuration = () => {
        if (!ride?.pickedUpAt || !ride?.completedAt) return null;

        const pickedUp = new Date(ride.pickedUpAt);
        const completed = new Date(ride.completedAt);
        const durationMs = completed.getTime() - pickedUp.getTime();
        const minutes = Math.floor(durationMs / (1000 * 60));
        const seconds = Math.floor((durationMs % (1000 * 60)) / 1000);

        return `${minutes}m ${seconds}s`;
    };

    // Handle loading state
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-center">
                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Loading ride details...</p>
                </div>
            </div>
        );
    }

    // Handle error state
    if (error || !ride) {
        return (
            <div className="text-center py-8">
                <p className="text-muted-foreground">
                    {error ? 'Error loading ride details.' : 'Ride not found.'}
                </p>
                <Button onClick={() => navigate('/rider/my-rides')} className="mt-4">
                    Back to My Rides
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Button variant="outline" onClick={() => navigate('/rider/my-rides')} className="gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Back to My Rides
                </Button>
                <div>
                    <h1 className="text-2xl font-bold">Ride Details</h1>
                    <p className="text-muted-foreground">Ride ID: {ride._id}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Ride Info */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Status and Basic Info */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                Ride Information
                                {getStatusBadge(ride.status, ride.isCancelled)}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Locations */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <MapPin className="h-5 w-5 text-green-500" />
                                        <div>
                                            <div className="text-sm text-muted-foreground">Pickup Location</div>
                                            <div className="font-medium text-lg">{ride.startLocation}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <MapPin className="h-5 w-5 text-primary" />
                                        <div>
                                            <div className="text-sm text-muted-foreground">Destination</div>
                                            <div className="font-medium text-lg">{ride.endLocation}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Fare and Duration */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex items-center gap-3">
                                    <DollarSign className="h-5 w-5 text-green-600" />
                                    <div>
                                        <div className="text-sm text-muted-foreground">Total Fare</div>
                                        <div className="font-medium text-2xl text-primary">৳{ride.fare}</div>
                                    </div>
                                </div>
                                {calculateDuration() && (
                                    <div className="flex items-center gap-3">
                                        <Clock className="h-5 w-5 text-blue-500" />
                                        <div>
                                            <div className="text-sm text-muted-foreground">Ride Duration</div>
                                            <div className="font-medium text-xl">{calculateDuration()}</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Ride Timeline */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Navigation className="h-5 w-5" />
                                Ride Timeline
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {timeline.length > 0 ? (
                                    timeline.map((event, index) => {
                                        const formattedTime = formatTimestamp(event.timestamp);
                                        return (
                                            <div key={event.status} className="flex gap-4">
                                                {/* Timeline line */}
                                                <div className="flex flex-col items-center">
                                                    <div className={`p-2 rounded-full ${event.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                                                        {event.icon}
                                                    </div>
                                                    {index < timeline.length - 1 && (
                                                        <div className="w-0.5 h-full bg-green-200 mt-2"></div>
                                                    )}
                                                </div>

                                                {/* Event details */}
                                                <div className="flex-1 pb-4">
                                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                                        <div>
                                                            <div className="font-medium">{event.description}</div>
                                                            <div className="text-sm text-muted-foreground">
                                                                {formattedTime.date} at {formattedTime.time}
                                                            </div>
                                                        </div>
                                                        <div className="text-sm text-muted-foreground">
                                                            {formattedTime.relative}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="text-center py-4 text-muted-foreground">
                                        No timeline events available.
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Driver Information */}
                    {ride.driverInfo && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <User className="h-5 w-5" />
                                    Driver Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <User className="h-5 w-5 text-blue-500" />
                                            <div>
                                                <div className="text-sm text-muted-foreground">Driver Name</div>
                                                <div className="font-medium">{ride.driverInfo.name}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Phone className="h-5 w-5 text-green-500" />
                                            <div>
                                                <div className="text-sm text-muted-foreground">Phone Number</div>
                                                <div className="font-medium">{ride.driverInfo.phone}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <Car className="h-5 w-5 text-purple-500" />
                                            <div>
                                                <div className="text-sm text-muted-foreground">Vehicle</div>
                                                <div className="font-medium">{ride.driverInfo.vehicle}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Car className="h-5 w-5 text-orange-500" />
                                            <div>
                                                <div className="text-sm text-muted-foreground">License Plate</div>
                                                <div className="font-medium">{ride.driverInfo.licensePlate}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {ride.driverInfo.rating && (
                                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                                        <div className="flex items-center gap-2">
                                            <div className="text-sm text-muted-foreground">Driver Rating:</div>
                                            <div className="flex items-center gap-1">
                                                <span className="text-yellow-500">⭐</span>
                                                <span className="font-medium">{ride.driverInfo.rating}/5</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Sidebar - Timestamps Summary */}
                <div className="space-y-6">
                    

                    {/* Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Button className="w-full" variant="outline">
                                Download Receipt
                            </Button>
                            <Button className="w-full" variant="outline">
                                Contact Support
                            </Button>
                            <Button className="w-full" variant="outline">
                                Rate This Ride
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Ride Summary */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Ride Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Status</span>
                                {getStatusBadge(ride.status, ride.isCancelled)}
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Distance</span>
                                <span className="font-medium">~85 km</span>
                            </div>
                            {calculateDuration() && (
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Duration</span>
                                    <span className="font-medium">{calculateDuration()}</span>
                                </div>
                            )}
                            <div className="flex justify-between text-lg font-semibold pt-2 border-t">
                                <span>Total Fare</span>
                                <span className="text-primary">৳{ride.fare}</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default RideDetails;