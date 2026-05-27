/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['keila-arousable-bimolecularly.ngrok-free.dev'],
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'skillicons.dev' },
      { protocol: 'https', hostname: 'framerusercontent.com' },
      { protocol: 'https', hostname: 'mohammadaman.in' },
    ],
  },
};

export default nextConfig;