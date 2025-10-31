import { useEffect, useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Filter,
    ChevronLeft,
    ChevronRight,
    ChevronUp,
    ChevronDown,
    Eye
} from 'lucide-react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
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

    const myRides = myRidesData?.data || [];

    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [fareRange, setFareRange] = useState({ min: '', max: '' });
    const [sortField, setSortField] = useState<keyof Ride>('requestedAt');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Derived filtered & sorted rides
    const filteredRides = useMemo(() => {
        let result = [...myRides];

        // Search filter
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            result = result.filter(ride =>
                ride.startLocation.toLowerCase().includes(q) ||
                ride.endLocation.toLowerCase().includes(q)
            );
        }

        // Status filter
        if (statusFilter !== 'all') {
            result = result.filter(ride => ride.status === statusFilter);
        }

        // Fare range filter
        if (fareRange.min) {
            result = result.filter(ride => ride.fare >= parseInt(fareRange.min));
        }
        if (fareRange.max) {
            result = result.filter(ride => ride.fare <= parseInt(fareRange.max));
        }

        // Sorting
        result.sort((a, b) => {
            const aValue = a[sortField];
            const bValue = b[sortField];

            if (sortField === 'requestedAt') {
                const aDate = new Date(aValue as string).getTime();
                const bDate = new Date(bValue as string).getTime();
                return sortDirection === 'asc' ? aDate - bDate : bDate - aDate;
            }

            if (typeof aValue === 'number' && typeof bValue === 'number') {
                return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
            }

            if (typeof aValue === 'string' && typeof bValue === 'string') {
                return sortDirection === 'asc'
                    ? aValue.localeCompare(bValue)
                    : bValue.localeCompare(aValue);
            }

            return 0;
        });

        return result;
    }, [myRides, searchQuery, statusFilter, fareRange, sortField, sortDirection]);

    // Pagination
    const totalPages = Math.ceil(filteredRides.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentRides = filteredRides.slice(startIndex, startIndex + itemsPerPage);

    // Reset page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, statusFilter, fareRange]);

    const handleClearFilters = () => {
        setSearchQuery('');
        setStatusFilter('all');
        setFareRange({ min: '', max: '' });
    };

    const handleSort = (field: keyof Ride) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('desc');
        }
    };

    const SortIcon = ({ field }: { field: keyof Ride }) => {
        if (sortField !== field) return <ChevronUp className="h-4 w-4 opacity-30" />;
        return sortDirection === 'asc'
            ? <ChevronUp className="h-4 w-4" />
            : <ChevronDown className="h-4 w-4" />;
    };

    const getStatusBadge = (status: string, isCancelled?: boolean) => {
        if (isCancelled) {
            return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">Cancelled</Badge>;
        }

        const statusMap: Record<string, string> = {
            requested: 'bg-blue-100 text-blue-800 border-blue-200',
            accepted: 'bg-yellow-100 text-yellow-800 border-yellow-200',
            'in-progress': 'bg-orange-100 text-orange-800 border-orange-200',
            completed: 'bg-green-100 text-green-800 border-green-200',
            cancelled: 'bg-red-100 text-red-800 border-red-200',
        };

        return (
            <Badge variant="outline" className={`${statusMap[status]} border`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
        );
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
                            <CardDescription>View and manage your ride history easily</CardDescription>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* 🔍 Filters */}
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <Input
                                placeholder="Search by location..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />

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

                            <Input
                                type="number"
                                placeholder="Min Fare"
                                value={fareRange.min}
                                onChange={(e) => setFareRange(prev => ({ ...prev, min: e.target.value }))}
                            />

                            <Input
                                type="number"
                                placeholder="Max Fare"
                                value={fareRange.max}
                                onChange={(e) => setFareRange(prev => ({ ...prev, max: e.target.value }))}
                            />
                        </div>

                        <div className="flex justify-between items-center">
                            <Button variant="outline" onClick={handleClearFilters} className="gap-2">
                                <Filter className="h-4 w-4" /> Clear Filters
                            </Button>
                            <p className="text-sm text-muted-foreground">
                                Showing {currentRides.length} of {filteredRides.length} rides
                            </p>
                        </div>
                    </div>

                    {/* 📊 Table */}
                    <div className="border rounded-lg overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-muted/50">
                                    <tr>
                                        <th
                                            className="p-4 text-left font-medium cursor-pointer hover:bg-muted/80"
                                            onClick={() => handleSort('requestedAt')}
                                        >
                                            <div className="flex items-center gap-2">
                                                Date & Time <SortIcon field="requestedAt" />
                                            </div>
                                        </th>
                                        <th className="p-4 text-left font-medium">From</th>
                                        <th className="p-4 text-left font-medium">To</th>
                                        <th
                                            className="p-4 text-left font-medium cursor-pointer hover:bg-muted/80"
                                            onClick={() => handleSort('fare')}
                                        >
                                            <div className="flex items-center gap-2">
                                                Fare <SortIcon field="fare" />
                                            </div>
                                        </th>
                                        <th className="p-4 text-left font-medium">Status</th>
                                        <th className="p-4 text-left font-medium">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {currentRides.length > 0 ? (
                                        currentRides.map((ride) => (
                                            <tr key={ride._id} className="hover:bg-muted/30 transition-colors">
                                                <td className="p-4">
                                                    <div className="font-medium">
                                                        {format(new Date(ride.requestedAt), 'MMM dd, yyyy')}
                                                    </div>
                                                    <div className="text-xs text-muted-foreground">
                                                        {format(new Date(ride.requestedAt), 'hh:mm a')}
                                                    </div>
                                                </td>
                                                <td className="p-4">{ride.startLocation}</td>
                                                <td className="p-4">{ride.endLocation}</td>
                                                <td className="p-4 font-semibold text-primary">৳{ride.fare}</td>
                                                <td className="p-4">{getStatusBadge(ride.status, ride.isCancelled)}</td>
                                                <td className="p-4">
                                                    <Link to={`/rider/rides/${ride._id}`}>
                                                        <Button variant="outline" size="sm" className="gap-2">
                                                            <Eye className="h-4 w-4" /> Details
                                                        </Button>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={6} className="p-8 text-center text-muted-foreground">
                                                No rides found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* 📄 Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-between items-center">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                                disabled={currentPage === 1}
                            >
                                <ChevronLeft className="h-4 w-4" /> Previous
                            </Button>

                            <p className="text-sm text-muted-foreground">
                                Page {currentPage} of {totalPages}
                            </p>

                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                                disabled={currentPage === totalPages}
                            >
                                Next <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default MyRides;
