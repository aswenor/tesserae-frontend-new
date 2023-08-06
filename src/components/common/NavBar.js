/**
 * @fileoverview Top navigation bar with overflow dropdown.
 * 
 * @author [Jeff Kinnison](https://github.com/jeffkinnison)
 * 
 * @exports NavBar
 * 
 * @requires NPM:react
 * @requires NPM:react-router-dom
 * @requires NPM:lodash
 * @requires NPM:@mui/material
 * @requires ../../theme
 * @requires ../../routes
 */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { find } from 'lodash';

import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import createTesseraeTheme from '../../theme';
import routes from '../../routes';


/** CSS styles to apply to the component. */
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    zIndex: theme.zIndex.drawer + 100
  },
  button: {
    border: '1px solid #000000',
    boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.3)',
  },
  logo: {
    backgroundColor: '#ffffff',
    border: '1px solid black',
    borderRadius: '5px',
    height: '100%',
    margin: '10px',
    maxHeight: '50px',
    padding: 0,
    width: 'auto',
  }
}));


/** Local theme override for nav button styling. */
const navTheme = {
  palette: {
    default: {
      main: '#ffffff'
    },
    primary: {
      main: '#757575'
    },
    secondary: {
      main: '#757575'
    },
  }
};

/**
 * Top navigation bar with overflow dropdown.
 * 
 * @component 
 * @example
 *   return (
 *     <NavBar />
 *   );
 */
function NavBar(props) {
  /** CSS styles and global theme. */
  const classes = useStyles();

  /** URL of the current page to highlight the correct button. */
  const [ selected, setSelected ] = useState(window.location.pathname);

  /** One link for each route specified to be displayed. */
  const links = routes.filter(item => item.show).map(item => {
    return (
      <Button
        className={classes.button}
        color={item.url === selected ? "secondary" : "default"}
        component={Link}
        key={item.url}
        onClick={e => {setSelected(item.url)}}
        size="small"
        to={item.url}
        variant="contained"
      >
        <Typography variant="button">{item.name}</Typography>
      </Button>
    );
  });

  return (
    <AppBar className={classes.root} position="static">
      <Toolbar>
        {/* The internal Box is necessary to use the local theming. */}
        <Box
          alignContent="flex-end"
          alignItems="flex-end"
          display="flex"
          justifyContent="flex-end"
          justifyItems="flex-end"
          width={1}  
        >
          <Link
            to="/"
          >
            <img 
              alt="Tesserae Version 5"
              className={classes.logo}
              src="Tesserae.png"
            />
          </Link>
          {/* This theme overrides the global as long as it is in a Box */}
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={createTesseraeTheme(navTheme)}>
              <ButtonGroup
                size="small"
              >
                {links}
              </ButtonGroup>
            </ThemeProvider>
          </StyledEngineProvider>
        </Box>
      </Toolbar>
    </AppBar>
  );
}


export default NavBar;