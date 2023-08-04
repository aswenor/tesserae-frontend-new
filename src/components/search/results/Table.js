/**
 * @fileoverview Table to display Tesserae search results.
 * 
 * @author [Jeff Kinnison](https://github.com/jeffkinnison)
 * 
 * @exports ResultsTable
 * 
 * @requires NPM:react
 * @requires NPM:prop-types
 * @requires NPM:react-redux
 * @requires NPM:@mui/material
 * @requires ./BodyRow
 * @requires ../../common/BodyScrollTable
 * @requires ./Header
 * @requires ../ResultsPlaceholder
 */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators  } from 'redux';
import { connect } from 'react-redux';

import Body from './Body';
import BodyScrollTable from '../../common/BodyScrollTable';
import { changePage, fetchResults } from '../../../api/search';
import ChangePageOverlay from '../../common/ChangePageOverlay';
import Header from './Header';




/**
 * Formatted table to display search results.
 * 
 * @component
 */
function ResultsTable(props) {
  const { changePage, changingPage, resultsCount, searchID, sourceDivision,
          targetDivision, fetchResults, asyncReady, searchStatus } = props;

  /** const [ pagination, setPagination ] = useState({
    currentPage: 0,
    rowsPerPage: 100,
    sortHeader: 'score',
    sortOrder: -1
  });

  useEffect(() => {
    if (searchID !== '') {
      changePage(
        searchID,
        sourceDivision,
        targetDivision,
        {...pagination}
      )
    }
  }, [changePage, pagination, searchID, sourceDivision, targetDivision]);

  const updatePagination = (newPagination) => {
    setPagination({...pagination, ...newPagination});
  }; */
  const onPageChange = (pagination) => {
    fetchResults(searchID, asyncReady,
                  pagination.currentPage,
                  pagination.rowsPerPage,
                  pagination.sortHeader,
                  pagination.sortOrder);
  };

  console.log('results', results);

  if (searchStatus.toLowerCase() === 'done' && results.length === 0) {
    fetchResults(searchID, asyncReady);
  }

  // If a search has not been run and no results are available, display a
  // placeholder that points to the parameters form or shows a load bar. 
  // Otherwise, show the results.
  return (
    changingPage
    ? <ChangePageOverlay />
    : <BodyScrollTable
        bodyCount={resultsCount}
        initialRowsPerPage={100}
        onChangePage={setPagination}
        pagination={pagination}
        rowsPerPageLabel="Results per page: "
        rowsPerPageOptions={[50, 100, 250, 500]}
        updatePagination={updatePagination}
      >
        <Header
          sortHeader={pagination.sortHeader}
          sortOrder={pagination.sortOrder}
          updatePagination={updatePagination}
        />
        <Body
          currentPage={pagination.currentPage}
          rowsPerPage={pagination.rowsPerPage}
          sourceDivision={sourceDivision}
          targetDivision={targetDivision}
        />
      </BodyScrollTable>
  );
}


ResultsTable.propTypes = {
  /**
   * The number of results returned byt this search.
   */
  resultsCount: PropTypes.number,

  /**
   * Array of search results retrieved frmo the REST API.
   */
  results: PropTypes.arrayOf(
    PropTypes.shape({
      /**
       * Pairs of source/target snippet token indices corresponding to matches.
       */
      highlight: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),

      /**
       * Database ID of the result.
       */
      object_id: PropTypes.string,

      /**
       * Score of the match.
       */
      score: PropTypes.number,

      /**
       * Matching passage of source text.
       */
      source_snippet: PropTypes.string,

      /**
       * Locus of matching passage of source text.
       */
      source_tag: PropTypes.string,

      /**
       * Matching passage of target text.
       */
      target_snippet: PropTypes.string,

      /**
       * Locus of matching passage of source text.
       */
      target_tag: PropTypes.string,
    })
  ),

  /**
   * Database ID of the search.
   */
  searchID: PropTypes.string,

  /**
   * Whether or not an async request may be initiated.
   */
  asyncReady: PropTypes.bool
}


/**
 * Add redux store state to this component's props.
 * 
 * @param {object} state The global state of the application.
 * @returns {object} Members of the global state to provide as props.
 */
const mapStateToProps = state => ({
  changingPage: state.search.changingPage,
  resultsCount: state.search.resultsCount,
  searchID: state.search.searchID,
  sourceDivision: state.search.sourceDivision,
  targetDivision: state.search.targetDivision,
  results: state.search.results,
  asyncReady: state.async.asyncPending < state.async.maxAsyncPending,
  searchStatus: state.search.searchStatus
});


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    changePage: changePage,
    fetchResults: fetchResults
  }, dispatch);
}


// Do redux binding here.
export default connect(mapStateToProps, mapDispatchToProps)(ResultsTable);
