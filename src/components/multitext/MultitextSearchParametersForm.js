import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import makeStyles from '@mui/styles/makeStyles';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';

import AdvancedOptionsGroup from '../search/AdvancedOptionsGroup';
import LanguageSelectButtons from '../common/LanguageSelectButtons';
import { MarginlessAccordion, MarginlessAccordionSummary,
         MarginlessAccordionDetails } from '../common/MarginlessAccordion';
import { runMultitextSearch } from '../../api/multitext';
import { fetchStoplist, initiateOriginalSearch } from '../../api/search';
import TargetsTable from './targets/Table';
import TextSelectGroup from '../search/TextSelectGroup';
import { clearResults as clearMultitextResults } from '../../state/multitext';
import { updateSearchInProgress, updateMultitextInProgress } from '../../state/async';

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
 * 
 * @param {*} props 
 * @returns 
 */
function MultitextSearchParametersForm(props) {
  const { asyncReady, clearResults, fetchStoplist, runMultitextSearch, language, multitextTargets,
          searchInProgress, searchParameters, sourceText, stopwords,
          targetText, searchNeeded } = props;

  const classes = useStyles();

  const disableSeach = stopwords.length === 0
                        || sourceText.object_id === undefined
                        || targetText.object_id === undefined
                        || multitextTargets.length === 0;

  if (language !== '' && stopwords.length === 0) {
    const basis = searchParameters.stoplistBasis === 'corpus'
                  ? language
                  : [sourceText.object_id, targetText.object_id];
    fetchStoplist(searchParameters.feature, searchParameters.stoplist, basis, asyncReady);
  }

  const clearAndInitiate = () => {
    if (searchNeeded) {
      batch(() => {
        clearResults();
        clearMultitextResults();
        updateMultitextInProgress(true);
      });
      initiateOriginalSearch(sourceText, 0, targetText, 0, searchParameters, stopwords)
    }
  }


/** 
  if (language !== '' && stopwords.length === 0) {
    const basis = searchParameters.stoplistBasis === 'corpus'
                  ? language
                  : [sourceText.object_id, targetText.object_id];
    fetchStoplist(searchParameters.feature, searchParameters.stoplist, basis, asyncReady);
  }
  

  const clearAndInitiate = () => {
    if (!searchInProgress) {    
      clearResults();
      //runMultitextSearch(language, sourceText, targetText, searchParameters, multitextTargets);
      initiateOriginalSearch(sourceText, 0, targetText, 0, searchParameters, stopwords)
    }
  };

  

  const disableSearch = searchInProgress
                        || sourceText.object_id === undefined
                        || targetText.object_id === undefined
                        || multitextTargets.length === 0;
                        */

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
              <Grid item xs={12}>
                <LanguageSelectButtons />
              </Grid>
              <Grid item xs={12}>
                <TextSelectGroup />
              </Grid>
              <Grid item xs={12}>
                <TargetsTable />
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


MultitextSearchParametersForm.propTypes = {
  /**
   * Flag determining if an AJAX call may be initiated.
   */
  asyncReady: PropTypes.bool,

  /**
   * Clear existing results to prep for new search.
   */
  clearResults: PropTypes.func,

  /**
   * Function to retrieve the specified stoplist from the REST API.
   */
  fetchStoplist: PropTypes.func,

  /**
   * The language of the texts being searched.
   */
  language: PropTypes.string,

  /**
   * Array of text metadata for multitext comparisons.
   */
  multitextTargets: PropTypes.arrayOf(
    PropTypes.shape({
      /**
       * Database id of the text.
       */
      object_id: PropTypes.string
    })
  ),

  /**
   * Execute a new multitext search.
   */
  runMultitextSearch: PropTypes.func,
  
  /**
   * True if a multitext search is running.
   */
  searchInProgress: PropTypes.bool,

  /**
   * Object containing the search method settings.
   */
  searchParameters: PropTypes.object,

  /**
   * Source text for the standard search.
   */
  sourceText: PropTypes.shape({
    /**
       * Database id of the text.
       */
    object_id: PropTypes.string
  }),

  /**
   * Target text for the standard search.
   */
  targetText: PropTypes.shape({
    /**
     * Database id of the text.
     */
    object_id: PropTypes.string
  }),
};


function mapStateToProps(state) {
  return {
    asyncReady: state.async.asyncPending < state.async.maxAsyncPending,
    language: state.corpus.language,
    multitextTargets: state.multitext.selectedTexts,
    searchInProgress: state.multitext.searchInProgress,
    searchParameters: state.search.searchParameters,
    sourceText: state.search.sourceText,
    targetText: state.search.targetText,
    stopwords: state.search.stopwords,
    searchNeeded: state.search.searchID === ''
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    clearResults: clearResults,
    clearMultitextResults: clearMultitextResults,
    initiateOriginalSearch: initiateOriginalSearch,
    runMultitextSearch: runMultitextSearch,
    fetchStoplist: fetchStoplist,
    updateMultitextInProgress: updateMultitextInProgress,
    updateSearchInProgress: updateSearchInProgress
  }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(MultitextSearchParametersForm);