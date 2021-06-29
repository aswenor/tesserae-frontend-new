/**
 * @fileoverview Page with info about the Tesserae project.
 * 
 * @author [Jeff Kinnison](https://github.com/jeffkinnison)
 * 
 * @exports About
 * 
 * @requires NPM:react
 * @requires NPM:@material-ui/core
 * @requires ../common/PageContainer
 */
import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import PageContainer from '../common/PageContainer';


/** CSS styles to apply to the page */
const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: '#fdead1',
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      height: '90vh',
      marginLeft: theme.spacing(3),
      marginRight: theme.spacing(3),
      marginTop: theme.spacing(3),
      padding: theme.spacing(2),
    },
    [theme.breakpoints.down('sm')]: {
      height: '100%'
    }
  }
}));


/**
 * Page with info about the Tesserae project.
 * 
 * @component 
 * @example
 *  return (<About />);
 */
function About(props) {
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
          justify="center"
        >
          <Grid item xs={12}>
            <Typography align="center" variant='h4'>About</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography align="center">
              For more information, contact Dr. Neil Coffee (<a href="ncoffee@buffalo.edu">ncoffee@buffalo.edu</a>)
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </PageContainer>
  );
}


export default About;