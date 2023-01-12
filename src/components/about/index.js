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
              Tesserae is a collaborative project of the <a href="https://www.buffalo.edu">University of Buffalo</a> 
              <a href="https://arts-sciences.buffalo.edu/classics.html">Department of Classics</a> and
              <a href="https://arts-sciences.buffalo.edu/linguistics.html">Department of Linguistics</a>, the 
              <a href="https://cse.nd.edu/">Department of Computer Science and Engineering</a> of the 
              <a href="https://www.nd.edu/">University of Notre Dame</a>, and the 
              <a href="https://www.unige.ch/lettres/antic/">Département des Sciences de l\'Antiquité</a> of the 
              <a href="https://unige.ch/">University of Geneva</a>. 
              <br>
                
              The principal investigators are <a href="https://arts-sciences.buffalo.edu/classics/faculty/core-faculty.host.html/content/shared/arts-sciences/classics/core-faculty/coffee-neil.html">Neil Coffee</a>,
              Professor of Classics, University of Buffalo; <a href="https://www.wjscheirer.com/">Walter J. Scheirer</a>, 
              Associate Professor of Computer Science, University of Notre Dame; and
              <a href="https://arts-sciences.buffalo.edu/linguistics/faculty.host.html/content/shared/arts-sciences/linguistics/new-faculty-profiles/koenig-jean-pierre.html">Jean-Pierre Koenig</a>,
              Professor of Linguistics, University of Buffalo. A list of personnel and collaborators is <a href="https://tesserae.caset.buffalo.edu/blog/people/">here</a>.
              <br>
              
              This project has been funded by the University of Buffalo College of Arts and Sciences, the National Endowment for the Humanities Office of Digital Humanities
              (<a href="https://securegrants.neh.gov/PublicQuery/main.aspx?f=1&gn=HD-51570-12">Start-up Grant #HD-51570</a>) and the Swiss National Science Foundation
              (<a href="https://data.snf.ch/grants/grant/146976">Project #146976</a>), and by the Digital Humanities Initiative at Buffalo. 
              <br>
                
              For more information, contact Dr. Neil Coffee (<a href="ncoffee@buffalo.edu">ncoffee@buffalo.edu</a>) 
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </PageContainer>
  );
}


export default About;
