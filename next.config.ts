import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  allowedDevOrigins: ['localhost', '192.168.15.2', '*'],
};

export default nextConfig;
