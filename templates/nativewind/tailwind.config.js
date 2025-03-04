/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    presets: [require('nativewind/preset')],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: 'rgb(var(--primary))',
                    foreground: 'rgb(var(--primary-foreground))',
                },
                secondary: {
                    DEFAULT: 'rgb(var(--secondary))',
                    foreground: 'rgb(var(--secondary-foreground))',
                },
                accent: {
                    DEFAULT: 'rgb(var(--accent))',
                    foreground: 'rgb(var(--accent-foreground))',
                },
                destructive: {
                    DEFAULT: 'rgb(var(--destructive))',
                    foreground: 'rgb(var(--destructive-foreground))',
                },
                success: {
                    DEFAULT: 'rgb(var(--success))',
                    foreground: 'rgb(var(--success-foreground))',
                },
                background: 'rgb(var(--background))',
                border: 'rgb(var(--border))',
                card: 'rgb(var(--card))',
                notification: 'rgb(var(--notification))',
                text: 'rgb(var(--text))',
            },
        },
    },
    plugins: [],
};
