/**
 * @fileoverview Placeholder over the results table before/during search.
 * 
 * @author [Jeff Kinnison](https://github.com/jeffkinnison)
 * 
 * @exports ResultsPlaceholder
 * 
 * @requires NPM:react
 * @requires NPM:prop-types
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
    fontSize: 18,
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
function MultitextResultsPlaceholder(props) {
  const { multitextSearchProgress, searchInProgress, searchProgress } = props;

  console.log(searchProgress);

  /** CSS styles and global theme. */
  const classes = useStyles(props);

  const progress = [...searchProgress, ...multitextSearchProgress].map(item => {
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
                variant="subtitle1">
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
                variant="subtitle1"
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


MultitextResultsPlaceholder.propTypes = {
  /**
   * Flag indicating that a search is in progress.
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
    multitextSearchProgress: state.multitext.progress,
    searchInProgress: state.multitext.searchInProgress,
    searchProgress: state.search.progress
  };
}


// Do redux binding here.
export default connect(mapStateToProps)(MultitextResultsPlaceholder);