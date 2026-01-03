"use client";

import React from "react";
import { useFormState, useFormStatus } from "react-dom";
import { deleteCategory } from "../lib/actions";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { ActionResult } from "@/types";

const initialState: ActionResult = {
    error: "",
};

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button variant="destructive" size="sm" type="submit" disabled={pending}>
            <Trash className="w-4 h-4 mr-2" />
            {pending ? 'Deleting...' : 'Delete'}
        </Button>
    );
}

export default function FormDelete({ id }: { id: number }) {
    const [state, formAction] = useFormState(deleteCategory, initialState);

    return (
        <form action={formAction}>
            <input type="hidden" name="id" value={id} />
            <SubmitButton />
        </form>
    );
}
