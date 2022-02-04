import React, { useState } from 'react';
import PropTypes from 'prop-types';

import makeStyles from '@mui/styles/makeStyles';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';

import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const useStyles = makeStyles(theme => ({
  root: {
    margin: 0,
    marginBottom: '25px'
  },
  innerBox: {
    paddingLeft: '20px'
  }
}));


function CollapseBox(props) {
  const { children, headerText } = props;

  const classes = useStyles();

  const [ open, setOpen ] = useState(false);

  const toggleOpen = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const icon = open ? (<ExpandLessIcon size="small" />) : (<ExpandMoreIcon size="small" />);

  return (
    <Box
      className={classes.root}
      flexGrow={1}
      justifyContent="center"
      width={1}
    >
      <Box
        onClick={toggleOpen}
      >
        <Typography
          variant="h6"
        >
          {icon}{headerText}
        </Typography>
      </Box>
      <Collapse in={open}>
        <Box
          alignContent="center"
          alignItems="center"
          justifyContent="center"
          width={1}
        >
          {children}
        </Box>
      </Collapse>
    </Box>
  );
}


CollapseBox.propTypes = {
  headerText: PropTypes.string
};


export default CollapseBox;