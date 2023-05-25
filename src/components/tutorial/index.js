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
            <Typography align="left" variant='body1'>
              The basic search compares two texts to find every place where they share two or more words within a single line or phrase. Shared words are those that have a common lemma or are considere semantically related, with the latter category including but not limited to synonyms and antonyms. 
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography align="left" variant='h6'>Target and Source</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography align="left" variant='body2'>
              The “target” text is the text you are studying most closely. It is generally the alluding text, and the more recent. The search is bidirectional, so the choice of which text is the target and which the source has no influence on the search. In the display of results, however, phrases from the target text will appear in the left column, those from the source on the right. 
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography align="left" variant='h6'>Compare Texts</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography align="left" variant='paragraph'>
              Clicking on “Compare Texts” will initiate a default search for parallel language between the selected texts. The default settings are designed to capture the largest number of interesting intertexts and rank them as efficiently as possible. To customize the search parameters, click on the words “advanced features” and see the relevant help page. 
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography align="left">
              The default search will produce pairs of phrases, one from each text, which share at least two words. Words are considered to be “shared” if they partake of a common dictionary headword or lemma. As of Version 3.1 (July 2015), default searches include both shared-lemma and semantic matches, the latter of which include synonyms, antonyms, and many compound words. 
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography align="left" variant='h6'>Limitations</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography align="left">
              The search uses automatic rules on the best available data, but has some known limitations. Lemma search overmatches because it does not distinguish between homographs. Latin bellum, meaning "war," will match bellae, "beautiful ladies," because bellum could have been the masculine accusative from of bellus, meaning "beautiful." Semantic matches are based on an automatically-generated dictionary of related words. Experiments have shown that the large majority of these matches are semantically related in a broad sense, but the search still returns a signifiant percentage of minimally related or unrelated words. 
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography align="left">
               Searches on large full texts can take a few moments to process. You can speed results by choosing to compare parts of large works rather than whole works. 
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
