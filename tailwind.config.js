/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        lightBg: '#F5F7FA',
        lightCard: '#FFFFFF',
        lightPrimary: '#2563EB',
        lightSecondary: '#14B8A6',
        lightTextPrimary: '#1E293B',
        lightTextSecondary: '#475569',
        lightAccent: '#F59E0B',
        darkBg: '#0F172A',
        darkCard: '#1E293B',
        darkPrimary: '#3B82F6',
        darkSecondary: '#2DD4BF',
        darkTextPrimary: '#F8FAFC',
        darkTextSecondary: '#CBD5E1',
        darkAccent: '#FACC15',
      },
      transitionDuration: {
        '300': '300ms',
      },
      transitionTimingFunction: {
        'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
