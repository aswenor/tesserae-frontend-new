/**
 * @fileoverview Placeholder over the results table before/during search.
 * 
 * @author [Jeff Kinnison](https://github.com/jeffkinnison)
 * 
 * @exports ResultsPlaceholder
 * 
 * @requires NPM:react
 * @requires NPM:prop-types
 * @requires NPM:redux
 * @requires NPM:react-redux
 * @requires NPM:@mui/material
 * @requires NPM:@mui/icons-material
 * @requires ../../../api/corpus
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Hidden from '@mui/material/Hidden';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { toTitleCase } from '../../utils';


/** CSS styles to apply to the component. */
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    height: '100vh',
    flexDirection: "column",
    justifyContent: "center",
    paddingTop: '30%'
  },
  spacer: {
    display: 'block',
    marginTop: '25vh',
    marginLeft: '40%'
  },
  icon: {
    height: '20vh',
    marginLeft: '25px',
    width: '20vh'
  },
  text: {
    display: 'inline-block',
    marginTop: '20px'
  }
}));


/**
 * Placeholder content before/during a search.
 * @component
 * 
 * @example
 *   
 */
function ResultsPlaceholder(props) {
  const { searchInProgress, searchProgress } = props;

  console.log(searchInProgress, searchProgress);

  /** CSS styles and global theme. */
  const classes = useStyles(props);

  const progress = searchProgress.map(item => {
    return (
      <div
        key={item.stage}
      >
        <Typography>{toTitleCase(item.stage)}:</Typography>
        <LinearProgress value={item.value * 100} variant= "determinate" />
      </div>
    );
  });


  // If a search is not in progress, an arrow pointing to the side bar is shown.
  // If a search is in progress, a spinning wheel is shown.
  return (
    <Hidden only={['xs', 'sm']}>
      <Box
        display="flex"
        flexGrow={1}
        flexDirection="row"
      >
        {!searchInProgress 
         ?  <Box
              className={classes.spacer}
            >
              <ArrowBackIcon
                className={classes.icon}
                color="primary"
                style={{ fontSize: 9000 }}
                viewBox="4 4 18 18"
              />
              <br />
              <Typography
                className={classes.text}
                color="primary"
                variant="h5"
              >
                Run a search to find parallels.
              </Typography>
            </Box>
         :  <Box
              className={classes.spacer}
            >
              <Typography
                align="left"
                className={classes.text}
                color="primary"
                variant="h5"
              >
                Searching. This may take a moment.
              </Typography>
              {progress}
            </Box>
        }
      </Box>
    </Hidden>
  );
}


ResultsPlaceholder.propTypes = {
  /**
   * True if a search is currently running.
   */
  searchInProgress: PropTypes.bool,

  /**
   * Progress indicators for stages of a search.
   */
  searchProgress: PropTypes.arrayOf(PropTypes.shape({
    /**
     * Name of the search stage.
     */
    stage: PropTypes.string,

    /**
     * Percent completion.
     */
    value : PropTypes.number
  })),
}


/**
 * Add redux store state to this component's props.
 * 
 * @param {object} state The global state of the application.
 * @returns {object} Members of the global state to provide as props.
 */
function mapStateToProps(state) {
  return {
    searchInProgress: state.search.searchInProgress,
    searchProgress: state.search.progress,
  }
}


// Do redux binding here.
export default connect(mapStateToProps)(ResultsPlaceholder);