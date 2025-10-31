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
    Edit,
    Key,
    Mail,
    Save,
    X,
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useChangePassMutation, useUpdateUserMutation, useUserInfoQuery } from '@/redux/features/user/user.api';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSchema, type userFormData } from '@/types/user.type';
import { useParams } from 'react-router-dom';
import { roles } from '@/constants/role';
import toast from 'react-hot-toast';
import { changePassSchema, type changePassFormData } from '@/types/auth.type';



const Profile = () => {
    const { data: userInfo } = useUserInfoQuery(undefined)
    // console.log(userInfo)

    const [updateUser] = useUpdateUserMutation()
    const [changePass] = useChangePassMutation()
    const { id } = useParams()

    const form = useForm<userFormData>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            name: userInfo.name || "",
            phone: userInfo.phone || ""
        }
    })
    const passForm = useForm<changePassFormData>({
        resolver: zodResolver(changePassSchema),
        defaultValues: {
            oldPass: "",
            newPass: ""
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



    const handlePasswordSubmit = async(payload: changePassFormData) => {
        // console.log(payload)
        const result = await changePass(payload)
        // console.log(result)
        toast.success(result.data.message || "Password changed Successfully")
        passForm.reset()
        setIsPasswordModalOpen(false);
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

                    {/*TODO: Vehicle Information - Only for drivers */}
                    
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
            <Dialog open={isPasswordModalOpen} onOpenChange={setIsPasswordModalOpen}>
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
                    <Form {...passForm}>
                        <form onSubmit={passForm.handleSubmit(handlePasswordSubmit)} className='space-y-4'>
                            <FormField
                                control={passForm.control}
                                name="oldPass"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Old Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="Enter Old Password"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={passForm.control}
                                name="newPass"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>New Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="Enter New Password"
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

            {/*TODO: Edit Vehicle Modal - Only for drivers */}
            
        </div>
    );
};

export default Profile;