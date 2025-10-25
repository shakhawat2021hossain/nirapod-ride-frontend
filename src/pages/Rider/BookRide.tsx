import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { rideSchema, type RideFormValues } from "@/types/ride.type";
import { MapPin, Navigation, Clock, DollarSign, Car, CreditCard, Smartphone } from 'lucide-react';
import { useBookMutation } from "@/redux/features/rider/ride.api";
import { toast } from "sonner";

export default function BookRide() {

  const [book] = useBookMutation()

  const [fare, setFare] = useState<number | null>(null);
  const [estimatedTime, setEstimatedTime] = useState<string>("");
  const [isCalculating, setIsCalculating] = useState(false);

  const form = useForm<RideFormValues>({
    resolver: zodResolver(rideSchema),
    defaultValues: {
      startLocation: "",
      endLocation: "",
      payment: "cash",
    },
  });

  // Enhanced Fare Estimation with realistic calculation
  useEffect(() => {
    const { startLocation, endLocation } = form.getValues();

    if (startLocation && endLocation && startLocation.length > 3 && endLocation.length > 3) {
      setIsCalculating(true);

      // Simulate API call delay
      const timer = setTimeout(() => {
        const baseFare = 60;
        const distanceMultiplier = Math.floor(Math.random() * 40) + 20; // 20-60 Taka
        const timeMultiplier = Math.floor(Math.random() * 20) + 10; // 10-30 Taka
        const estimated = baseFare + distanceMultiplier + timeMultiplier;

        setFare(estimated);

        // Estimate time (5-25 minutes)
        const time = Math.floor(Math.random() * 20) + 5;
        setEstimatedTime(`${time} min`);
        setIsCalculating(false);
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      setFare(null);
      setEstimatedTime("");
    }
  }, [form.watch('startLocation'), form.watch('endLocation')]);

  const onSubmit = async (data: RideFormValues) => {
    try {
      const rideBody = {
        ...data,
        fare,
      };

      // console.log("Sending ride body:", rideBody);

      const result = await book(rideBody).unwrap();
      console.log("Ride booked successfully:", result);

      toast.success("Ride Booked Successfully");
      toast.success("Wait for the rider...");
      form.reset();
      setFare(null);
      setEstimatedTime("");
    } catch (error) {
      console.error("Booking ride failed:", error);
      toast.error("Failed to book ride");
    }
  };




  const paymentMethods = [
    {
      value: "cash",
      label: "Cash",
      icon: DollarSign,
      description: "Pay with cash to driver"
    },
    {
      value: "card",
      label: "Credit Card",
      icon: CreditCard,
      description: "Pay with card securely"
    },
    {
      value: "bkash",
      label: "bKash",
      icon: Smartphone,
      description: "Pay with bKash wallet"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-950 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              Book Your <span className="text-primary">Ride</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Safe, reliable, and affordable rides across the city
            </p>
          </div>

          {/* Main Booking Card */}
          <Card className="shadow-xl border-0">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Car className="h-10 w-10 text-primary" />
              </div>
              <CardTitle className="text-2xl font-bold">Book a Ride</CardTitle>
              <CardDescription className="text-lg">
                Enter your locations to get started
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                  {/* Location Section */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <h3 className="font-semibold text-lg">Location Details</h3>
                    </div>

                    {/* Pickup Location */}
                    <FormField
                      control={form.control}
                      name="startLocation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2 text-base font-medium">
                            <MapPin className="h-5 w-5 text-green-500" />
                            Pickup Location
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your pickup address"
                              {...field}
                              className="h-14 text-lg px-4"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Destination */}
                    <FormField
                      control={form.control}
                      name="endLocation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2 text-base font-medium">
                            <Navigation className="h-5 w-5 text-primary" />
                            Destination
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Where are you going?"
                              {...field}
                              className="h-14 text-lg px-4"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Fare & Time Estimation */}
                  {(fare || isCalculating) && (
                    <div className="bg-gradient-to-r from-primary/10 to-purple-600/10 rounded-xl p-6 border border-primary/20">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <h3 className="font-semibold text-lg">Ride Details</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <div className="text-sm text-muted-foreground mb-2">Estimated Fare</div>
                          <div className="text-3xl font-bold text-primary">
                            {isCalculating ? (
                              <div className="flex items-center justify-center gap-2">
                                <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                              </div>
                            ) : (
                              `৳${fare}`
                            )}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-muted-foreground mb-2">Estimated Time</div>
                          <div className="text-2xl font-bold flex items-center justify-center gap-2">
                            <Clock className="h-5 w-5 text-primary" />
                            {estimatedTime}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Payment Method */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <h3 className="font-semibold text-lg">Payment Method</h3>
                    </div>

                    <FormField
                      control={form.control}
                      name="payment"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              value={field.value}
                              className="grid grid-cols-3 gap-3"
                            >
                              {paymentMethods.map((method) => {
                                const IconComponent = method.icon;
                                const isSelected = field.value === method.value;

                                return (
                                  <div key={method.value}>
                                    <RadioGroupItem value={method.value} id={method.value} className="sr-only" />
                                    <FormLabel
                                      htmlFor={method.value}
                                      className={`flex flex-col items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all h-full ${isSelected
                                          ? 'border-primary bg-primary/5 shadow-md'
                                          : 'border-muted hover:border-muted-foreground/30 hover:bg-muted/50'
                                        }`}
                                    >
                                      <div className={`p-3 rounded-lg mb-2 ${isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                                        }`}>
                                        <IconComponent className="h-6 w-6" />
                                      </div>
                                      <div className="text-center">
                                        <div className="font-semibold text-sm">{method.label}</div>
                                        <div className="text-xs text-muted-foreground mt-1">{method.description}</div>
                                      </div>
                                    </FormLabel>
                                  </div>
                                );
                              })}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <Button
                      type="submit"
                      disabled={!form.formState.isValid || isCalculating}
                      className="w-full py-7 text-lg font-semibold bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg hover:shadow-xl transition-all"
                    >
                      {isCalculating ? (
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Calculating Fare...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-3">
                          <Car className="h-5 w-5" />
                          {fare ? `Book Ride - ৳${fare}` : 'Get Fare Estimate'}
                        </div>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}