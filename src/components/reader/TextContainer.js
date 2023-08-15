/** import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';


function TextContainer(props) {
  const { location, snippet } = props;

  return (
    <Grid container>
      <Grid item xs={2}>
        <Typography sx={{color: '#000000'}}>
          {location}
        </Typography>
      </Grid>
      <Divider orientation="vertical" />
      <Grid item xs={10}>
        <Typography  sx={{color: '#000000'}}>
          {snippet}
        </Typography>
      </Grid>
    </Grid>
  );
}


TextContainer.propTypes = {
  // Snippet location metadata.
  location: PropTypes.string,

  // Raw text of the snippet.
   
  snippet: PropTypes.string
}


export default TextContainer;
*/