/**
 * @fileoverview Page with info about the Tesserae project.
 * 
 * @author [Jeff Kinnison](https://github.com/jeffkinnison)
 * 
 * @exports About
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
          justifyContent="center"
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