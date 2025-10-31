import { z } from "zod";

export const userSchema = z.object({
    name: z.string().min(3, { message: "Name must be string and at least 3 character" }),
    phone: z
        .string()
        .min(10, { message: "Please enter a valid phone number." }),
    
});


export type userFormData = z.infer<typeof userSchema>;