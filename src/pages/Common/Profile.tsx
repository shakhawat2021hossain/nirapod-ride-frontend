import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    User,
    Phone,
    Shield,
    Car,
    Edit,
    Key,
    Mail,
    Save,
    X,
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useUpdateUserMutation, useUserInfoQuery } from '@/redux/features/user/user.api';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSchema, type userFormData } from '@/types/user.type';
import { useParams } from 'react-router-dom';
import { roles } from '@/constants/role';
import toast from 'react-hot-toast';



const Profile = () => {
    const { data: userInfo } = useUserInfoQuery(undefined)
    console.log(userInfo)
    const [updateUser] = useUpdateUserMutation()
    const { id } = useParams()

    const form = useForm<userFormData>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            name: userInfo.name || "",
            phone: userInfo.phone || ""
        }
    })

    const onSubmit = async (payload: userFormData) => {
        console.log(payload)
        const result = await updateUser({id, payload})
        console.log(result)
        toast.success("Udated successfully!")
        setIsEditModalOpen(false);
    }

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [isVehicleModalOpen, setIsVehicleModalOpen] = useState(false);



    const [passwordForm, setPasswordForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [vehicleForm, setVehicleForm] = useState({
        model: userInfo.vehicleInfo.model,
        plateNum: userInfo.vehicleInfo.plateNum,
        type: userInfo.vehicleInfo.type,
        year: userInfo.vehicleInfo?.year || "2025", 
    });


    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Add API call to change password
        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            alert("New passwords don't match!");
            return;
        }
        console.log('Changing password...', passwordForm);
        setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
        setIsPasswordModalOpen(false);
    };

    const handleVehicleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Add API call to update vehicle details

        setIsVehicleModalOpen(false);
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto my-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold">Profile Management</h1>
                    <p className="text-muted-foreground">
                        Manage your personal information and vehicle details
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Personal Information */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Basic Information Card */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="flex items-center gap-2">
                                    <User className="h-5 w-5 text-blue-500" />
                                    Personal Information
                                </CardTitle>
                                <CardDescription>
                                    Your basic profile information
                                </CardDescription>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    setIsEditModalOpen(true);
                                }}
                                className="gap-2"
                            >
                                <Edit className="h-4 w-4" />
                                Edit
                            </Button>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-sm text-muted-foreground">Full Name</Label>
                                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                                        <User className="h-4 w-4 text-muted-foreground" />
                                        <span className="font-medium">{userInfo.name}</span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-sm text-muted-foreground">Email</Label>
                                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                                        <Mail className="h-4 w-4 text-muted-foreground" />
                                        <span className="font-medium">{userInfo.email}</span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-sm text-muted-foreground">Phone Number</Label>
                                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                                        <Phone className="h-4 w-4 text-muted-foreground" />
                                        <span className="font-medium">{userInfo?.phone}</span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-sm text-muted-foreground">Role</Label>
                                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                                        <Shield className="h-4 w-4 text-muted-foreground" />
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium capitalize">{userInfo?.role}</span>
                                            <Badge variant="secondary">
                                                {userInfo.role === roles.driver ? 'DRIVER' : 'RIDER'}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Vehicle Information - Only for drivers */}
                    {userInfo?.role === roles.driver && (
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle className="flex items-center gap-2">
                                        <Car className="h-5 w-5 text-green-500" />
                                        Vehicle Information
                                    </CardTitle>
                                    <CardDescription>
                                        Your registered vehicle details
                                    </CardDescription>
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        setVehicleForm(userInfo.vehicle);
                                        setIsVehicleModalOpen(true);
                                    }}
                                    className="gap-2"
                                >
                                    <Edit className="h-4 w-4" />
                                    Edit
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label className="text-sm text-muted-foreground">Vehicle Model</Label>
                                            <div className="p-3 bg-muted/50 rounded-lg">
                                                <span className="font-medium">{userInfo.vehicleInfo.model}</span>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="text-sm text-muted-foreground">License Plate</Label>
                                            <div className="p-3 bg-muted/50 rounded-lg">
                                                <span className="font-medium">{userInfo.vehicleInfo.plateNum}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label className="text-sm text-muted-foreground">Color</Label>
                                            <div className="p-3 bg-muted/50 rounded-lg">
                                                <span className="font-medium capitalize">{userInfo.vehicleInfo.type}</span>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="text-sm text-muted-foreground">Year</Label>
                                            <div className="p-3 bg-muted/50 rounded-lg">
                                                <span className="font-medium">{userInfo?.vehicleInfo?.year || "2025"}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Actions Sidebar */}
                <div className="space-y-6">
                    {/* Security Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Key className="h-5 w-5 text-orange-500" />
                                Security
                            </CardTitle>
                            <CardDescription>
                                Manage your account security
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Button
                                variant="outline"
                                className="w-full justify-start gap-2"
                                onClick={() => setIsPasswordModalOpen(true)}
                            >
                                <Key className="h-4 w-4" />
                                Change Password
                            </Button>

                            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                                <p className="text-sm text-green-800">
                                    Last password change: 2 weeks ago
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Account Status */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm">Account Status</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Verification</span>
                                <Badge variant="default" className="bg-green-500">
                                    Verified
                                </Badge>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Status</span>
                                <Badge variant="secondary">Active</Badge>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Member since</span>
                                <span className="text-sm font-medium">Jan 2024</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Edit Profile Modal */}
            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Edit className="h-5 w-5" />
                            Edit Profile
                        </DialogTitle>
                        <DialogDescription>
                            Update your personal information
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="string"
                                                placeholder="Enter your name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="string"
                                                placeholder="Enter your phone"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <DialogFooter>
                                <Button type="button" variant="outline" onClick={() => setIsEditModalOpen(false)}>
                                    <X className="h-4 w-4 mr-2" />
                                    Cancel
                                </Button>
                                <Button type="submit">
                                    <Save className="h-4 w-4 mr-2" />
                                    Save Changes
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>

            {/* Change Password Modal */}
            {/* <Dialog open={isPasswordModalOpen} onOpenChange={setIsPasswordModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Key className="h-5 w-5" />
                            Change Password
                        </DialogTitle>
                        <DialogDescription>
                            Enter your current password and set a new one
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handlePasswordSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="currentPassword">Current Password</Label>
                            <div className="relative">
                                <Input
                                    id="currentPassword"
                                    type={showCurrentPassword ? "text" : "password"}
                                    value={passwordForm.currentPassword}
                                    onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                                    placeholder="Enter current password"
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                >
                                    {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="newPassword">New Password</Label>
                            <div className="relative">
                                <Input
                                    id="newPassword"
                                    type={showNewPassword ? "text" : "password"}
                                    value={passwordForm.newPassword}
                                    onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                                    placeholder="Enter new password"
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                >
                                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm New Password</Label>
                            <div className="relative">
                                <Input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={passwordForm.confirmPassword}
                                    onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                                    placeholder="Confirm new password"
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </Button>
                            </div>
                        </div>

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setIsPasswordModalOpen(false)}>
                                <X className="h-4 w-4 mr-2" />
                                Cancel
                            </Button>
                            <Button type="submit">
                                <Save className="h-4 w-4 mr-2" />
                                Update Password
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog> */}

            {/* Edit Vehicle Modal - Only for drivers */}
            {userInfo.role === roles.driver && (
                <Dialog open={isVehicleModalOpen} onOpenChange={setIsVehicleModalOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                                <Car className="h-5 w-5" />
                                Edit Vehicle Details
                            </DialogTitle>
                            <DialogDescription>
                                Update your vehicle information
                            </DialogDescription>
                        </DialogHeader>

                        <form onSubmit={handleVehicleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="model">Vehicle Model</Label>
                                    <Input
                                        id="model"
                                        value={vehicleForm.model}
                                        onChange={(e) => setVehicleForm(prev => ({ ...prev, model: e.target.value }))}
                                        placeholder="e.g., Toyota Corolla"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="licensePlate">License Plate</Label>
                                    <Input
                                        id="licensePlate"
                                        value={vehicleForm.plateNum}
                                        onChange={(e) => setVehicleForm(prev => ({ ...prev, licensePlate: e.target.value }))}
                                        placeholder="e.g., DHA-12345"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="color">Type</Label>
                                    <Input
                                        id="color"
                                        value={vehicleForm.type}
                                        onChange={(e) => setVehicleForm(prev => ({ ...prev, color: e.target.value }))}
                                        placeholder="e.g., White"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="year">Year</Label>
                                    <Input
                                        id="year"
                                        value={vehicleForm.year}
                                        onChange={(e) => setVehicleForm(prev => ({ ...prev, year: e.target.value }))}
                                        placeholder="e.g., 2022"
                                    />
                                </div>
                            </div>

                            <DialogFooter>
                                <Button type="button" variant="outline" onClick={() => setIsVehicleModalOpen(false)}>
                                    <X className="h-4 w-4 mr-2" />
                                    Cancel
                                </Button>
                                <Button type="submit">
                                    <Save className="h-4 w-4 mr-2" />
                                    Save Changes
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
};

export default Profile;