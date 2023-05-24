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
            <Typography align="center" variant='h4'>Basic Tutorial</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography align="left">
              The basic search compares two texts to find every place where they share two or more words within a single line or phrase. Shared words are those that have a common lemma or are considere semantically related, with the latter category including but not limited to synonyms and antonyms. 
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography align="left" variant='h3'>Target and Source</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography align="left"
              The “target” text is the text you are studying most closely. It is generally the alluding text, and the more recent. The search is bidirectional, so the choice of which text is the target and which the source has no influence on the search. In the display of results, however, phrases from the target text will appear in the left column, those from the source on the right. 
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
