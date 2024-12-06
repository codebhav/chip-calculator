import withPWA from '@ducanh2912/next-pwa';

const config = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
})({
  reactStrictMode: true,
});

export default config;