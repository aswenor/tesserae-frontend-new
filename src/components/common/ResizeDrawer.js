/**
 * @fileoverview Left drawer with a handle to adjust the width.
 * 
 * @author [Jeff Kinnison](https://github.com/jeffkinnison)
 * 
 * @exports ResizeDrawer
 * 
 * @requires NPM:react
 * @requires NPM:prop-types
 * @requires NPM:@material-ui/core
 */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { Transition } from 'react-transition-group';


/** CSS styles to apply to the component. */
const useStyles = makeStyles(theme => ({
  dragger: {
    backgroundColor: '#ababab',
    borderTop: "1px solid #ddd",
    bottom: 0,
    cursor: props => props.minWidth !== props.maxWidth ? 'ew-resize' : 'pointer',
    height: '100%',
    position: 'absolute',
    right: 0,
    top: 0,
    width: '5px',
    zIndex: theme.zIndex.drawer
  },
  drawer: {
    flexShrink: 0,
    //width: props => `${props.width}px`,
    zIndex: theme.zIndex.drawer
  },
  drawerPaper: {
    backgroundColor: theme.palette.secondary.main,
    height: '100%',
    width: props => `${props.width}px`
  },
  spacer: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
}));


/**
 * Left drawer with a handle to adjust the width.
 * 
 * @component 
 * @example
 *   import { useState } from 'react';
 *   const [ width, setWidth ] = useState(250);
 *   return (
 *     <ResizeDrawer
 *       maxWidth={500}
 *       minWidth={250}
 *       open={true}
 *       setWidth={setWidth}
 *       width={width}
 *     >
 *       <div><h2>Drawer Content</h2></div>
 *     </ResozeDrawer>
 *   );
 */
function ResizeDrawer(props) {
  const { children, maxWidth, minWidth, open, setWidth, width } = props;
  
  /** CSS styles and global theme */
  const classes = useStyles({maxWidth: maxWidth, minWidth: minWidth, open: open, width: width});

  /** Callback to begin monitoring the mouse on click. */
  const handleMouseDown = e => {
    e.preventDefault();
    document.addEventListener('mouseup', handleMouseUp, true);
    document.addEventListener('mousemove', handleMouseMove, true);
  };

  /** Callback to stop monitoring the mouse on release click. */
  const handleMouseUp = e => {
    document.removeEventListener('mouseup', handleMouseUp, true);
    document.removeEventListener('mousemove', handleMouseMove, true);
  };

  /** Callback to update panel width based on mouse position. */
  const handleMouseMove = useCallback(e => {
    const newWidth = e.clientX - document.body.offsetLeft;
    if (newWidth >= minWidth && newWidth <= maxWidth) {
      setWidth(newWidth);
    }
  }, [maxWidth, minWidth, setWidth]);

  const drawerTransitionStyles = {
    entering: {
      transition: 'width 225ms cubic-bezier(0, 0, 0.2, 1)',
      width: width
    },
    entered: {
      width: width
    },
    exiting: {
      transition: 'width 225ms cubic-bezier(0, 0, 0.2, 1)',
      width: 0
    },
    exited: {
      width: 0
    }
  };

  return (
      <Transition in={open} timeout={500}>
        {state => (
          <Drawer
            anchor="left"
            classes={{paper: classes.drawerPaper}}
            className={classes.drawer}
            open={open}
            styles={{
              ...drawerTransitionStyles[state]
            }}
            variant="persistent"
          >
            {/* This ensures that drawer content is below the appbar. */}
            <div className={classes.spacer} />
            {/* This sets up width change logic on the drawer's right border. */}
            <div
              className={classes.dragger}
              onMouseDown={e => handleMouseDown(e)}
            />
            {children}
          </Drawer>
        )
        }
      </Transition>
  );
}


ResizeDrawer.propTypes = {
  /** Maximum width of the drawer in pixels. */
  maxWidth: PropTypes.number,

  /** Maximum width of the drawer in pixels. */
  minWidth: PropTypes.number,

  /** Display the drawer if true, otherwise don't. */
  open: PropTypes.bool,

  /** Callback to update the current width of the drawer. */
  setWidth: PropTypes.func,

  /** Current width of the drawer in pixels. */
  width: PropTypes.number
};


export default ResizeDrawer;