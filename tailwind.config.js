/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');
const withMT = require('@material-tailwind/react/utils/withMT');
module.exports = withMT({
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
		'./node_modules/tw-elements-react/dist/js/**/*.js',
	],
	theme: {
		extend: {
			fontFamily: { cursive: ['Dancing Script'] },
		},
	},
	plugins: [
		require('daisyui'),
		require('@tailwindcss/aspect-ratio'),
		require('@tailwindcss/forms'),
		require('tw-elements-react/dist/plugin.cjs'),
		require('@tailwindcss/typography'),
	],
});
