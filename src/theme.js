/**
 * @fileoverview Global theming for Tesserae.
 * 
 * @author [Jeff Kinnison](https://github.com/jeffkinnison)
 * 
 * 
 */

 
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';


const DEFAULT_THEME = {
  palette: {
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
  const theme = createMuiTheme({...DEFAULT_THEME, ...userOptions});
  return responsiveFontSizes(theme);
}
