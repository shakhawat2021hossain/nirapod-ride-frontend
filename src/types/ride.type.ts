import { z } from "zod";

export interface IRide {
  _id: string;
  rider: string;
  startLocation: string;
  endLocation: string;
  fare: number;
  isCancelled: boolean;
  status: 'requested' | 'accepted' | 'in_transit' | 'completed' | 'cancelled';
  requestedAt: string;
  createdAt: string;
  updatedAt: string;
  acceptedAt?: string;
  driver?: string;
  pickedUpAt?: string;
  completedAt?: string;
  driverInfo?: {
    name: string;
    phone: string;
    vehicle: string;
    licensePlate: string;
    rating: number;
  };
}

export const rideSchema = z.object({
  startLocation: z.string().min(3, "Pickup location is required"),
  endLocation: z.string().min(3, "Destination is required"),
  payment: z.enum(["cash", "card", "bkash"]),
});

export type RideFormValues = z.infer<typeof rideSchema>;