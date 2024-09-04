/** @type {import('next').NextConfig} */
module.exports = {
  webpack: (config) => config,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '**'
      }
    ]
  }
}
