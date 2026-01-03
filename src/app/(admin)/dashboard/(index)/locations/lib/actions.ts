"use server"

import { LocationSchema } from "@/lib/schema";
import { ActionResult } from "@/types";
import { redirect } from "next/navigation";
import prisma from "../../../../../../../lib/prisma";

export async function postLocation(
    _: unknown,
    formData: FormData
): Promise<ActionResult> {

    const validate = LocationSchema.safeParse({
        name: formData.get('name')
    })

    if (!validate.success) {
        return {
            error: validate.error.issues[0].message
        }
    }

    try {
        await prisma.location.create({
            data: {
                name: validate.data.name
            }
        })
    } catch (error) {
        console.log(error)
        return {
            error: 'Failed to create location'
        }
    }

    return redirect('/dashboard/locations')
}

export async function updateLocation(
    _: unknown,
    formData: FormData,
    id: number | undefined
): Promise<ActionResult> {
    const validate = LocationSchema.safeParse({
        name: formData.get('name')
    })

    if (!validate.success) {
        return {
            error: validate.error.issues[0].message
        }
    }

    if (id === undefined) {
        return {
            error: 'Category ID is required'
        }
    }

    try {
        await prisma.location.update({
            where: {
                id: id
            },
            data: {
                name: validate.data.name
            }
        })
    } catch (error) {
        console.log(error)
        return {
            error: 'Failed to update location'
        }
    }

    return redirect('/dashboard/locations')
}

export async function deleteLocation(
    _: unknown,
    formData: FormData,
): Promise<ActionResult> {
    const id = formData.get('id') as string

    try {
        await prisma.location.delete({
            where: {
                id: Number.parseInt(id)
            }
        })
    } catch (error) {
        console.log(error)
        return {
            error: 'Failed to delete location'
        }
    }

    return redirect('/dashboard/locations')
}