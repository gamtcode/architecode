/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#3A5A7A',
                secondary: '#B0B9C2',
                accent: '#00C1D4',
            },
            fontFamily: {
                heading: ['var(--font-montserrat)', 'sans-serif'],
                body: ['var(--font-open-sans)', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
