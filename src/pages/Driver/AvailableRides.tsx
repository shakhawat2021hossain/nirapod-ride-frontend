import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, CheckCircle, XCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useAcceptRideMutation, useAvailableRidesQuery } from '@/redux/features/rider/ride.api';
import type { IRide } from '@/types/ride.type';



const AvailableRides = () => {
    const { data: availableRidesData, isLoading, error, refetch } = useAvailableRidesQuery(undefined);
    const [acceptRide] = useAcceptRideMutation();

    const availableRides = availableRidesData?.data || [];

    const handleAcceptRide = async (rideId: string) => {
        try {
            await acceptRide(rideId).unwrap();

            alert('Ride accepted successfully!');
            refetch();
        } catch (error) {
            console.error('Error accepting ride:', error);
            alert('Failed to accept ride. Please try again.');
        }
    };

    const handleRejectRide = async (rideId: string) => {
        try {
            console.log(rideId)

        } catch (error) {
            console.log(error)

        }
    };

    const getTimeAgo = (timestamp: string) => {
        return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-center">
                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Loading available rides...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-8">
                <div className="text-red-500 mb-4">
                    <XCircle className="h-12 w-12 mx-auto mb-2" />
                    <p>Failed to load available rides</p>
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
                    <h1 className="text-2xl sm:text-3xl font-bold">Available Rides</h1>
                    <p className="text-muted-foreground">
                        Accept or reject ride requests from passengers
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-sm">
                        {availableRides.length} Available
                    </Badge>
                    <Button variant="outline" onClick={() => refetch()} size="sm">
                        Refresh
                    </Button>
                </div>
            </div>

            {/* Available Rides Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {availableRides.length > 0 ? (
                    availableRides.map((ride: IRide) => (
                        <Card
                            key={ride._id}
                            className="hover:shadow-lg transition-all duration-300 border-2 border-green-200"
                        >
                            <CardHeader className="">

                                <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                                    Available
                                </Badge>
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

                                {/* Fare Information */}
                                <div className="bg-gradient-to-r from-primary/10 to-purple-600/10 rounded-lg p-4 text-center">
                                    <div className="text-sm text-muted-foreground">Fare</div>
                                    <div className="text-2xl font-bold text-primary">৳{ride.fare}</div>
                                </div>

                                {/* Request Time */}
                                <div className="text-center text-sm text-muted-foreground">
                                    <Clock className="h-4 w-4 inline-block mr-1" />
                                    Requested {getTimeAgo(ride.requestedAt)}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-2 pt-2">
                                    <Button
                                        onClick={() => handleRejectRide(ride._id)}
                                        variant="outline"
                                        className="flex-1 gap-2"
                                    >

                                        Reject
                                    </Button>

                                    <Button
                                        onClick={() => handleAcceptRide(ride._id)}
                                        className="flex-1 gap-2 bg-green-600 hover:bg-green-700"
                                    >

                                        Accept
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <div className="col-span-full text-center py-12">
                        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                            <Clock className="h-10 w-10 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">No Available Rides</h3>
                        <p className="text-muted-foreground mb-6">
                            There are no ride requests available at the moment.
                        </p>
                        <Button onClick={() => refetch()} variant="outline">
                            Check Again
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AvailableRides;

// {
//     processingRide === ride._id ? (
//         <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
//     ) : (
//     <XCircle className="h-4 w-4" />
// )
// }