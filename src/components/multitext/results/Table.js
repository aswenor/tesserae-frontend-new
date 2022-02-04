/**
 * @fileoverview Table to display Tesserae search results.
 * 
 * @author [Jeff Kinnison](https://github.com/jeffkinnison)
 * 
 * @exports ResultsTable
 * 
 * @requires NPM:react
 * @requires NPM:prop-types
 * @requires NPM:redux
 * @requires NPM:react-redux
 * @requires NPM:@mui/material
 * @requires ../ResultsPlaceholder
 * @requires ../../api/corpus
 */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import BodyRow from './BodyRow';
import BodyScrollTable from '../../common/BodyScrollTable';
import ChangePageOverlay from '../../common/ChangePageOverlay';
import { changePage } from '../../../api/multitext';
import Header from './Header';


/**
 * Formatted table to display search results.
 * 
 * @component
 */
function Table(props) {
  const { changePage, changingPage, results, resultsCount, searchID } = props;

  const [ pagination, setPagination ] = useState({
    currentPage: 0,
    rowsPerPage: 100,
    sortHeader: 'score',
    sortOrder: -1
  });

  useEffect(() => {
    if (searchID !== '') {
      changePage(
        searchID,
        pagination.currentPage,
        pagination.rowsPerPage,
        pagination.sortHeader,
        pagination.sortOrder
      );
    }
  }, [changePage, pagination, searchID]);

  const updatePagination = (newPagination) => {
    setPagination({...pagination, ...newPagination});
  };

  // If a multi-text search has not been run and no results are available,
  // display a placeholder that points to the parameters form or shows a
  // load bar. Otherwise, show the results.
  return (
    <React.Fragment>
      { changingPage
        ? <ChangePageOverlay />
        : <BodyScrollTable
            bodyCount={resultsCount}
            initialRowsPerPage={100}
            onPageChange={() => {}}
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
            {[results.map((item, idx) => (
              <BodyRow 
                idx={pagination.currentPage * pagination.rowsPerPage + idx + 1}
                result={item}
              />
            ))]}
          </BodyScrollTable>
      }
    </React.Fragment>
  );
}


Table.propTypes = {
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
}


/**
 * Add redux store state to this component's props.
 * 
 * @param {object} state The global state of the application.
 * @returns {object} Members of the global state to provide as props.
 */
function mapStateToProps(state) {
  return {
    changingPage: state.multitext.changingPage,
    results: state.multitext.results,
    resultsCount: state.multitext.resultsCount,
    searchID: state.multitext.searchID
  };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    changePage: changePage
  }, dispatch);
}


// Do redux binding here.
export default connect(mapStateToProps, mapDispatchToProps)(Table);
 