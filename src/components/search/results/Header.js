/**
 * @fileoverview Styled header for the Tesserae search results table.
 * 
 * @author [Jeff Kinnison](https://github.com/jeffkinnison)
 * 
 * @exports ResultsTableHeader
 * 
 * @requires NPM:react
 * @requires NPM:prop-types
 * @requires NPM:@material-ui/core
 */
import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Typography from '@material-ui/core/Typography';


/** CSS styles to apply to table cells. */
const cellStyles = makeStyles(theme => ({
  root: {
    zIndex: theme.zIndex.drawer - 1
  },
  row: {
    borderBottom: '2px solid black'
  },
  numberCell: {
    backgroundColor: theme.palette.secondary.main,
    width: '1%'
  },
  snippetCell: {
    backgroundColor: theme.palette.secondary.main,
    width: '48%'
  },
  matchesCell: {
    backgroundColor: theme.palette.secondary.main,
    width: '10%'
  },
}));


/**
 * Header cells for the table with sorting buttons.
 * 
 * @component
 */
function Header(props) {
  const { sortHeader, sortOrder, updatePagination } = props;

  /** Map sort direction from number to string. */
  const sortDirection = sortOrder === 1 ? 'asc' : 'desc';

  /** CSS styles and global theme. */
  const classes = cellStyles();

  /**
   * Update the column being sorted or the sorting order.
   * 
   * @param {String} header
   */
  const handleSortUpdate = header => {
    // Normalize the new header.
    const newSortHeader = header.toLowerCase();

    if (newSortHeader === sortHeader) {
      updatePagination({sortOrder: -sortOrder});
    }
    else {
      updatePagination({sortHeader: newSortHeader, sortOrder: -1});
    }
  }

  return (
    <TableRow
      className={classes.row}
    >
      <TableCell
        align="center"
        className={classes.numberCell}
        key="number"
        variant="head"
      >
      </TableCell>
      <TableCell
        align="left"
        className={classes.snippetCell}
        key="source"
        onClick={() => handleSortUpdate('source_tag')}
        sortDirection={sortHeader === 'source_tag' ? sortDirection : false}
        variant="head"
      >
        <TableSortLabel
          active={sortHeader === 'source_tag'}
          direction={sortHeader === 'source_tag' ? sortDirection : 'desc'}
          hideSortIcon={false}
        >
          <Typography><b>Source</b></Typography>
        </TableSortLabel>
      </TableCell>
      <TableCell
        align="left"
        className={classes.snippetCell}
        key="target"
        onClick={() => handleSortUpdate('target_tag')}
        sortDirection={sortHeader === 'target_tag' ? sortDirection : false}
        variant="head"
      >
        <TableSortLabel
          active={sortHeader === 'target_tag'}
          direction={sortHeader === 'target_tag' ? sortDirection : 'desc'}
          hideSortIcon={false}
        >
          <Typography><b>Target</b></Typography>
        </TableSortLabel>
      </TableCell>
      <TableCell
        align="center"
        className={classes.matchesCell}
        key="matches"
        variant="head"
      >
        <Typography><b>Matches</b></Typography>
      </TableCell>
      <TableCell
        align="center"
        className={classes.numberCell}
        key="score"
        onClick={() => handleSortUpdate('score')}
        sortDirection={sortHeader === 'score' ? sortDirection : false}
        variant="head"
      >
        <TableSortLabel
          active={sortHeader === 'score'}
          direction={sortHeader === 'score' ? sortDirection : 'desc'}
          hideSortIcon={false}
        >
          <Typography><b>Score</b></Typography>
        </TableSortLabel>
      </TableCell>
    </TableRow>
  );
}


Header.propTypes = {
  /**
   * Header on which to search.
   */
  sortHeader: PropTypes.oneOf(['source_tag', 'target_tag', 'score']),

  /**
   * Order that cells are sorted (descending or ascending).
   */
  sortOrder: PropTypes.oneOf([-1, 1]),

  /**
   * Callback to sort by a new header.
   */
  updatePagination: PropTypes.func,
};


export default Header;