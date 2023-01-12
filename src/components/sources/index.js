/**
 * @fileoverview Page with info about the sources for texts for the Tesserae project.
 * 
 * @author [Abby Swenor](https://github.com/aswenor)
 * 
 * @exports Sources
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
 * Page with info about the sources for texts for the Tesserae project.
 * 
 * @component 
 * @example
 *  return (<Sources />);
 */
function Sources(props) {
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
            <Typography align="center" variant='h4'>Sources</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography align="center">
              <p> The texts used in this project were gathered from many electronic text databases, including 
              <a href="http://thelatinlibrary.com/"> The Latin Library</a>, 
              <a href="http://www.perseus.tufts.edu/hopper/"> The Perseus Project</a>,
              <a href="https://digiliblt.uniupo.it/"> DigilibLT</a>,
              <a href="https://www.ch.uni-leipzig.de/"> Open Greek and Latin Project</a>, 
              <a href="https://www.mqdq.it/public/"> Musisque Deoque</a>, and
              <a href="http://www.forumromanum.org/literature/index.html"> Corpus Scriptorum Latinorum</a>.
              We have modified the texts by changing the markup, and may have made superficial changes to orthography.
              During our searches, all punctuation and capitalization are removed. Below we provide the electronic
              sources for each our text. To the best of our ability, we have looked for indications of the original 
              provenance of these texts, and reproduce citation where possible. This is a work in progress. </p>

              <table>
                <tr>
	                <th>Author</th>
	                <th>Work</th>
	                <th>e-Source</th>
	                <th>Print Source</th>
	                <th>Added by</th>
                </tr>
                <tr>
	                <td>Achilles Tatius</td>
	                <td>Leucippe et Clitophon</td>
	                <td><a href="http://www.perseus.tufts.edu/hopper/text?doc=Perseus%3atext%3a2008.01.0665">Perseus</a></td>
	                <td>Rudolf Hercher, <em>Erotici Scriptores Graeci, Vol 1</em>. Leipzig: in aedibus B. G. Teubneri, 1858.</td>
	                <td>Emilie Redwood</td>
                </tr><tr>
	                <td>Aelian</td>
	                <td>De Natura Animalium</td>
	                <td><a href="http://www.perseus.tufts.edu/hopper/text?doc=Perseus%3atext%3a2008.01.0590">Perseus</a></td>
	                <td>Rudolf Hercher, <em>Claudii Aeliani de natura animalium libri xvii, varia historia, epistolae, fragmenta, Vol 1</em>. Lipsiae: In Aedibus B.G. Teubneri, 1864.</td>
	                <td>Emilie Redwood</td>
                </tr></table>
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </PageContainer>
  );
}


export default Sources;
