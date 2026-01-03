import React from 'react'
import { getLocationById } from '../../lib/data'
import { redirect } from 'next/navigation'
import FormLocation from '../../_components/form-location'
import { Tedit } from '@/types'

type Tparams = {
    id: string
}

export default async function EditPage({ params }: Tedit) {
    const data = await getLocationById(params.id)

    if (!data) {
        return redirect('/dashboard/locations')
    }

    return (
        <FormLocation type="EDIT" data={data} />
    )
}
