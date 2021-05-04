/**
 * @fileoverview Root application component.
 * 
 * @author [Jeff Kinnison](https://github.com/jeffkinnison)
 * 
 * @exports App
 * 
 * @requires NPM:react
 * @requires NPM:react-router-dom
 * @requires NPM:redux
 * @requires NPM:react-redux
 * @requires NPM:redux-thunk
 * @requires NPM:lodash
 * @requires NPM:@material-ui/core
 * @requires ./components/common/NavBar
 * @requires ./routes
 * @requires ./state
 * @requires ./theme
 */
import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { sortBy } from 'lodash';

import { ThemeProvider } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';

import NavBar from './components/common/NavBar';
import routes from './routes';
import { DEFAULT_STATE, tesseraeReducer } from './state';
import createTesseraeTheme from './theme';


/**
 * Root application component.
 * @component
 * @example
 *   return (
 *     <App />
 *   )
 */
function App() {
  /** Routing components for each page in the app. */
  const appRoutes = sortBy(routes, 'url').reverse().map(item => {
    return <Route key={item.url} path={item.url} component={item.component} />
  });

  /** Initialize internal application state. */
  const store = createStore(
    tesseraeReducer,
    DEFAULT_STATE,
    applyMiddleware(thunk)
  );

  return (
    <CssBaseline>
      <ThemeProvider theme={createTesseraeTheme()}>
        <Provider store={store}>
          <BrowserRouter>
            <Box
              flexDirection="column"
              display="flex"
              height="100vh"
              m={0}
              maxHeight="100vh"
              maxWidth="100vw"
              p={0}
              width={1.0}
            >
              <NavBar />
              <Switch>
                {appRoutes}
              </Switch>
            </Box>
          </BrowserRouter>
        </Provider>
      </ThemeProvider>
    </CssBaseline>
  );
}


export default App;
