import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

import TextContainer from './TextContainer';


function Reader(props) {
  const  { text, units } = props;

  const [section, setSection] = useState(1);

  const display = units.filter(u => 
    parseInt(u['tags'][0].split('.')[0]) === section
  ).map(u => {
    return <TextContainer key={u.tags[0]} location={u.tags[0]} snippet={u.snippet} />
  });
  
  return (
    <Container>
      <Stack>
        {display}
      </Stack>
    </Container>
  );
}


Reader.propTypes = {
  text: PropTypes.shape({
    is_prose: PropTypes.bool,
    object_id: PropTypes.string
  }),
  units: PropTypes.arrayOf(
    PropTypes.shape({
      snippet: PropTypes.string,
      tags: PropTypes.arrayOf(PropTypes.string)
    })
  )
}


function mapStateToProps() {

}


export default Reader;