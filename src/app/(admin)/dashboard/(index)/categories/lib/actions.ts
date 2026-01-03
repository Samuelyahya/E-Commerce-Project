"use server"

import { CategorySchema } from "@/lib/schema";
import { ActionResult } from "@/types";
import { redirect } from "next/navigation";
import prisma from "../../../../../../../lib/prisma";

export async function postCategory(
    _: unknown,
    formData: FormData
): Promise<ActionResult> {

    const validate = CategorySchema.safeParse({
        name: formData.get('name')
    })

    if (!validate.success) {
        return {
            error: validate.error.issues[0].message
        }
    }

    try {
        await prisma.category.create({
            data: {
                name: validate.data.name
            }
        })
    } catch (error) {
        console.log(error)
        return {
            error: 'Failed to create category'
        }
    }

    return redirect('/dashboard/categories')
}

export async function updateCategory(
    _: unknown,
    formData: FormData,
    id: number | undefined
): Promise<ActionResult> {
    const validate = CategorySchema.safeParse({
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
        await prisma.category.update({
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
            error: 'Failed to update category'
        }
    }

    return redirect('/dashboard/categories')
}

export async function deleteCategory(
    _: unknown,
    formData: FormData,
): Promise<ActionResult> {
    const id = formData.get('id') as string

    try {
        await prisma.category.delete({
            where: {
                id: Number.parseInt(id)
            }
        })
    } catch (error) {
        console.log(error)
        return {
            error: 'Failed to delete category'
        }
    }

    return redirect('/dashboard/categories')
}