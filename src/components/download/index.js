/**
 * @fileoverview Tesserae stand-alone version downloads page.
 * 
 * @author [Jeff Kinnison](https://github.com/jeffkinnison)
 * 
 * @exports Downloads
 */
import React from 'react';

import makeStyles from '@mui/styles/makeStyles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import PageContainer from '../common/PageContainer';


/**
 * Tesserae stand-alone version downloads page.
 * 
 * @component 
 * @example
 */
function Downloads(props) {
  return (
    <PageContainer>
      <Paper>
        <Grid container>
          <Grid item xs={12}>
            {/* The most recent version for each OS gets placed at the top here. */}
            <Grid container>
              <Grid item xs={4}>

              </Grid>
              <Grid item xs={4}>
                
              </Grid>
              <Grid item xs={4}>
                
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            {/* Prior versions are placed in three lists: one for each OS. */}
            <Grid container>
              <Grid item xs={4}>

              </Grid>
              <Grid item xs={4}>
                
              </Grid>
              <Grid item xs={4}>
                
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </PageContainer>
  );
}


export default Downloads;