import { z } from "zod";

export const loginSchema = z.object({
    mobile: z
        .string()
        .trim()
        .regex(/^[6-9]\d{9}$/, "Invalid mobile number")
});

export const verifyOtpSchema = z.object({
    mobile: z
        .string()
        .trim()
        .regex(/^[6-9]\d{9}$/),

    otp: z
        .string()
        .trim()
        .regex(/^\d{6}$/, "Invalid OTP")
});

export const registerSchema = z.object({

    name: z.string().trim().min(2).max(100),

    // mobile: z
    //     .string()
    //     .trim()
    //     .regex(/^[6-9]\d{9}$/),

    email: z
        .string()
        .trim()
        .email()
        .optional()
        .or(z.literal("")),

    dob: z.string(),

    address: z.string().trim().optional().or(z.literal(""))
});

export const switchSchema = z.object({
    cid: z.number().int().positive()
});