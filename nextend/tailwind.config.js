/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',    // Include all files in the `pages` directory
    './components/**/*.{js,ts,jsx,tsx}', // Include all files in the `components` directory
    './app/**/*.{js,ts,jsx,tsx}', // If you have an `app` directory, include it
    './src/**/*.{js,ts,jsx,tsx}',  // If your files are under `src`, include it
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
