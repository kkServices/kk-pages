import Icons from 'unplugin-icons/webpack'

/** @type {import('next').NextConfig} */
export default {
  output: 'standalone',
  reactStrictMode: true,
  experimental: {
    swcMinify: true,
  },
  webpack(config) {
    config.plugins.push(
      Icons({
        compiler: 'jsx',
        jsx: 'react',
      }),
    )
    config.module.rules.push({
      test: /\.ya?ml$/,
      use: 'yaml-loader',
    })

    return config
  },
}
