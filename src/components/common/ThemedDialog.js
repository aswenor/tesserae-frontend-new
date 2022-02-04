/**
 * @fileoverview Styled dialog widnow with parameterized content.
 * 
 * @author [Jeff Kinnison](https://github.com/jeffkinnison)
 * 
 * @exports ThemedDialog
 * 
 * @requires NPM:react
 * @requires NPM:prop-types
 * @requires NPM:lodash
 * @requires NPM:@mui/material
 */
import React from 'react';
import PropTypes from 'prop-types';
import { isString } from 'lodash';

import { useTheme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import withStyles from '@mui/styles/withStyles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import IconButton from '@mui/material/IconButton';
import MuiDialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

import CloseIcon from '@mui/icons-material/Close';


/** CSS styles to apply to the component. */
const useStyles = makeStyles(theme => ({
  actions: {
    backgroundColor: theme.palette.secondary.main,
    margin: 0,
    // padding: theme.spacing(1)
  },
  content: {
    backgroundColor: theme.palette.secondary.main,
    maxHeight: '80vh',
    overflowY: 'hidden',
    // paddingBottom: theme.spacing(2),
    // paddingLeft: theme.spacing(2),
    // paddingRight: theme.spacing(2),
  }
}));


/** CSS styles to apply to the custom DialogTitle */
const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.main,
    margin: 0,
    // padding: theme.spacing(2),
    overflowX: 'hidden'
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});


/**
 * Custom DialogTitle with a close button.
 * 
 * @component
 * @example
 *  return (
 *    <DialogTitle
 *      onClose={() => {}}
 *    >
 *      This is a title.
 *    </DialogTitle>
 *  );
 */
const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;

  return (
    <MuiDialogTitle
      className={classes.root}
      disableTypography
      {...other}
    >
      <Typography variant="h6">
        {children}
      </Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
          size="large">
          <CloseIcon />
        </IconButton>
      ): null}
    </MuiDialogTitle>
  );
});


/**
 * Styled dialog widnow with parameterized content.
 * 
 * @component 
 * @example
 *  import Button from '@mui/material/Button';
 *  
 *  const button = (<Button onClick={() => {}}>Done</Button>);
 *  let open = true;
 * 
 *  return (
 *    <ThemedDialog
 *      actions={button}
 *      body="Put interesting content here..."
 *      closeDialog={() => {open = false;}}
 *      maxWidth="md"
 *      open={open}
 *      title="Definitely an interesting title"
 *    />
 *  );
 */
function ThemedDialog(props) {
  const { actions, body, closeDialog, maxWidth, open, scroll, title } = props;

  /** CSS styles and global theme. */
  const classes = useStyles();

  // Get the theme to find the current breakpoint witdth and conditionally set
  // the dialog to be the full screen width.
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <Dialog
      aria-labelledby={`responsive-dialog-${title.toLowerCase().replace(/[\s]/, '-')}`}
      fullScreen={fullScreen}
      fullWidth={true}
      className={classes.root}
      maxWidth={maxWidth ? maxWidth : 'xl'}
      onClose={() => closeDialog()}
      open={open}
      scroll={scroll ? scroll : 'paper'}
    >
      <DialogTitle
        id={`responsive-dialog-${title.toLowerCase().replace(/[\s]/, '-')}`}
        onClose={() => closeDialog()}
      >
        {title}
      </DialogTitle>
      <DialogContent
        className={classes.content}
        dividers
      >
        { isString(body)
          ? <DialogContentText>
              {body}
            </DialogContentText>
          : <div>{body}</div>
        }
      </DialogContent>
      { actions &&
        <DialogActions
          className={classes.actions}
        >
          {actions}
        </DialogActions>
      }
    </Dialog>
  );
}


ThemedDialog.propTypes = {
  /**
   * Buttons to commit some action.
   */
  actions: PropTypes.element,

  /**
   * String or component body of the dialog.
   */
  body: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  
  /**
   * Function to close the dialog on blur (click off) or button click.
   */
  closeDialog: PropTypes.func,

  /**
   * Whether or not the dialog is open.
   */
  open: PropTypes.bool,

  /**
   * Title text for th etop of the dialog.
   */
  title: PropTypes.string
};


export default ThemedDialog;