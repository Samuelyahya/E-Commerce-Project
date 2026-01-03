/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'fkvbtperxtobultaxbhi.supabase.co'
            }
        ]
    }
}
export default nextConfig;
