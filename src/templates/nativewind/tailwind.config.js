/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    presets: [require('nativewind/preset')],
    theme: {
        extend: {
            colors: {
                accent: 'var(--accent)',
                background: 'var(--background)',
                border: 'var(--border)',
                card: 'var(--card)',
                notification: 'var(--notification)',
                primary: 'var(--primary)',
                secondary: 'var(--secondary)',
                text: 'var(--text)',
            },
        },
    },
    plugins: [],
};
