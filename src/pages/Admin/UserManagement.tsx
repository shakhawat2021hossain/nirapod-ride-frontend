import { useState, useMemo } from 'react';
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search, MoreVertical, UserX, UserCheck, Car, Ban,
  CheckCircle, XCircle, Download, RefreshCw, Users, UserCog,
  Clock, Mail, Phone, MapPin, Shield
} from "lucide-react";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import { useAllUsersQuery, useApproveDriverMutation, useBlockUserMutation } from '@/redux/features/user/user.api';
import type { IUser, TRole } from '@/types';
import { toast } from 'react-hot-toast';
import { roles } from '@/constants/role';

const UserManagement = () => {
  const { data: usersResponse, isLoading, error, refetch } = useAllUsersQuery(undefined);
  const [approveDriver] = useApproveDriverMutation();
  const [blockUser] = useBlockUserMutation();

  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<TRole | 'all'>('all');
  const [blockFilter, setBlockFilter] = useState<'all' | 'blocked' | 'active'>('all');

  const users: IUser[] = usersResponse || [];
  // console.log(users)

  const filteredUsers = useMemo(() => {
    return users.filter((user: IUser) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone?.toLowerCase().includes(searchTerm.toLowerCase()) || false;

      const matchesRole = roleFilter === 'all' || user.role === roleFilter;

      const matchesBlock = blockFilter === 'all' ||
        (blockFilter === 'blocked' && user.isBlocked) ||
        (blockFilter === 'active' && !user.isBlocked);

      return matchesSearch && matchesRole && matchesBlock;
    });
  }, [users, searchTerm, roleFilter, blockFilter]);

  // ✅ Driver approval or rejection
  const handleApproveDriver = async (id: string, status: 'approved' | 'rejected') => {
    console.log(status)
    try {
      await approveDriver({id, status}).unwrap();
      toast.success(`Driver ${status === 'approved' ? 'approved' : 'rejected'} successfully`);
      refetch();
    } catch (err) {
      console.error(err);
      toast.error('Failed to update driver status');
    }
  };

  // ✅ Block or Unblock user
  const handleBlockUser = async (id: string, block: boolean) => {
    try {
      await blockUser(id).unwrap();
      toast.success(block ? 'User blocked successfully' : 'User unblocked successfully');
      refetch();
    } catch (err) {
      console.error(err);
      toast.error('Failed to update user status');
    }
  };

  // 🟢 Badges
  const getBlockStatusBadge = (user: IUser) =>
    user.isBlocked
      ? <Badge variant="destructive">Blocked</Badge>
      : <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">Active</Badge>;

  const getDriverApprovalBadge = (user: IUser) => {
    // if (user.role !== 'DRIVER') return <span className="text-muted-foreground text-sm">-</span>;
    switch (user?.driverRequest?.status) {
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Rejected</Badge>;
      case 'approved':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Approved</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">No Request</Badge>;
    }
  };

  const getRoleBadge = (role: TRole) => {
    const map = {
      ADMIN: 'bg-purple-500',
      DRIVER: 'bg-blue-500',
      RIDER: 'bg-green-500',
    };
    return <Badge className={map[role]}>{role}</Badge>;
  };

  const getVehicleInfo = (user: IUser) => {
    if (user.role !== 'DRIVER') return null;
    return user.vehicleInfo ? (
      <div className="text-xs text-muted-foreground mt-1">
        {user.vehicleInfo.model} • {user.vehicleInfo.plateNum}
      </div>
    ) : (
      <div className="text-xs text-muted-foreground mt-1">No vehicle info</div>
    );
  };

  const stats = useMemo(() => {
    const total = users.length;
    const riders = users.filter(u => u.role === 'RIDER').length;
    const drivers = users.filter(u => u.role === 'DRIVER').length;
    const admins = users.filter(u => u.role === 'ADMIN').length;
    const blocked = users.filter(u => u.isBlocked).length;
    const pendingDrivers = users.filter(u => u.role === 'DRIVER' && u.driverRequest?.status === 'pending').length;
    return { total, riders, drivers, admins, blocked, pendingDrivers };
  }, [users]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <RefreshCw className="w-10 h-10 text-primary animate-spin mx-auto mb-4" />
        <p className="text-muted-foreground">Loading users...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <div className="text-red-500 mb-4">
          <UserX className="h-12 w-12 mx-auto mb-2" />
          <p>Failed to load users data</p>
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
          <h1 className="text-2xl sm:text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground">Manage riders, drivers, and administrators</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => refetch()}>
            <RefreshCw className="h-4 w-4 mr-2" /> Refresh
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" /> Export
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        {[
          { label: 'Total', value: stats.total, icon: Users, color: 'blue' },
          { label: 'Riders', value: stats.riders, icon: UserCog, color: 'green' },
          { label: 'Drivers', value: stats.drivers, icon: Car, color: 'orange' },
          { label: 'Admins', value: stats.admins, icon: Shield, color: 'purple' },
          { label: 'Pending', value: stats.pendingDrivers, icon: Clock, color: 'yellow' },
          { label: 'Blocked', value: stats.blocked, icon: Ban, color: 'red' },
        ].map(({ label, value, icon: Icon, color }) => (
          <Card key={label}>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{label}</p>
                <p className="text-2xl font-bold">{value}</p>
              </div>
              <div className={`p-3 bg-${color}-100 rounded-full`}>
                <Icon className={`h-6 w-6 text-${color}-600`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search & Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Filters & Search</CardTitle>
          <CardDescription>Find and manage users easily</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={roleFilter} onValueChange={(val: TRole | 'all') => setRoleFilter(val)}>
              <SelectTrigger className="w-32"><SelectValue placeholder="Role" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="RIDER">Rider</SelectItem>
                <SelectItem value="DRIVER">Driver</SelectItem>
                <SelectItem value="ADMIN">Admin</SelectItem>
              </SelectContent>
            </Select>
            <Select value={blockFilter} onValueChange={(val: 'all' | 'blocked' | 'active') => setBlockFilter(val)}>
              <SelectTrigger className="w-36"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="blocked">Blocked</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>{filteredUsers.length} user(s) found</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User Info</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Block</TableHead>
                <TableHead>Driver Approval</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    No users found
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map(user => (
                  <TableRow key={user._id}>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">{user.name}</span>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Mail className="h-3 w-3" /> {user.email}
                        </span>
                        {user.address && (
                          <span className="text-sm text-muted-foreground flex items-center gap-1">
                            <MapPin className="h-3 w-3" /> {user.address}
                          </span>
                        )}
                      </div>
                    </TableCell>

                    <TableCell>{getRoleBadge(user.role)} {getVehicleInfo(user)}</TableCell>
                    <TableCell>{getBlockStatusBadge(user)}</TableCell>
                    <TableCell>{getDriverApprovalBadge(user)}</TableCell>
                    <TableCell>
                      {user.phone && (
                        <span className="text-sm flex items-center gap-1">
                          <Phone className="h-3 w-3" /> {user.phone}
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {user.role === roles.rider && user?.driverRequest?.status === 'pending' && (
                            <>
                              <DropdownMenuItem onClick={() => handleApproveDriver(user._id, 'approved')}>
                                <CheckCircle className="mr-2 h-4 w-4 text-green-600" /> Approve Driver
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleApproveDriver(user._id, 'rejected')}>
                                <XCircle className="mr-2 h-4 w-4 text-red-600" /> Reject Driver
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                            </>
                          )}

                          {user.isBlocked ? (
                            <DropdownMenuItem onClick={() => handleBlockUser(user._id, false)}>
                              <UserCheck className="mr-2 h-4 w-4 text-green-600" /> Unblock User
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem onClick={() => handleBlockUser(user._id, true)}>
                              <Ban className="mr-2 h-4 w-4 text-red-600" /> Block User
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;
