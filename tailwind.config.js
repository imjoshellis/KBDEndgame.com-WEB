module.exports = {
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true
  },
  purge: {
    enabled: process.env.PROD,
    content: [
      'pages/**/*.tsx',
      'src/**/*.js',
      'public/**/*.html',
      'src/**/*.jsx',
      'src/**/*.ts',
      'src/**/*.tsx'
    ]
  },
  theme: {
    backdropFilter: {
      // defaults to {}
      none: 'none',
      blur: 'blur(2px)'
    },
    fontWeight: {
      normal: '300',
      medium: '500',
      bold: '700'
    },
    minWidth: {
      0: '0',
      '1/4': '25%',
      '1/3': '33%',
      '1/2': '50%',
      '2/3': '66%',
      '3/4': '75%',
      full: '100%'
    },
    colors: {
      transparent: 'transparent',
      white: '#ffffff',
      black: '#000000',
      debug: '#ff0000',
      surface: {
        50: '#F4F4F4',
        100: '#E9E9E9',
        200: '#C7C7C7',
        300: '#A5A5A5',
        400: '#929292',
        500: '#626262',
        600: '#5F5F5F',
        700: '#3F3F3F',
        800: '#1F1F1F',
        900: '#090909'
      },
      link: {
        50: '#F5FBFD',
        100: '#EBF7FB',
        200: '#CCEAF5',
        300: '#AEDDEE',
        400: '#71C4E2',
        500: '#34AAD5',
        600: '#2F99C0',
        700: '#1F6680',
        800: '#174D60',
        900: '#103340'
      },
      primary: {
        50: '#FEF6F9',
        100: '#FEEDF2',
        200: '#FCD2DF',
        300: '#FAB7CC',
        400: '#F781A5',
        500: '#F34B7F',
        600: '#DB4472',
        700: '#922D4C',
        800: '#6D2239',
        900: '#491726'
      },
      secondary: {
        50: '#F9FAFA',
        100: '#F3F4F6',
        200: '#E1E4E8',
        300: '#CFD3DA',
        400: '#ACB3BE',
        500: '#8892A2',
        600: '#7A8392',
        700: '#525861',
        800: '#3D4249',
        900: '#292C31'
      },
      accent: {
        50: '#F5F4F6',
        100: '#EAEAED',
        200: '#CBCAD3',
        300: '#ABA9B8',
        400: '#6D6983',
        500: '#2E294E',
        600: '#292546',
        700: '#1C192F',
        800: '#151223',
        900: '#0E0C17'
      },
      success: {
        50: '#F6FBF6',
        100: '#EDF8EC',
        200: '#D2EDD0',
        300: '#B7E1B4',
        400: '#81CB7B',
        500: '#4BB543',
        600: '#44A33C',
        700: '#2D6D28',
        800: '#22511E',
        900: '#173614'
      },
      warning: {
        50: '#FFFCF2',
        100: '#FFFAE6',
        200: '#FFF2BF',
        300: '#FFEB99',
        400: '#FFDB4D',
        500: '#FFCC00',
        600: '#E6B800',
        700: '#997A00',
        800: '#735C00',
        900: '#4D3D00'
      },
      danger: {
        50: '#FDF2F6',
        100: '#FCE6EC',
        200: '#F7BFD0',
        300: '#F199B4',
        400: '#E74D7C',
        500: '#DD0044',
        600: '#C7003D',
        700: '#850029',
        800: '#63001F',
        900: '#420014'
      }
    },

    extend: {
      spacing: {
        '1.5': '0.375rem',
        '1px': '1px',
        '2px': '2px',
        '1/2': '50%',
        '1/3': '33.333333%',
        '2/3': '66.666667%',
        '1/4': '25%',
        '2/4': '50%',
        '3/4': '75%',
        '1/5': '20%',
        '2/5': '40%',
        '3/5': '60%',
        '4/5': '80%',
        '1/6': '16.666667%',
        '2/6': '33.333333%',
        '3/6': '50%',
        '4/6': '66.666667%',
        '5/6': '83.333333%',
        '1/12': '8.333333%',
        '2/12': '16.666667%',
        '3/12': '25%',
        '4/12': '33.333333%',
        '5/12': '41.666667%',
        '6/12': '50%',
        '7/12': '58.333333%',
        '8/12': '66.666667%',
        '9/12': '75%',
        '10/12': '83.333333%',
        '11/12': '91.666667%'
      }
    }
  },
  variants: {},
  plugins: [require('tailwindcss-filters')]
}
