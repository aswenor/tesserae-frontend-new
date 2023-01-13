/**
 * @fileoverview Page with tutorial for Tesserae project
 * 
 * @author [Abby Swenor](https://github.com/aswenor)
 * 
 * @exports Tutorial
 * 
 * @requires NPM:react
 * @requires NPM:@mui/material
 * @requires ../common/PageContainer
 */
import React from 'react';

import makeStyles from '@mui/styles/makeStyles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import PageContainer from '../common/PageContainer';


/** CSS styles to apply to the page */
const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: '#fdead1',
    display: 'flex',
    overflow: 'auto',
    [theme.breakpoints.up('md')]: {
      height: '90vh',
      marginLeft: theme.spacing(3),
      marginRight: theme.spacing(3),
      marginTop: theme.spacing(3),
      padding: theme.spacing(2),
    },
    [theme.breakpoints.down('lg')]: {
      height: '100%'
    }
  }
}));


/**
 * Page with info about the Tesserae project.
 * 
 * @component 
 * @example
 *  return (<Tutorial />);
 */
function Tutorial(props) {
  /** CSS styles and global theme. */
  const classes = useStyles();

  return (
    <PageContainer>
      <Paper
        className={classes.paper}
      >
        <Grid container
          alignContent="flex-start"
          alignItems="flex-start"
          justifyContent="center"
        >
          <Grid item xs={12}>
            <Typography align="center" variant='h4'>Tutorial</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography align="left">
              Basic tutorial info here
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography align="center" variant='h4'>Advanced Tutorial</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography align="left">
              Advanced tutorial info here
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </PageContainer>
  );
}


export default Tutorial;
