/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border, 214.3 31.8% 91.4%))',
        input: 'hsl(var(--input, 214.3 31.8% 91.4%))',
        ring: 'hsl(var(--ring, 222.2 84% 4.9%))',
        background: 'hsl(var(--background, 0 0% 100%))',
        foreground: 'hsl(var(--foreground, 222.2 84% 4.9%))',
        primary: {
          DEFAULT: 'hsl(var(--primary, 222.2 47.4% 11.2%))',
          foreground: 'hsl(var(--primary-foreground, 210 40% 98%))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary, 210 40% 96.1%))',
          foreground: 'hsl(var(--secondary-foreground, 222.2 47.4% 11.2%))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive, 0 84.2% 60.2%))',
          foreground: 'hsl(var(--destructive-foreground, 210 40% 98%))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted, 210 40% 96.1%))',
          foreground: 'hsl(var(--muted-foreground, 215.4 16.3% 46.9%))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent, 210 40% 96.1%))',
          foreground: 'hsl(var(--accent-foreground, 222.2 47.4% 11.2%))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover, 0 0% 100%))',
          foreground: 'hsl(var(--popover-foreground, 222.2 84% 4.9%))',
        },
        card: {
          DEFAULT: 'hsl(var(--card, 0 0% 100%))',
          foreground: 'hsl(var(--card-foreground, 222.2 84% 4.9%))',
        },
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

