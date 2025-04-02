/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['react-syntax-highlighter'],
  swcMinify: true,
  webpack: (config) => {
    // Handle specific packages that might cause issues
    config.resolve.fallback = { 
      ...config.resolve.fallback,
      fs: false 
    };
    return config;
  },
  reactStrictMode: true,
  env: {
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
}

module.exports = nextConfig