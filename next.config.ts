import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
        'gpcwcbldvvwfuzsuodwk.supabase.co', // Your Supabase storage domain
        'avatars.githubusercontent.com', // For GitHub avatars
        'lh3.googleusercontent.com', // For Google avatars
    ],
  },
};

export default nextConfig;
