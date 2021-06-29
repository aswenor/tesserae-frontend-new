import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';


const useStyles = makeStyles(theme => ({
  button: {
    border: '1px solid #000000',
    boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.3)'
  },
  buttonGroup: {
    backgroundColor: theme.palette.default.main
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
    <Box>
        <ButtonGroup
          className={classes.buttonGroup}
        >
          {buttons}
        </ButtonGroup>
    </Box>
  )
}


TypeButtonGroup.propTypes = {
  setTypeFilter: PropTypes.func,
  typeFilter: PropTypes.string
}


export default TypeButtonGroup;