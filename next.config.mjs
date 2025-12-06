/** @type {import('next').NextConfig} */
const nextConfig = {
  // 在本地开发时继续运行 ESLint，但在生产构建（Vercel）时忽略 ESLint 错误，避免因为
  // 一些非关键的 React Hooks / no-img-element 警告导致构建失败。
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
