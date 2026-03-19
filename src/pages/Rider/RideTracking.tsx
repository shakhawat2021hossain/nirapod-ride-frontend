
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { ArrowLeft, PlayCircle, CheckCircle, User, XCircle } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { useGetRideByIdQuery, useRidesQuery, useCancelRideMutation } from '@/redux/features/rider/ride.api';
import { toast } from 'react-hot-toast';

interface RideTrackingEvent {
  status: string;
  timestamp: string;
  description: string;
  icon: React.ReactNode;
  completed: boolean;
}

const RideTracking = () => {
  const navigate = useNavigate();
  const { data: ridesData, isLoading: ridesLoading } = useRidesQuery(undefined);
  const activeRide = useMemo(() => {
    const rides = ridesData?.data || [];
    const active = rides
      .filter((ride: any) => !['completed', 'cancelled'].includes(ride.status))
      .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return active.length > 0 ? active[0] : null;
  }, [ridesData]);

  const { data: rideDetailData, isLoading: rideLoading } = useGetRideByIdQuery(activeRide?._id, {
    skip: !activeRide?._id,
  });

  const ride = rideDetailData?.data;
  console.log(ride)
  const [timeline, setTimeline] = useState<RideTrackingEvent[]>([]);
  const [cancelRide, { isLoading: isCanceling }] = useCancelRideMutation();

  const canCancel = ride && ride.status === 'requested';

  const handleCancelRide = async () => {
    if (!ride) return;
    try {
      await cancelRide(ride._id);
      toast.success('Ride cancelled successfully');
    } catch (err) {
      toast.error('Could not cancel ride. Please try again.');
      console.error(err);
    }
  };

  useEffect(() => {
    if (!ride) {
      setTimeline([]);
      return;
    }

    const events: RideTrackingEvent[] = [
      {
        status: 'requested',
        timestamp: ride.requestedAt || ride.createdAt,
        description: 'Ride requested',
        icon: <PlayCircle className="h-5 w-5 text-blue-500" />,
        completed: true,
      },
    ];

    if (ride.acceptedAt || ride.status === 'accepted') {
      events.push({
        status: 'accepted',
        timestamp: ride.acceptedAt || ride.updatedAt || ride.createdAt,
        description: 'Driver accepted the ride',
        icon: <CheckCircle className="h-5 w-5 text-green-500" />,
        completed: true,
      });
    }

    if (ride.pickedUpAt || ride.status === 'picked_up' || ride.status === 'in_transit' || ride.status === 'in-progress' || ride.status === 'ongoing') {
      events.push({
        status: 'picked-up',
        timestamp: ride.pickedUpAt || ride.updatedAt || ride.createdAt,
        description: 'Rider picked up / ride started',
        icon: <User className="h-5 w-5 text-purple-500" />,
        completed: true,
      });
    }

    if (ride.status === 'completed') {
      events.push({
        status: 'completed',
        timestamp: ride.completedAt || ride.updatedAt,
        description: 'Ride completed',
        icon: <CheckCircle className="h-5 w-5 text-green-600" />,
        completed: true,
      });
    }

    if (ride.isCancelled) {
      events.push({
        status: 'cancelled',
        timestamp: ride.updatedAt || ride.createdAt,
        description: 'Ride cancelled',
        icon: <XCircle className="h-5 w-5 text-red-500" />,
        completed: true,
      });
    }

    events.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
    setTimeline(events);
  }, [ride]);

  const formatTimestamp = (timestamp?: string) => {
    if (!timestamp) return { date: '-', time: '-', relative: '-' };
    const d = new Date(timestamp);
    return {
      date: format(d, 'MMM dd, yyyy'),
      time: format(d, 'hh:mm a'),
      relative: formatDistanceToNow(d, { addSuffix: true }),
    };
  };



  const isBusy = ridesLoading || rideLoading;

  if (isBusy) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-muted-foreground">Loading your active ride...</p>
        </div>
      </div>
    );
  }

  if (!activeRide || !ride) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => navigate('/rider/my-rides')} className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to My Rides
          </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>No active ride to track</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">You don't have a ride in progress right now. Book a ride or view your ride history.</p>
            <div className="mt-4 flex gap-2">
              <Button onClick={() => navigate('/rider/my-rides')}>My Rides</Button>
              <Button variant="outline" onClick={() => navigate('/rider/overview')}>Book Ride</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-primary">Live Ride Tracking</p>
          <h1 className="text-3xl font-bold">Your ride is on the way</h1>
          <p className="text-muted-foreground mt-1">We are updating this screen in real-time so you can follow progress.</p>
        </div>
        <div className="flex gap-2 items-center">
          <Button variant="outline" size="sm" onClick={() => navigate('/rider/my-rides')}>My Rides</Button>
          <Button size="sm" onClick={() => navigate(`/rider/rides/${ride._id}`)}>Ride Details</Button>
          <Button
            size="sm"
            variant={canCancel ? 'destructive' : 'outline'}
            onClick={handleCancelRide}
            disabled={!canCancel || isCanceling}
          >
            {isCanceling ? 'Cancelling...' : 'Cancel Ride'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Live status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-4 text-white shadow-lg">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
                <div>
                  <div className="text-xs uppercase tracking-[0.18em] text-slate-300">{ride.status === 'requested' ? 'Searching for driver' : ['accepted', 'driver_assigned'].includes(ride.status) ? 'Driver en route' : ['in-progress', 'ongoing', 'in_transit', 'picked_up'].includes(ride.status) ? 'Ride in progress' : 'Ride status'}</div>
                  <h2 className="text-2xl font-semibold mt-1">{ride.status === 'requested' ? 'Waiting for driver' : ['accepted', 'driver_assigned'].includes(ride.status) ? 'Driver on the way' : ['in-progress', 'ongoing', 'in_transit', 'picked_up'].includes(ride.status) ? 'Ride in progress' : 'Tracking ride'}</h2>
                </div>
                <div className="rounded-full bg-slate-900/70 px-3 py-1 border border-slate-600 text-xs text-slate-200">Ride ID: {ride._id.slice(-6)}</div>
              </div>
              <div className="mt-4 rounded-xl bg-slate-800/70 p-3">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>ETA</span>
                  <span>{ride.estimatedArrival || 'Calculating...'}</span>
                </div>
                <div className="h-2 mt-2 w-full rounded-full bg-green-500/20 overflow-hidden">
                  <div className="h-full w-[65%] animate-pulse bg-gradient-to-r from-green-400 to-green-200" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <div className="rounded-xl border border-slate-200/20 p-3 bg-white/80">
                <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Pickup</div>
                <div className="mt-1 font-semibold text-slate-900">{ride.startLocation || 'Pending'}</div>
                <div className="text-xs text-slate-500 mt-1">Requested {formatTimestamp(ride.requestedAt).time}</div>
              </div>
              <div className="rounded-xl border border-slate-200/20 p-3 bg-white/80">
                <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Destination</div>
                <div className="mt-1 font-semibold text-slate-900">{ride.endLocation || 'Pending'}</div>
                <div className="text-xs text-slate-500 mt-1">Driver assigned {ride.acceptedAt ? formatTimestamp(ride.acceptedAt).time : '—'}</div>
              </div>
              <div className="rounded-xl border border-slate-200/20 p-3 bg-white/80">
                <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Fare</div>
                <div className="mt-1 text-2xl font-semibold text-primary">৳{ride.fare || 0}</div>
                <div className="text-xs text-slate-500 mt-1">Estimated cost</div>
              </div>
            </div>

            <div className="mt-2 rounded-xl border border-dashed border-primary p-3 bg-primary/5">
              <div className="flex items-center gap-2 text-sm text-primary font-medium">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" /> Live updates enabled
              </div>
              <div className="mt-2 text-xs text-slate-500">We refresh status every few seconds while this screen is open.</div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3">
          <Card>
            <CardHeader>
              <CardTitle>Ride status timeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {timeline.length > 0 ? (
                <div className="space-y-2">
                  {timeline.map((event, index) => {
                    const formatted = formatTimestamp(event.timestamp);
                    const isActive = event.status === ride.status || (ride.status === 'in-progress' && event.status === 'picked-up');
                    return (
                      <div key={event.status + index} className={`rounded-lg p-3 border ${isActive ? 'border-primary bg-primary/10' : 'border-slate-200 bg-slate-50'}`}>
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="text-sm font-semibold">{event.description}</div>
                            <div className="text-xs text-slate-500">{formatted.date} • {formatted.time}</div>
                          </div>
                          <div className={`text-[11px] rounded-full px-2 py-0.5 ${isActive ? 'bg-primary text-white' : 'bg-slate-200 text-slate-600'}`}>
                            {isActive ? 'Now' : 'Done'}
                          </div>
                        </div>
                        <div className="mt-2 text-xs text-slate-500">{event.status}</div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center text-sm text-slate-500">Ride timeline not available yet.</div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RideTracking;
