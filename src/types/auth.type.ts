import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

export const registerSchema = z.object({
    name: z
        .string()
        .min(4, { message: "Name must be at least 4 characters." }),
    email: z
        .string()
        .email({ message: "Please enter a valid email address." }),
    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters." }),
    confirmPassword: z
        .string()
        .min(6, { message: "Please confirm your password." }),
    role: z
        .enum(["rider", "driver"], {
            required_error: "Please select a role.",
        }),
    phone: z
        .string()
        .min(10, { message: "Please enter a valid phone number." }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;