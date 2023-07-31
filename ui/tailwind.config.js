/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
		fontFamily: {
            sans: ['Mark Pro', ...defaultTheme.fontFamily.sans],
        },
		colors: {
			primary: {
				DEFAULT: '#D8D8D8',
				dark: '#A3A4A6',
			},
			secondary: '#25262C',
			accent: {
				DEFAULT: '#C7CC00',
				light: '#E9F7F5',
				dark: '#36454D',
			},
			gray: {
				10: '#1B1C22',
				20: '#25262C',
				30: '#2D2E35',
				40: '#121212',
				50: '#757575',
				60: '#2c2e34',
				70: '#434347',
			},
			green: {
				10: '#2EBD2C',
			},
			red: {
				10: '#EA4848',
			},
		},
		width: {
			'12.5vw': '12.5vw',
		},
		height: {
			'12.5vw': '12.5vw',
		},
		maxWidth: {
			'14': '3.5rem',
			'16': '4rem',
		},
		backgroundImage: {
			'arrow-drop-down': "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 48 48' fill='%23D8D8D8'%3E%3Cpath d='m24 30-10-9.95h20Z'/%3E%3C/svg%3E\")",
		},
		backgroundPosition: {
			'right-4': 'center right 1rem'
		},
	},
  },
  plugins: [],
}
