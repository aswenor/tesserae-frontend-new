/**
 * @fileoverview Two-panel layout with adjustable and closeable left panel.
 * 
 * @author [Jeff Kinnison](https://github.com/jeffkinnison)
 * 
 * @exports HorizontalTwoPanelView
 * 
 * @requires NPM:react
 * @requires NPM:prop-types
 * @requires NPM:@material-ui/core
 * @requires NPM:react-transition-group
 * @requires NPM:@material-ui/icons
 * @requires ./ResizeDrawer
 * 
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { CSSTransition as Transition } from 'react-transition-group';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import ResizeDrawer from './ResizeDrawer';


/** CSS styles to apply to the component. */
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  leftSpacer: {
    width: props => props.open ? `${props.width}px` : 0
  },
  rightPanel: {
    width: props => props.open ? `calc(100% - ${props.width}px)` : '100vw'
  },
  toggleButton: {
    backgroundColor: '#aaa',
    border: '#aaa',
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    '&:hover': {
      backgroundColor: '#989898',
    },
    left: props => props.open ? props.width - 4 : 0,
    position: 'absolute',
    top: theme.mixins.toolbar.top,
    zIndex: theme.zIndex.drawer + 1
  }
}));


/**
 * Two-panel layout with adjustable and closeable left panel.
 * 
 * @component
 * @example
 *   return (
 *     <HorizontalTwoPanelView
 *       leftMaxWidth={500}
 *       leftMinWidth={250}
 *     >
 *       <div><h2>Left Side</h2></div>
 *       <div><h2>Right Side</h2></div>
 *     </HorizontalTwoPanelView>
 *   );
 */
function HorizontalTwoPanelView(props) {
  const { children, leftMaxWidth, leftMinWidth, showToggle } = props;

  /** True if the left panel is open, false otherwise. */
  const [ open, setOpen ] = useState(true);

  /** Current width of the left panel, updated by click-drag. */
  const [ width, setWidth ] = useState(leftMinWidth);

  /** Transition states for the toggle button to match the right border. */
  const toggleTransitionStyles = {
    entering: {
      left: width - 4,
      transition: 'left 225ms cubic-bezier(0, 0, 0.2, 1)'
    },
    entered: {
      left: width - 4
    },
    exiting: {
      left: 0,
      transition: 'left 225ms cubic-bezier(0.5, 0.75, 0.76, 1)'
    },
    exited: {
      left: 0
    }
  };

  const rightTransitionStyles = {
    entering: {
      transition: {
        transitionProperty: 'marginLeft, width',
        transitionDuration: '225ms',
        transitionTimingFunction: 'cubic-bezier(0, 0, 0.6, 1)'
      },
      marginLeft: width,
      width: `calc(100% - ${width}px)`
    },
    entered: {
      marginLeft: width,
      width: `calc(100% - ${width}px)`
    },
    exiting: {
      transition: 'marginLeft 225ms cubic-bezier(0, 0, 0.2, 1)',
      marginLeft: 0,
      width: '100vw'
    },
    exited: {
      marginLeft: 0,
      width: '100vw'
    }
  };

  /** CSS styles and global theme. */
  const classes = useStyles({open: open, width: width});

  return (
    <Box
      display="flex"
      height="100%"
      m={0}
      p={0}
      width={1}
    >
      {showToggle &&
        /* Wrap the toggle button so it moves at pace with the panel. */
        <Transition in={open} timeout={500}>
          {/* Update the button style based on where it is in the transition. */}
          {state => (
              <Button
                className={classes.toggleButton}
                color="inherit"
                onClick={e => setOpen(prev => !prev)}
                size="small"
                style={{
                  ...toggleTransitionStyles[state]}}
                variant="outlined"
              >
                {open
                  ? <ChevronLeftIcon />
                  : <ChevronRightIcon />
                }
              </Button>
          )}
        </Transition>
      }
      {/* Display the supplied child components or a dummy by default. */}
      {/* Left panel and content. */}
      <ResizeDrawer
        maxWidth={leftMaxWidth}
        minWidth={leftMinWidth}
        open={open}
        setWidth={setWidth}
        width={width}
      >
        {children ? children[0] : <div />} 
      </ResizeDrawer>
      {/* Right panel and content. */}
      <Transition in={open} timeout={500}>
        {state =>
          <Box
            className={classes.rightPanel}
            display="flex"
            height="100%"
            m={0}
            p={0}
            style={{
              ...rightTransitionStyles[state]
            }}
          >
            {children ? children[1] : <div />}
          </Box>
        }
      </Transition>
    </Box>
  )
}


HorizontalTwoPanelView.propTypes = {
  /** Maximum width of the left panel in pixels. */
  leftMaxWidth: PropTypes.number,

  /** Minimum width of the left panel in pixels. */
  leftMinWidth: PropTypes.number
};


export default HorizontalTwoPanelView;