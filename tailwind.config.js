import daisyui from "./node_modules/daisyui";

/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
	],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
		},
	},
	plugins: [require("tailwindcss-animate"), daisyui],
	daisyui: {
		themes: [
			"dark",
			"light",
			"forest",
			{
				lotteryOnline: {
					primary: "#8a2be2",
					"primary-focus": "#6a0dad",
					"primary-content": "#ffffff",

					secondary: "#7b68ee",
					"secondary-focus": "#483d8b",
					"secondary-content": "#ffffff",

					accent: "#9370db",
					"accent-focus": "#7a378b",
					"accent-content": "#ffffff",

					neutral: "#2e2e2e",
					"neutral-focus": "#1c1c1c",
					"neutral-content": "#ffffff",

					"base-100": "#121212",
					"base-200": "#1c1c1c",
					"base-300": "#2e2e2e",
					"base-content": "#ffffff",

					info: "#4b0082",
					success: "#32cd32",
					warning: "#ff8c00",
					error: "#ff6347",

					"--rounded-box": "1rem",
					"--rounded-btn": ".5rem",
					"--rounded-badge": "1.9rem",

					"--animation-btn": ".25s",
					"--animation-input": ".2s",

					"--btn-text-case": "uppercase",
					"--navbar-padding": ".5rem",
					"--border-btn": "1px",
				},
			},
		],
		darkTheme: "dark", // name of one of the included themes for dark mode
		base: true, // applies background color and foreground color for root element by default
		styled: true, // include daisyUI colors and design decisions for all components
		utils: true, // adds responsive and modifier utility classes
		prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
		logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
		themeRoot: ":root", // The element that receives theme color CSS variables
	},
};
