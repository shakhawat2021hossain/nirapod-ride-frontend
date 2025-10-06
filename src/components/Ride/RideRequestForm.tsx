import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MapPin, Clock, DollarSign, Car, Shield, Zap, CreditCard, Wallet } from 'lucide-react';

interface RideRequestFormProps {
    onRideRequest?: (rideData: RideRequestData) => void;
}

export interface RideRequestData {
    pickup: string;
    destination: string;
    rideType: 'economy' | 'comfort' | 'premium';
    paymentMethod: 'card' | 'cash' | 'wallet';
    estimatedFare: number;
    estimatedTime: string;
}

const RideRequestForm = ({ onRideRequest }: RideRequestFormProps) => {
    const [pickup, setPickup] = useState('');
    const [destination, setDestination] = useState('');
    const [rideType, setRideType] = useState<'economy' | 'comfort' | 'premium'>('economy');
    const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash' | 'wallet'>('card');
    const [estimatedFare, setEstimatedFare] = useState(0);
    const [estimatedTime, setEstimatedTime] = useState('');

    // Ride type options
    const rideTypes = [
        {
            id: 'economy',
            name: 'Economy',
            icon: Car,
            description: 'Affordable everyday rides',
            priceMultiplier: 1,
            features: ['4 seats', 'Standard comfort', 'Great value']
        },
        {
            id: 'comfort',
            name: 'Comfort',
            icon: Shield,
            description: 'Extra legroom & top-rated drivers',
            priceMultiplier: 1.5,
            features: ['4 seats', 'Extra comfort', 'Top drivers']
        },
        {
            id: 'premium',
            name: 'Premium',
            icon: Zap,
            description: 'Luxury vehicles & premium experience',
            priceMultiplier: 2,
            features: ['4 seats', 'Luxury vehicles', 'Priority pickup']
        }
    ];

    // Payment methods
    const paymentMethods = [
        {
            id: 'card',
            name: 'Credit/Debit Card',
            icon: CreditCard,
            description: 'Pay with your card'
        },
        {
            id: 'wallet',
            name: 'E-Wallet',
            icon: Wallet,
            description: 'Pay from your wallet balance'
        },
        {
            id: 'cash',
            name: 'Cash',
            icon: DollarSign,
            description: 'Pay with cash to driver'
        }
    ];

    // Calculate fare based on distance and ride type
    useEffect(() => {
        if (pickup && destination) {
            // Simulate fare calculation based on distance and ride type
            const baseFare = 5; // Base fare
            const distanceFare = Math.random() * 15 + 5; // Simulated distance-based fare
            const selectedRideType = rideTypes.find(rt => rt.id === rideType);
            const totalFare = (baseFare + distanceFare) * (selectedRideType?.priceMultiplier || 1);

            setEstimatedFare(Number(totalFare.toFixed(2)));

            // Simulate estimated time (5-25 minutes)
            const time = Math.floor(Math.random() * 20) + 5;
            setEstimatedTime(`${time} min`);
        } else {
            setEstimatedFare(0);
            setEstimatedTime('');
        }
    }, [pickup, destination, rideType]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!pickup || !destination) {
            alert('Please enter both pickup and destination locations');
            return;
        }

        const rideData: RideRequestData = {
            pickup,
            destination,
            rideType,
            paymentMethod,
            estimatedFare,
            estimatedTime
        };

        console.log('Ride request:', rideData);
        onRideRequest?.(rideData);

        // Simulate successful ride request
        alert(`Ride requested successfully! Your ${rideType} ride will arrive in ${estimatedTime}`);
    };

    const selectedRideType = rideTypes.find(rt => rt.id === rideType);

    return (
        <Card className="w-full max-w-md mx-auto shadow-xl border-0">
            <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
                    <Car className="h-6 w-6 text-primary" />
                    Book Your Ride
                </CardTitle>
                <CardDescription>
                    Get where you need to go, safely and reliably
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Pickup Location */}
                    <div className="space-y-2">
                        <Label htmlFor="pickup" className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-primary" />
                            Pickup Location
                        </Label>
                        <Input
                            id="pickup"
                            type="text"
                            placeholder="Enter pickup address"
                            value={pickup}
                            onChange={(e) => setPickup(e.target.value)}
                            className="w-full"
                        />
                    </div>

                    {/* Destination */}
                    <div className="space-y-2">
                        <Label htmlFor="destination" className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-green-500" />
                            Destination
                        </Label>
                        <Input
                            id="destination"
                            type="text"
                            placeholder="Where are you going?"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            className="w-full"
                        />
                    </div>

                    {/* Fare Estimation */}
                    {(estimatedFare > 0 && estimatedTime) && (
                        <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium">Estimated Fare:</span>
                                <span className="text-lg font-bold text-primary">${estimatedFare}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm text-muted-foreground">
                                <span>Estimated Time:</span>
                                <span className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    {estimatedTime}
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Ride Type Selection */}
                    <div className="space-y-3">
                        <Label className="text-base font-semibold">Choose Your Ride</Label>
                        <RadioGroup value={rideType} onValueChange={(value: 'economy' | 'comfort' | 'premium') => setRideType(value)} className="space-y-3">
                            {rideTypes.map((type) => {
                                const IconComponent = type.icon;
                                const isSelected = rideType === type.id;

                                return (
                                    <div key={type.id}>
                                        <RadioGroupItem value={type.id} id={type.id} className="sr-only" />
                                        <Label
                                            htmlFor={type.id}
                                            className={`flex items-start gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${isSelected
                                                    ? 'border-primary bg-primary/5'
                                                    : 'border-muted hover:border-muted-foreground/30'
                                                }`}
                                        >
                                            <div className={`p-2 rounded-lg ${isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted'
                                                }`}>
                                                <IconComponent className="h-4 w-4" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <div className="font-semibold">{type.name}</div>
                                                        <div className="text-sm text-muted-foreground">{type.description}</div>
                                                    </div>
                                                    {estimatedFare > 0 && (
                                                        <div className="text-sm font-semibold">
                                                            ${(estimatedFare * type.priceMultiplier).toFixed(2)}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex gap-2 mt-2">
                                                    {type.features.map((feature, index) => (
                                                        <span
                                                            key={index}
                                                            className="text-xs bg-muted px-2 py-1 rounded-full"
                                                        >
                                                            {feature}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </Label>
                                    </div>
                                );
                            })}
                        </RadioGroup>
                    </div>

                    {/* Payment Method */}
                    <div className="space-y-3">
                        <Label className="text-base font-semibold">Payment Method</Label>
                        <RadioGroup value={paymentMethod} onValueChange={(value: 'card' | 'cash' | 'wallet') => setPaymentMethod(value)} className="space-y-3">
                            {paymentMethods.map((method) => {
                                const IconComponent = method.icon;
                                const isSelected = paymentMethod === method.id;

                                return (
                                    <div key={method.id}>
                                        <RadioGroupItem value={method.id} id={method.id} className="sr-only" />
                                        <Label
                                            htmlFor={method.id}
                                            className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${isSelected
                                                    ? 'border-primary bg-primary/5'
                                                    : 'border-muted hover:border-muted-foreground/30'
                                                }`}
                                        >
                                            <div className={`p-2 rounded-lg ${isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted'
                                                }`}>
                                                <IconComponent className="h-4 w-4" />
                                            </div>
                                            <div>
                                                <div className="font-semibold">{method.name}</div>
                                                <div className="text-sm text-muted-foreground">{method.description}</div>
                                            </div>
                                        </Label>
                                    </div>
                                );
                            })}
                        </RadioGroup>
                    </div>

                    {/* Final Fare Display */}
                    {estimatedFare > 0 && selectedRideType && (
                        <div className="bg-gradient-to-r from-primary/10 to-purple-600/10 rounded-lg p-4 text-center">
                            <div className="text-sm text-muted-foreground">Total Fare</div>
                            <div className="text-2xl font-bold text-primary">
                                ${(estimatedFare * selectedRideType.priceMultiplier).toFixed(2)}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                                {selectedRideType.name} • {estimatedTime} • {paymentMethod === 'cash' ? 'Pay with cash' : 'Pay with ' + paymentMethod}
                            </div>
                        </div>
                    )}

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        disabled={!pickup || !destination || estimatedFare === 0}
                        className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
                    >
                        {estimatedFare > 0 ? (
                            <>Request {selectedRideType?.name} Ride - ${(estimatedFare * (selectedRideType?.priceMultiplier || 1)).toFixed(2)}</>
                        ) : (
                            'Enter Locations to Continue'
                        )}
                    </Button>
                </form>

                {/* Additional Info */}
                <div className="text-center text-xs text-muted-foreground space-y-1">
                    <p>✓ 24/7 customer support</p>
                    <p>✓ Live ride tracking</p>
                    <p>✓ Safety features included</p>
                </div>
            </CardContent>
        </Card>
    );
};

export default RideRequestForm;