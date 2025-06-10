/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./*.{html,js}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            colors: {
                'yt-red': '#FF0000',
                'yt-gray': {
                    100: '#F8F8F8',
                    200: '#E5E5E5',
                    500: '#606060',
                    600: '#404040'
                }
            },
        },
    },
    plugins: [],
} 