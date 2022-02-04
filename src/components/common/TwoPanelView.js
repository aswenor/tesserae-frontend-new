/**
 * @fileoverview Two-panel view that adjusts to screen width.
 * 
 * @author [Jeff Kinnison](https://github.com/jeffkinnison)
 * 
 * @requires NPM:react
 * @requires NPM:@mui/material
 * @requires ./HorizontalTwoPanelView
 * @requires ./VerticalTwoPanelView
 */
import React from 'react';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import HorizontalTwoPanelView from './HorizontalTwoPanelView';
import VerticalTwoPanelView from './VerticalTwoPanelView';


/**
 * Two-panel view that adjusts to screen width.
 * 
 * @component 
 * @example
 *   return (
 *     <TwoPanelView>
 *       <div><h2>First Panel</h2></div>
 *       <div><h2>Second Panel</h2></div>
 *     </TwoPanelView>
 *   );
 */
function TwoPanelView(props) {
  /** Get the global theme to access breakpoint information. */
  const theme = useTheme();

  /** Determine if the window is medium breakpoint or larger. */
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  // If the window is medium or larger width, use a horizontal layout.
  // Otherwise (e.g., mobile, tablet, etc.), use a vertical layout.
  return (matches
    ? <HorizontalTwoPanelView {...props} />
    : <VerticalTwoPanelView {...props} />
  );
}


export default TwoPanelView;