/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      'white': '#f5f8f8',
      'grey': '#f8f9f8',
      'black': '#382720',
      'brown': '#55463E',
      'ocean': '#387170',
      'sand': '#f0e8e1',
      'clay': '#ac7d53',
    },

    fontFamily: {
      'serif': ['var(--font-marcellus)'],
      'mono': ['var(--font-jost)'],
      'inter': ['var(--font-inter)']

    },
    extend: {

    },
  },
  plugins: [],

  // content: [
  //   './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
  //   './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  //   './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  // ],
  // theme: {
  //   screens: {
  //     sm: '480px',
  //     md: '768px',
  //     lg: '976px',
  //     xl: '1440px',
  //   },
  //   colors: {
  //     'white': '#f5f8f8',
  //     'grey': '#f8f9f8',
  //     'black': '#382720',
  //     'brown': '#55463E',
  //   },

  //   extend: {

  //     backgroundImage: {
  //       'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  //       'gradient-conic':
  //         'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
  //     },
  //   },
  // },
  // plugins: [],
}
