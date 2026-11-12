/** @type {import('tailwindcss').Config} */

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      'black-100': '#000000',
      'black-A80': 'rgba(0, 0, 0, 0.8)',
      'black-A60': 'rgba(0, 0, 0, 0.6)',
      'black-A50': 'rgba(0, 0, 0, 0.5)',
      'black-A40': 'rgba(0, 0, 0, 0.4)',
      'black-A20': 'rgba(0, 0, 0, 0.2)',
      'black-A10': 'rgba(0, 0, 0, 0.1)',
      'black-A5': 'rgba(0, 0, 0, 0.05)',

      'gray-100': '#212121',
      'gray-90': '#353535',
      'gray-80': '#444444',
      'gray-70': '#666666',
      'gray-60': '#999999',
      'gray-50': '#aeaeae',
      'gray-40': '#cccccc',
      'gray-30': '#e7e7e7',
      'gray-20': '#f2f2f2',
      'gray-15': '#f7f7f7',
      'gray-10': '#fafafa',

      'white-100': '#ffffff',
      'white-A95': 'rgba(255, 255, 255, 0.95)',
      'white-A80': 'rgba(255, 255, 255, 0.8)',
      'white-A60': 'rgba(255, 255, 255, 0.6)',
      'white-A50': 'rgba(255, 255, 255, 0.5)',
      'white-A40': 'rgba(255, 255, 255, 0.4)',
      'white-A20': 'rgba(255, 255, 255, 0.2)',
      'white-A10': 'rgba(255, 255, 255, 0.1)',
      'white-A5': 'rgba(255, 255, 255, 0.05)',

      'primary-100': '#164f62',
      'primary-80': '#1b7fb7',
      'primary-50': '#1d9baa',
      'primary-30': '#8ddef2',
      'primary-20': '#b7e1eb',
      'primary-10': '#dbf5fb',
      'primary-5': '#f1fbfd',

      'secondary-100': '#f26131',
      'secondary-30': '#f2cbab',
      'secondary-20': '#fff1e6',

      'tertiary-100': '#54b592',
      'tertiary-30': '#8dd8d3',
      'tertiary-10': '#e1f5f3',

      'error-60': '#f02b2b',
      'error-50': '#f04f4f',
      'error-40': '#f8b0b0',
      'error-20': '#fff1f1',
      'error-10': '#fdeced',

      'warning-50': '#ffc107',
      'warning-40': '#ffe38f',
      'warning-10': '#fffaeb',

      'success-50': '#4bb34b',
      'success-40': '#aeddae',
      'success-20': '#dcf5dc',

      'info-50': '#2787f5',
      'info-40': '#a3bdda',

      'blue-100': '#346cad',
      'blue-80': '#2787f5',
      'blue-A45': 'rgba(52, 108, 173, 0.45)',
      'blue-A40': 'rgba(39, 135, 245, 0.4)',
      'blue-A25': 'rgba(52, 108, 173, 0.25)',
      'blue-A20': 'rgba(39, 135, 245, 0.2)',
      'blue-A10': 'rgba(39, 135, 245, 0.1)',

      'gray-blue-80': '#57717f',
      'gray-blue-70': '#687F8C',
      'gray-blue-60': '#8a9ca6',
      'gray-blue-50': '#c5ced3',
      'gray-blue-30': '#e7ebed',
      'gray-blue-20': '#f2f4f5',

      primary: '#212121', // gray-100
      secondary: '#999999', // gray-60
      action: '#1b7fb7', // primary-80
      success: '#4BB34B', // success-50
      error: '#F04F4F', // error-50
      white: '#FFFFFF', // error-50
      background: '#282c34' //
    },
    fontFamily: {
      formular: ['Formular'],
    },
    fontSize: {
      sm: ['0.75rem !important', { lineHeight: '18px' }], // 12
      md: ['0.875rem !important', { lineHeight: '20px' }], // 14
      lg: '1rem !important', // 16
      xl: '1.125rem !important', // 18
      xxl: '1.25rem !important', // 20
      '3xl': '1.5rem', // 24
      '4xl': '1.75rem', // 28
      '5xl': '2rem', // 32
      '5xxl': '2.5rem',
      '6xl': '3.75rem', // 60
      '8xl': '5rem', // 80
    },
    spacing: {
      0: '0rem',
      0.5: '0.125rem', // 2
      1: '0.25rem', // 4
      1.5: '0.375rem', //6
      2: '0.5rem', // 8
      2.5: '0.625rem', // 10
      3: '0.75rem', // 12
      3.5: '0.875rem', // 14
      4: '1rem', // 16
      4.5: '1.125rem', // 18
      5: '1.25rem', // 20
      5.5: '1.375rem', // 22
      6: '1.5rem', // 24
      6.5: '1.625rem', // 26
      7: '1.75rem', // 28,
      7.5: '1.875rem', //30
      8: '2rem', //32
    },
    fontWeight: {
      normal: '400',
      bold: '700',
    },
    textColor: {
      primary: '#212121', // gray-100
      secondary: '#999999', // gray-60
      action: '#1b7fb7', // primary-80
      success: '#4BB34B', // success-50
      error: '#F04F4F', // error-50
    },
    boxShadow: {
      highlight: '0px 0px 26px rgba(0, 0, 0, 0.1)',
      base: '0px 2px 16px rgba(0, 0, 0, 0.04)',
      tooltip: '0 2px 25px rgba(33, 121, 171, 0.15)',
      none: '0 0 0 0',
    },
    keyframes: {
      popup: {
        '0%': { opacity: '0' },
        '100%': { opacity: '100%' },
      },
      popover: {
        '0%': { opacity: '100%' },
        '100%': { opacity: '0' },
      },
    },
    animation: {
      popup: 'popup .3s ease-in-out 1',
      popover: 'popover .3s ease-in-out 1',
    },
    transitionProperty: {
      height: 'height'
  },
    gridTemplateColumns: {
      default: 'repeat(12, minmax(0, 1fr))',
      12: '100px 100px repeat(10, minmax(0, 1fr))',
      11: 'repeat(11, minmax(0, 1fr))',
      10: 'repeat(10, minmax(0, 1fr))',
      9: 'repeat(9, minmax(0, 1fr))',
      8: 'repeat(8, minmax(0, 1fr))',
      7: 'repeat(7, minmax(0, 1fr))',
      6: 'repeat(6, minmax(0, 1fr))',
      5: 'repeat(5, minmax(0, 1fr))',
      4: 'repeat(4, minmax(0, 1fr))',
      3: 'repeat(3, minmax(0, 1fr))',
      2: 'repeat(2, minmax(0, 1fr))',
      1: 'repeat(1, minmax(0, 1fr))',
    },
    screens: {
      sm: { max: '768px' },
      md: { max: '1080px' },
      lg: { min: '1080px', max: '1280px' },
      xl: { min: '1281px', max: '1401px' },
      xxl: { min: '1401px' },
    },
    extend: {},
  },
  plugins: [],
}
