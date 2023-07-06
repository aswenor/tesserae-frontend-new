/**
 * @fileoverview Greek-to-latin search settings UI.
 * 
 * @author [Jeff Kinnison](https://github.com/jeffkinnison)
 * @author [Abby Swenor] (https://github.com/aswenor)
 * 
 * @exports Greek2LatinSearchParametersForm
 * 
 * @requires NPM:react
 * @requires NPM:prop-types
 * @requires NPM:redux
 * @requires NPM:react-redux
 * @requires NPM:@mui/material
 * @requires NPM:@mui/icons-material
 * @requires ./AdvancedOptionsGroup
 * @requires ./Greek2LatinTextSelectGroup
 * @requires ../../api/corpus
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import makeStyles from '@mui/styles/makeStyles';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';

import AdvancedOptionsGroup from './AdvancedOptionsGroup'
import DownloadButton from './DownloadButton';
import LanguageSelectButtons from '../common/LanguageSelectButtons';
import { MarginlessAccordion, MarginlessAccordionSummary,
         MarginlessAccordionDetails } from '../common/MarginlessAccordion';
import Greek2LatinTextSelectGroup from './Greek2LatinTextSelectGroup';

import { runSearch } from '../../api/search';
import { clearResults, clearSearchMetadata } from '../../state/search';


const useStyles = makeStyles(theme => ({
  root: {
    // backgroundColor: theme.palette.secondary.main,
    scrollbarColor: theme.palette.secondary.main,
    scrollbarWidth: 0,
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      backgroundColor: theme.palette.secondary.main,
      width: '0em',
      display: 'none'
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      display: 'none',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      display: 'none',
      outline: '1px solid slategrey'
    }
  },
  panel: {
    backgroundColor: theme.palette.secondary.main
  }
}));


/**
 * Form encapsulating all parameter options for a Tesserae search.
 * @component
 * 
 * @example
 *   return (
 *     <SearchParametersForm
 *       
 *     />
 *   );
 */
function Greek2LatinSearchParametersForm(props) {
  const { clearResults, runSearch, language, searchInProgress,
          searchParameters, sourceDivision, sourceText, targetDivision,
          targetText, toggleSideBar } = props;

  const classes = useStyles();

  const clearAndInitiate = () => {
    if (!searchInProgress) {
      clearResults();
      runSearch(language, sourceText, sourceDivision, targetText, targetDivision, searchParameters, true);
    }
  };

  const disableSearch = searchInProgress
                        || sourceText.object_id === undefined
                        || targetText.object_id === undefined;

  // Most of the content here is the Material-UI Grid model to handle spacing
  // members of the form.
  return (
    <Box
      className={classes.root}
      component="section"
      display="flex"
      flexDirection="column"
      flexGrow={1}
      height={'100%'}
      width={1}
    >
      <div
        className={classes.root}
      >
        <MarginlessAccordion
          className={classes.panel}
          expanded={true}
          square
        >
          <MarginlessAccordionDetails
          >
            <Grid container
              alignContent="center"
              alignItems="center"
              justifyContent="center"
              spacing={2}
            >
              <LanguageSelectButtons
                toggleSideBar={toggleSideBar}
              />
              <Grid item xs={12}>
                <Greek2LatinTextSelectGroup />
              </Grid>
              <Grid item
                align="center"
                xs={12}
              >
                <Fab
                  color="primary"
                  disabled={disableSearch}
                  onClick={clearAndInitiate}
                  variant="extended"
                >
                  <SearchIcon /> Search
                </Fab>
              </Grid>
              <Grid item
                align="center"
                xs={12}
              >
                <DownloadButton />
              </Grid>
            </Grid>
          </MarginlessAccordionDetails>
        </MarginlessAccordion>
        <MarginlessAccordion
          className={classes.panel}
          square
        >
          <MarginlessAccordionSummary
            aria-controls="advanced-options-form"
            expandIcon={<ExpandMoreIcon />}
            id="advanced-options-header"
          >
            <Typography
              align="center"
              variant="h5"
            >
              Advanced Options
            </Typography>
          </MarginlessAccordionSummary>
          <MarginlessAccordionDetails>
            <AdvancedOptionsGroup />
          </MarginlessAccordionDetails>
        </MarginlessAccordion>
      </div>
    </Box>
  );
}


Greek2LatinSearchParametersForm.propTypes = {
  /**
   * Flag determining if an AJAX call may be initiated.
   */
  asyncReady: PropTypes.bool,

  /**
   * List of texts exposed by the REST API.
   */
  availableTexts: PropTypes.arrayOf(PropTypes.object),

  /**
   * Function to clear out an existing search.
   */
  clearResults: PropTypes.func,

  /**
   * Function to clear out search ID and status.
   */
  clearSearchMetadata: PropTypes.func,
  
  /**
   * Function to retrieve texts from the REST API.
   */
  fetchTexts: PropTypes.func,
  
  /**
   * Function to retrieve the specified stoplist from the REST API.
   */
  fetchStoplist: PropTypes.func,
  
  /**
   * The current language populating the UI.
   */
  language: PropTypes.string,
  
  /**
   * Object containing all currently selected advanced parameters for the search.
   */
  searchParameters: PropTypes.object,

  /**
   * The currently selected source text.
   */
  sourceText: PropTypes.object,
  
  /**
   * The currently selected target text.
   */
  targetText: PropTypes.object,

  /**
   * Function to select a new source text from the dropdown menu.
   */
  updateSource: PropTypes.func,
  
  /**
   * Function to select a new target text from the dropdown menu.
   */
  updateTarget: PropTypes.func
};


/**
 * Add redux store state to this component's props.
 * 
 * @param {object} state The global state of the application.
 * @returns {object} Members of the global state to provide as props.
 */
const mapStateToProps = (state) => {
  return {
    language: state.corpus.language,
    searchInProgress: state.search.searchInProgress,
    searchParameters: state.search.searchParameters,
    sourceDivision: state.search.sourceDivision,
    sourceText: state.search.sourceText,
    targetDivision: state.search.targetDivision,
    targetText: state.search.targetText,
  };
};


/**
 * Add redux store actions to this component's props.
 * @param {function} dispatch The redux dispatch function.
 */
const mapDispatchToProps = dispatch => bindActionCreators({
  clearResults: clearResults,
  clearSearchMetadata: clearSearchMetadata,
  runSearch: runSearch
}, dispatch);


// Do redux binding here.
export default connect(mapStateToProps, mapDispatchToProps)(Greek2LatinSearchParametersForm);
