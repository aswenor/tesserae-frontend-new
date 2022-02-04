/**
 * @fileoverview Table displaying metadata about texts in the corpus.
 * 
 * @author [Jeff Kinnison](https://github.com/jeffkinnison)
 * 
 * @exports CorpusManager
 * 
 * @requires NPM:react
 * @requires NPM:prop-types
 * @requires NPM:react-redux
 * @requires NPM:@mui/material
 * @requires ../common/BodyScrollTable
 * @requires ./CorpusViewerBodyRow
 * @requires ./CorpusViewerHeader
 */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { orderBy } from 'lodash';

import Box from '@mui/material/Box';

import BodyScrollTable from '../common/BodyScrollTable';
import CorpusViewerBodyRow from './CorpusViewerBodyRow';
import CorpusViewerHeader from './CorpusViewerHeader';


/**
 * Table displaying metadata about texts in the corpus.
 * 
 * @component
 * @example
 *   return (
 *     <CorpusViewer
 *       textList={[{
 *         author: 'vergil',
 *         is_prose: true,
 *         object_id: '89237645fa965',
 *         title: 'aeneid',
 *         year: -25
 *       }]}
 *     />
 *   );
 */
function CorpusViewer(props) {
  const { textList } = props;

  const [ pagination, setPagination ] = useState({
    currentPage: 0,
    rowsPerPage: 25,
    sortHeader: 'author',
    sortOrder: 1
  });

  const [ displayRows, setDisplayRows] = useState([]);

  useEffect(() => {
    /**
     * The first and last entries to select from textList.
     */
    const start = pagination.currentPage * pagination.rowsPerPage;
    const end = start + pagination.rowsPerPage;

    /**
     * Determine the order of two objects by a given field.
     * 
     * @param {Object} a 
     * @param {Object} b 
     * @returns {number} -1, 0, or 1 depending on equality
     */
    const compareTexts = (a, b) => {
      if (a[pagination.sortHeader] > b[pagination.sortHeader]) {
        return pagination.sortOrder
      }
      else if (a[pagination.sortHeader] < b[pagination.sortHeader]) {
        return -pagination.sortOrder
      }
      else {
        return 0;
      }
    };
    
    setDisplayRows(textList.slice().sort(compareTexts).slice(start, end).map(item => {
      return (<CorpusViewerBodyRow text={item} />);
    }));
  }, [pagination, textList]);

  return (
    <Box
      display="flex"
      flexGrow={1}
      height={'100%'}
      m={0}
      width={1}
    >
      <BodyScrollTable
        bodyCount={textList.length}
        initialRowsPerPage={25}
        onPageChange={() => {}}
        pagination={pagination}
        rowsPerPageLabel="Rows Per Page:"
        rowsPerPageOptions={[25, 50, 100]}
        updatePagination={(newPagination) => setPagination(prev => ({...prev, ...newPagination}))}
      >
        <CorpusViewerHeader 
          sortHeader={pagination.sortHeader}
          sortOrder={pagination.sortOrder}
          updatePagination={newPagination => setPagination(prev => ({...prev, ...newPagination}))}
        />
        {displayRows}
      </BodyScrollTable>
    </Box>
  );
}


CorpusViewer.propTypes = {
  /**
   * The page of texts to display.
   */
  currentPage: PropTypes.number,

  /**
   * The number of texts comprising one page.
   */
  rowsPerPage: PropTypes.number,

  /**
   * The column to sort by.
   */
  sortHeader: PropTypes.string,

  /**
   * The direction to sort (-1 or 1).
   */
  sortOrder: PropTypes.number,

  /**
   * List of texts to display in the table.
   */
  textList: PropTypes.arrayOf(
    PropTypes.shape({
      /**
       * Name of the author of the text.
       */
      author: PropTypes.string,

      /**
       * Whether the text is prose or poetry.
       */
      isProse: PropTypes.bool,

      /**
       * Database ID of the text.
       */
      object_id: PropTypes.string,

      /**
       * Title of the text.
       */
      title: PropTypes.string,

      /**
       * Year that the text was published.
       */
      year: PropTypes.number
    })
  ),
};


/**
 * Add redux store state to this component's props.
 * 
 * @param {object} state The global state of the application.
 * @returns {object} Members of the global state to provide as props.
 */
function mapStateToProps(state) {
  return {
    currentPage: state.pagination.currentPage,
    rowsPerPage: state.pagination.rowsPerPage,
    sortHeader: state.pagination.sortHeader,
    sortOrder: state.pagination.sortOrder
  };
}


// Do redux binding here.
export default connect(mapStateToProps)(CorpusViewer);