import { useBecomeDriverMutation, useUserInfoQuery } from "@/redux/features/user/user.api";
import { becomeDriverSchema, type becomeDriverFormData } from "@/types/auth.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from "../ui/input";
import { useState } from "react";
import { X } from "lucide-react";

const BecomeDriver = () => {
    const [becomeDriver] = useBecomeDriverMutation();
    const { data: user } = useUserInfoQuery(undefined)
    console.log("user", user)
    const [isModalOpen, setIsModalOpen] = useState(false);

    const form = useForm<becomeDriverFormData>({
        resolver: zodResolver(becomeDriverSchema),
        defaultValues: {
            type: "car",
            model: '',
            plateNum: '',
        },
    });

    const onSubmit = async (data: becomeDriverFormData) => {
        console.log('Registration data:', user?.driverRequest?.status);
        if (user?.driverRequest?.status === "pending") {
            toast.error("Already Requested, wait for driver approval")
            return
        }
        try {

            const result = await becomeDriver(data);

            console.log(result)

            toast.success('Submission successful');
            toast.success('Wait For the admin Approval');
            setIsModalOpen(false);
            form.reset();
        } catch (error) {
            toast.error('Something went wrong');
            console.error(error);
        }
    };

    const handleClose = () => {
        setIsModalOpen(false);
        form.reset();
    };

    return (
        <div>
            <Button variant={"outline"} size={"sm"} onClick={() => setIsModalOpen(true)}>Become Driver</Button>


            {/* Modal Overlay */}
            {isModalOpen && (
                <div className="fixed top-0 left-0 right-0 h-screen bg-black/50 backdrop-blur-sm flex justify-center z-50 p-4">
                    <div className="mt-[100px] bg-white rounded-lg w-full max-w-md shadow-xl max-h-[60vh]">


                        {/* Modal Header */}
                        <div className="flex justify-between items-center p-4 border-b">
                            <h2 className="text-xl font-semibold">Become a Driver</h2>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleClose}
                                className="h-8 w-8 p-0"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>

                        {/* Modal Content */}
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-4">
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold">Vehicle Information</h3>

                                    <FormField
                                        control={form.control}
                                        name="type"
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormLabel>Vehicle Type</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Select vehicle type" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="car">Car</SelectItem>
                                                        <SelectItem value="bike">Bike</SelectItem>
                                                        <SelectItem value="auto">Auto</SelectItem>
                                                        <SelectItem value="cng">CNG</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="model"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Vehicle Model</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="e.g., Toyota Axio, Yamaha R15" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="plateNum"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Plate Number</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter your vehicle plate number" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="flex justify-end space-x-2 pt-4">
                                    <Button type="button" variant="outline" onClick={handleClose}>
                                        Cancel
                                    </Button>
                                    <Button type="submit">
                                        Submit Application
                                    </Button>
                                </div>
                            </form>
                        </Form>

                    </div>
                </div>
            )}
        </div>
    );
};

export default BecomeDriver;