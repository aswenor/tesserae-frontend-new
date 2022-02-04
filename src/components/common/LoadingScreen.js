/**
 * @fileoverview Full-page loading screen to cover corpus loads.
 * 
 * @author [Jeff Kinnison](https://github.com/jeffkinnison)
 * 
 * @exports LoadingScreen
 * 
 * @requires NPM:react
 * @requires NPM:@mui/material
 */
import React from 'react';

import makeStyles from '@mui/styles/makeStyles';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';


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
      justifyContent="center"
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