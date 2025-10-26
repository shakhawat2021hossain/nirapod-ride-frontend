// pages/rider/MyRides.tsx
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Search,
    Filter,
    ChevronLeft,
    ChevronRight,
    ChevronUp,
    ChevronDown,
    DollarSign,
    Eye
} from 'lucide-react';
import { format } from 'date-fns';
import { Link, useNavigate } from 'react-router-dom';
import { useRidesQuery } from '@/redux/features/rider/ride.api';

interface Ride {
    _id: string;
    startLocation: string;
    endLocation: string;
    fare: number;
    status: 'requested' | 'accepted' | 'in-progress' | 'completed' | 'cancelled';
    requestedAt: string;
    isCancelled?: boolean;
}

const MyRides = () => {
    const { data: myRidesData, isLoading } = useRidesQuery(undefined);
    const navigate = useNavigate();

    const myRides = myRidesData?.data || [];
    console.log(myRides)

    const [filteredRides, setFilteredRides] = useState<Ride[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [fareRange, setFareRange] = useState({ min: '', max: '' });
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [sortField, setSortField] = useState<keyof Ride>('requestedAt');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

    // Apply filters and search
    // useEffect(() => {
    //     if (!myRides || myRides.length === 0) {
    //         setFilteredRides([]);
    //         return;
    //     }

    //     let result = [...myRides];

    //     // Search filter
    //     if (searchQuery) {
    //         result = result.filter(ride =>
    //             ride.startLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //             ride.endLocation.toLowerCase().includes(searchQuery.toLowerCase())
    //         );
    //     }

    //     // Status filter
    //     if (statusFilter !== 'all') {
    //         result = result.filter(ride => ride.status === statusFilter);
    //     }

    //     // Fare range filter
    //     if (fareRange.min) {
    //         result = result.filter(ride => ride.fare >= parseInt(fareRange.min));
    //     }
    //     if (fareRange.max) {
    //         result = result.filter(ride => ride.fare <= parseInt(fareRange.max));
    //     }

    //     // Sort data
    //     result.sort((a, b) => {
    //         const aValue = a[sortField];
    //         const bValue = b[sortField];

    //         if (sortField === 'requestedAt') {
    //             const aDate = new Date(aValue as string);
    //             const bDate = new Date(bValue as string);
    //             return sortDirection === 'asc' ? aDate.getTime() - bDate.getTime() : bDate.getTime() - aDate.getTime();
    //         }

    //         if (typeof aValue === 'number' && typeof bValue === 'number') {
    //             return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    //         }

    //         if (typeof aValue === 'string' && typeof bValue === 'string') {
    //             return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    //         }

    //         return 0;
    //     });

    //     setFilteredRides(result);
    //     setCurrentPage(1);
    // }, [searchQuery, statusFilter, fareRange, myRides, sortField, sortDirection]);

    // Pagination
    const totalPages = Math.ceil(filteredRides.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentRides = filteredRides.slice(startIndex, startIndex + itemsPerPage);

    const handleClearFilters = () => {
        setSearchQuery('');
        setStatusFilter('all');
        setFareRange({ min: '', max: '' });
    };

    const getStatusBadge = (status: string, isCancelled?: boolean) => {
        if (isCancelled) {
            return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">Cancelled</Badge>;
        }

        const statusConfig = {
            requested: { label: 'Requested', color: 'bg-blue-100 text-blue-800 border-blue-200' },
            accepted: { label: 'Accepted', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
            'in-progress': { label: 'In Progress', color: 'bg-orange-100 text-orange-800 border-orange-200' },
            completed: { label: 'Completed', color: 'bg-green-100 text-green-800 border-green-200' },
            cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-800 border-red-200' }
        };

        const config = statusConfig[status as keyof typeof statusConfig];
        return (
            <Badge variant="outline" className={`${config.color} border`}>
                {config.label}
            </Badge>
        );
    };

    const handleSort = (field: keyof Ride) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('desc');
        }
    };

    const handleViewDetails = (rideId: string) => {
        navigate(`/rider/rides/${rideId}`);
    };

    const SortIcon = ({ field }: { field: keyof Ride }) => {
        if (sortField !== field) return <ChevronUp className="h-4 w-4 opacity-30" />;
        return sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />;
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

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <CardTitle className="text-2xl font-bold">My Rides</CardTitle>
                            <CardDescription>
                                View and manage your ride history in a structured table format
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* Search and Filters */}
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            {/* Search Bar */}
                            <div className="md:col-span-2">
                                <Input
                                    placeholder="Search by location..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full"
                                />
                            </div>

                            {/* Status Filter */}
                            <div>
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="w-full p-2 border rounded-md bg-background"
                                >
                                    <option value="all">All Status</option>
                                    <option value="requested">Requested</option>
                                    <option value="accepted">Accepted</option>
                                    <option value="in-progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                            </div>

                            {/* Clear Filters */}
                            <div>
                                <Button variant="outline" onClick={handleClearFilters} className="w-full gap-2">
                                    <Filter className="h-4 w-4" />
                                    Clear Filters
                                </Button>
                            </div>
                        </div>

                        {/* Fare Range */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                                    <DollarSign className="h-4 w-4" />
                                    Min Fare
                                </label>
                                <Input
                                    type="number"
                                    placeholder="Min fare"
                                    value={fareRange.min}
                                    onChange={(e) => setFareRange(prev => ({ ...prev, min: e.target.value }))}
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium mb-2 block flex items-center gap-2">
                                    <DollarSign className="h-4 w-4" />
                                    Max Fare
                                </label>
                                <Input
                                    type="number"
                                    placeholder="Max fare"
                                    value={fareRange.max}
                                    onChange={(e) => setFareRange(prev => ({ ...prev, max: e.target.value }))}
                                />
                            </div>

                            <div className="flex items-end">
                                <div className="text-sm text-muted-foreground">
                                    Showing {filteredRides.length} of {myRides.length} rides
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="border rounded-lg overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-muted/50">
                                    <tr>
                                        <th
                                            className="text-left p-4 font-medium cursor-pointer hover:bg-muted/80 transition-colors"
                                            onClick={() => handleSort('requestedAt')}
                                        >
                                            <div className="flex items-center gap-2">
                                                Date & Time
                                                <SortIcon field="requestedAt" />
                                            </div>
                                        </th>
                                        <th className="text-left p-4 font-medium">
                                            From
                                        </th>
                                        <th className="text-left p-4 font-medium">
                                            To
                                        </th>
                                        <th
                                            className="text-left p-4 font-medium cursor-pointer hover:bg-muted/80 transition-colors"
                                            onClick={() => handleSort('fare')}
                                        >
                                            <div className="flex items-center gap-2">
                                                Fare
                                                <SortIcon field="fare" />
                                            </div>
                                        </th>
                                        <th className="text-left p-4 font-medium">
                                            Status
                                        </th>
                                        <th className="text-left p-4 font-medium">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {myRides.length > 0 ? (
                                        myRides.map((ride: Ride) => (
                                            <tr key={ride._id} className="hover:bg-muted/30 transition-colors">
                                                <td className="p-4">
                                                    <div className="font-medium">
                                                        {format(new Date(ride.requestedAt), 'MMM dd, yyyy')}
                                                    </div>
                                                    <div className="text-muted-foreground text-xs">
                                                        {format(new Date(ride.requestedAt), 'hh:mm a')}
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <div className="max-w-[200px] truncate" title={ride.startLocation}>
                                                        {ride.startLocation}
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <div className="max-w-[200px] truncate" title={ride.endLocation}>
                                                        {ride.endLocation}
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <div className="font-semibold text-primary">
                                                        ৳{ride.fare}
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    {getStatusBadge(ride.status, ride.isCancelled)}
                                                </td>
                                                <td className="p-4">
                                                    <Link to={`/rider/rides/${ride._id}`}>
                                                        <Button
                                                            onClick={() => handleViewDetails(ride._id)}
                                                            variant="outline"
                                                            size="sm"
                                                            className="gap-2"
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                            Details

                                                        </Button>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={6} className="p-8 text-center text-muted-foreground">
                                                {myRides.length === 0 ? 'No rides found.' : 'No rides found matching your filters.'}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-muted-foreground">
                                Page {currentPage} of {totalPages} • {filteredRides.length} total rides
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                    Previous
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default MyRides;