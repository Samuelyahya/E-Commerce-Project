"use client";

import React from "react";
import { useFormState, useFormStatus } from "react-dom";
import { deleteBrand } from "../lib/actions";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { ActionResult } from "@/types";

const initialState: ActionResult = {
    error: "",
};

interface FormDeleteProps {
    id: number;
}

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button variant="destructive" size="sm" type="submit" disabled={pending}>
            <Trash className="w-4 h-4 mr-2" />
            {pending ? 'Deleting...' : 'Delete'}
        </Button>
    );
}

export default function FormDelete({ id }: FormDeleteProps) {
    const deleteBrandWithId = (_: unknown, formData: FormData) => deleteBrand(_, formData, id)

    const [state, formAction] = useFormState(deleteBrandWithId, initialState);

    return (
        <form action={formAction}>
            <input type="hidden" name="id" value={id} />
            <SubmitButton />
        </form>
    );
}
