/**
 * @fileoverview Full-page loading screen to cover corpus loads.
 * 
 * @author [Jeff Kinnison](https://github.com/jeffkinnison)
 * 
 * @exports LoadingScreen
 * 
 * @requires NPM:react
 * @requires NPM:@material-ui/core
 */
import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';


/** CSS styles to apply to the component. */
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.secondary.main,
    height: '100vh'
  },
  progress: {
    marginTop: theme.spacing(2)
  },
  spacer: {
    height: '25vh'
  }
}));


/**
 * Full-page loading screen to cover corpus loads.
 * @component
 * @example
 *   return (
 *     <LoadingScreen />
 *   );
 */
function LoadingScreen(props) {
  /** CSS styles and global theme. */
  const classes = useStyles();

  return (
    <Grid container
      alignContent="center"
      alignItems="center"
      className={classes.root}
      direction="column"
      justify="center"
    >
      <Grid item xs={4}>
        <div className={classes.spacer}></div>
      </Grid>
      <Grid item xs={4}
        className={classes.spacer}
      >
        <div className={classes.spacer}>
          <Typography variant='h3'>
            Loading Corpus
          </Typography>
          <LinearProgress className={classes.progress} variant="indeterminate" />
        </div>
      </Grid>
      <Grid item xs={4}>
        <div className={classes.spacer}></div>
      </Grid>
    </Grid>
  );
}


export default LoadingScreen;