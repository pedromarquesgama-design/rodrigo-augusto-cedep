/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cedep: {
          red: '#D9252A',
          redHover: '#B81D22',
          redLight: '#FEF2F2',
          navy: '#202C70',
          navyHover: '#182157',
          navyLight: '#EEF1FA',
          charcoal: '#17191D',
          surface: '#F4F5F7',
          medium: '#737780',
          border: '#E5E7EB',
        },
        whatsapp: {
          DEFAULT: '#16A34A',
          hover: '#15803D',
          light: '#DCFCE7',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Montserrat', '"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        montserrat: ['Montserrat', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'card': '0 1px 3px rgba(23, 25, 29, 0.05), 0 1px 2px rgba(23, 25, 29, 0.03)',
        'card-hover': '0 12px 24px -6px rgba(32, 44, 112, 0.12), 0 4px 8px -4px rgba(23, 25, 29, 0.06)',
        'header': '0 4px 20px -2px rgba(23, 25, 29, 0.06)',
      }
    },
  },
  plugins: [],
};

