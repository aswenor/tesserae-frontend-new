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
import TargetsTable from './targets/Table';
import TextSelectGroup from '../search/TextSelectGroup';
import { clearResults } from '../../state/multitext';


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
  const { clearResults, runMultitextSearch, language, multitextTargets,
          searchInProgress, searchParameters, sourceText,
          targetText } = props;

  const clearAndInitiate = () => {
    if (!searchInProgress) {    
      clearResults();
      runMultitextSearch(language, sourceText, targetText, searchParameters, multitextTargets);
    }
  };

  const classes = useStyles();

  const disableSearch = searchInProgress
                        || sourceText.object_id === undefined
                        || targetText.object_id === undefined
                        || multitextTargets.length === 0;

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
   * Clear existing results to prep for new search.
   */
  clearResults: PropTypes.func,

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
    language: state.corpus.language,
    multitextTargets: state.multitext.selectedTexts,
    searchInProgress: state.multitext.searchInProgress,
    searchParameters: state.search.searchParameters,
    sourceText: state.search.sourceText,
    targetText: state.search.targetText
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    clearResults: clearResults,
    runMultitextSearch: runMultitextSearch
  }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(MultitextSearchParametersForm);