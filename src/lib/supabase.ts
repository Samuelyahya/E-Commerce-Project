import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY!

// Create a single supabase client for interacting with your database
const supabase = createClient(supabaseUrl, supabaseKey)

export const getImageURL = (name: string) => {
    const { data: { publicUrl } } = supabase
        .storage
        .from('belanja')
        .getPublicUrl(`public/brands/${name}`)

    return publicUrl
}

export const uploadFile = async (file: File, path: 'brands' | 'products' = 'brands') => {
    const fileType = file.type.split('/')[1]
    const fileName = `${Date.now()}.${fileType}`

    await supabase
        .storage
        .from('belanja')
        .upload(`public/${path}/${fileName}`, file, {
            cacheControl: '3600',
            upsert: false
        })

    return fileName
}

export const deleteFile = async (
    fileName: string,
    path: 'brands' | 'products' = 'brands'
) => {
    await supabase
        .storage
        .from('belanja')
        .remove([`public/${path}/${fileName}`])
}