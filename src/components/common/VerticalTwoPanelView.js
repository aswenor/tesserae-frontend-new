/** 
 * @fileoverview Vertical two-panel layout.
 * 
 * @author [Jeff Kinnison](https://github.com/jeffkinnison)
 * 
 * @exports VerticalTwoPanelView
 * 
 * @requires NPM:react
 * @requires NPM:@mui/material
 */
import React from 'react';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

/**
 * Vertical two-panel layout.
 * 
 * @component 
 * @example
 *   return (
 *     <VerticalTwoPanelView>
 *       <div><h2>Top Panel</h2></div>
 *       <div><h2>Bottom Panel</h2></div>
 *     </VerticalTwoPanelView>
 *   );
 */
function VerticalTwoPanelView(props) {
  const { children } = props;

  return (
    <Box
      alignContent="flex"
      alignItems="flex-start"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      m={0}
      p={0}
      width={1}
    >
      {/* Display the supplied child components or a dummy by default. */}
      {/* Top panel and content. */}
      <Box
        width={1}
      >
        {children ? children[0] : <div />}
      </Box>
      <Divider
        flexItem={true}
        light={true}
        orientation="horizontal"
        variant="fullWidth"
      />
      {/* Bottom Panel and content. */}
      <Box
        width={1}
      >
        {children ? children[1] : <div />}
      </Box>
    </Box>
  );
}


export default VerticalTwoPanelView;