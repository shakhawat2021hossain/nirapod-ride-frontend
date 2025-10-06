import { z } from "zod";

export const rideSchema = z.object({
  pickup: z.string().min(3, "Pickup location is required"),
  destination: z.string().min(3, "Destination is required"),
  payment: z.enum(["cash", "card", "bkash"]),
});

export type RideFormValues = z.infer<typeof rideSchema>;