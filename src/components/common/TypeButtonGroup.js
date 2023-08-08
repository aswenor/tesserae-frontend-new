import React from 'react';
import PropTypes from 'prop-types';

import makeStyles from '@mui/styles/makeStyles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';


const useStyles = makeStyles(theme => ({
  button: {
    border: '1px solid #000000',
    boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.3)'

  },
  buttonGroup: {
    backgroundColor: theme.palette.primary.main
  }
}));


function TypeButtonGroup(props) {
  const { setTypeFilter, typeFilter } = props;

  console.log(typeFilter);

  const classes = useStyles();

  const buttons = ['All', 'Poetry', 'Prose'].map(item => {
    const lowerItem = item.toLowerCase();
    return (
      <Button
        className={classes.button}
        color={lowerItem === typeFilter ? 'secondary' : 'default'}
        key={item}
        onClick={(event) => setTypeFilter(lowerItem)}
        variant="contained"
      >
        {item}
      </Button>
    );
  });

  return (
    <ButtonGroup
      className={classes.buttonGroup}
    >
      {buttons}
    </ButtonGroup>
  )
}


TypeButtonGroup.propTypes = {
  setTypeFilter: PropTypes.func,
  typeFilter: PropTypes.string
}


export default TypeButtonGroup;