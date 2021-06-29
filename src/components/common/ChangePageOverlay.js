import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.secondary.main,
    height: '100%'
  },
  progress: {
    marginTop: theme.spacing(2)
  },
  spacer: {
    height: '25%'
  }
}));


/**
 * Full-page loading screen to cover corpus loads.
 * @component
 * @example
 *   return (
 *     <ChangePageOverlay />
 *   );
 */
function ChangePageOverlay(props) {
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
      <Grid item xs={4}>
        <div className={classes.spacer}>
          <Typography
            color="primary"
            variant="h3"
          >
            Loading page...
          </Typography>
          <LinearProgress
            className={classes.progress}
            variant="indeterminate"
          />
        </div>
      </Grid>
      <Grid item xs={4}>
        <div className={classes.spacer}></div>
      </Grid>
    </Grid>
  );
}


export default ChangePageOverlay;