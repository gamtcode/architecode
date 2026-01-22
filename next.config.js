/**
 * Next.js Configuration - Static Export Mode
 *
 * This project deploys to shared hosting (HostGator) without Node.js runtime.
 * Static export generates a fully pre-rendered /out directory.
 *
 * @see https://nextjs.org/docs/app/building-your-application/deploying/static-exports
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
    // Generates static HTML/CSS/JS in /out directory
    output: 'export',

    // Required for static export — no Image Optimization API available
    images: {
        unoptimized: true,
    },
};

module.exports = nextConfig;
