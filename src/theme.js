/**
 * @fileoverview Global theming for Tesserae.
 * 
 * @author [Jeff Kinnison](https://github.com/jeffkinnison)
 * 
 * 
 */

 
import { createTheme, responsiveFontSizes, adaptV4Theme } from '@mui/material/styles';


const DEFAULT_THEME = {
  palette: {
    default: {
      light: '#ffffff',
      main: '#ffffff',
    },
    primary: {
      main: '#f69417'
    },
    secondary: {
      main: '#fdead1'
    }
  },
  spacing: 8,
  typography: {
    fontFamily: [
      'Futura',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(',')
  },
}


export default function createTesseraeTheme(userOptions) {
  const theme = createTheme(adaptV4Theme({...DEFAULT_THEME, ...userOptions}));
  return responsiveFontSizes(theme);
}
