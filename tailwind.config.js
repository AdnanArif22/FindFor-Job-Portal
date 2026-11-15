/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#F0F3F8',
          100: '#D9E0EC',
          200: '#B0C0D7',
          300: '#7E99BD',
          400: '#4F729F',
          500: '#2A4D7C',
          600: '#1D365C',
          700: '#172B49',
          800: '#14213D', // Primary Brand Color
          900: '#0C1527',
          950: '#070C17',
        },
        teal: {
          50: '#E8F8F7',
          100: '#C7EFEF',
          200: '#94E0DE',
          300: '#5ACCC9',
          400: '#2BB5B1',
          500: '#16A6A1', // Accent Brand Color
          600: '#118682',
          700: '#106A68',
          800: '#115453',
          900: '#124545',
          950: '#072728',
        },
        amber: {
          50: '#FEF7EE',
          100: '#FDECD7',
          200: '#FBD8AE',
          300: '#F7BD7E',
          400: '#F4A261', // Highlight Brand Color
          500: '#EA7C31',
          600: '#D95F22',
          700: '#B4451C',
          800: '#90381D',
          900: '#752F1B',
          950: '#3F160A',
        },
        surface: {
          DEFAULT: '#F7F9FC', // Soft Off-White Background
          50: '#FFFFFF',
          100: '#F7F9FC',
          200: '#EEF2F6',
          300: '#E2E8F0',
          400: '#CBD5E1',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'soft-sm': '0 1px 3px rgba(20, 33, 61, 0.05), 0 1px 2px rgba(20, 33, 61, 0.03)',
        'soft': '0 4px 16px -2px rgba(20, 33, 61, 0.06), 0 2px 6px -1px rgba(20, 33, 61, 0.03)',
        'soft-lg': '0 10px 25px -3px rgba(20, 33, 61, 0.08), 0 4px 10px -2px rgba(20, 33, 61, 0.04)',
        'soft-xl': '0 20px 35px -5px rgba(20, 33, 61, 0.1), 0 8px 16px -4px rgba(20, 33, 61, 0.04)',
      }
    },
  },
  plugins: [],
}
