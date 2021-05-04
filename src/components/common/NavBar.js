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
 * @requires NPM:@material-ui/core
 * @requires ../../theme
 * @requires ../../routes
 */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { find } from 'lodash';

import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

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

  /** The route to the default URL. */
  const root = find(routes, {url: '/'});

  /** URL of the current page to highlight the correct button. */
  const [ selected, setSelected ] = useState(root.url);

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
          {/* This theme overrides the global as long as it is in a Box */}
          <ThemeProvider theme={createTesseraeTheme(navTheme)}>
            <ButtonGroup
              size="small"
            >
              {links}
            </ButtonGroup>
          </ThemeProvider>
        </Box>
      </Toolbar>
    </AppBar>
  );
}


export default NavBar;