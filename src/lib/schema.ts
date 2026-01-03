import { z } from "zod";

export const ALLOW_MIME_TYPES = ['image/jpeg', 'image/png', 'image/jpg']

export const SignInSchema = z.object({
    email: z.string({ required_error: 'Email is required' }).email({ message: 'Invalid email address' }),
    password: z.string({ required_error: 'Password is required' }).min(6, "Password must be at least 6 characters long"),
});

export const CategorySchema = z.object({
    name: z.string().min(4, "Name must be at least 4 characters long").max(255, "Name must be at most 255 characters long"),
});

export const LocationSchema = z.object({
    name: z.string().min(4, "Name must be at least 4 characters long").max(255, "Name must be at most 255 characters long"),
});

export const BrandSchema = z.object({
    name: z
        .string()
        .min(4, "Name must be at least 4 characters long")
        .max(255, "Name must be at most 255 characters long"),
    image: z
        .any()
        .refine((file: File) => ALLOW_MIME_TYPES.includes(file.type), {
            message: 'Invalid file type'
        })
        .refine((file: File) => file?.name, {
            message: 'File is required'
        })
        .refine((file: File) => file.size <= 1024 * 1024 * 5, {
            message: 'File size must be less than 5MB'
        })
})