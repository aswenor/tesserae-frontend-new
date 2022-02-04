import React from 'react';

import makeStyles from '@mui/styles/makeStyles';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';


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
      justifyContent="center"
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