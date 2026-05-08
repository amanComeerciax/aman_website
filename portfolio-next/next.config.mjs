/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['keila-arousable-bimolecularly.ngrok-free.dev'],
  experimental: {
    urlImports: [
      "https://framer.com",
      "https://framerusercontent.com",
    ],
  },
};

export default nextConfig;