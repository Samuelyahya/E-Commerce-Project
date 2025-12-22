"use server"

import { SignInSchema } from "@/lib/schema"
import { ActionResult } from "@/types"
import { redirect } from "next/navigation"
import prisma from "../../../../../../../lib/prisma"
import bcrypt from 'bcrypt'
import { lucia } from "@/lib/auth"
import { cookies } from "next/headers"

export async function SignIn(
    _: unknown,
    formData: FormData
): Promise<ActionResult> {

    const validate = SignInSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
    })

    if (!validate.success) {
        // flatten() untuk memecah error berdasarkan field (email, password)
        const flatErrors = validate.error.flatten();

        console.log("Validation Errors:", flatErrors); // Debugging (opsional)

        // Ambil error pertama yang muncul (bisa dari email atau password)
        // fieldErrors bentuknya: { email: ["Email salah"], password: ["Wajib diisi"] }
        const firstErrorField = Object.keys(flatErrors.fieldErrors)[0];
        const errorMessage = flatErrors.fieldErrors[firstErrorField]?.[0];

        return {
            error: errorMessage || "Invalid data"
        }
    }

    const existingUser = await prisma.user.findFirst({
        where: {
            email: validate.data.email,
            role: 'superadmin'
        }
    })

    if (!existingUser) {
        return {
            error: "User not found"
        }
    }

    const comparePassword = bcrypt.compareSync(
        validate.data.password,
        existingUser.password
    )

    if (!comparePassword) {
        return {
            error: "Incorrect email or password"
        }
    }

    const session = await lucia.createSession(existingUser.id, {})
    const sessionCookie = lucia.createSessionCookie(session.id)
    cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
    )

    return redirect("/dashboard")
}