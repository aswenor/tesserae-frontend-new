/**
 * @fileoverview Table header for Tesserae multitext search results.
 * 
 * @author [Jeff Kinnison](https://github.com/jeffkinnison)
 * 
 * @requires NPM:react
 * @requires NPM:prop-types
 * @requires NPM:@mui/material
 */
import React from 'react';
import PropTypes from 'prop-types';

import makeStyles from '@mui/styles/makeStyles';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Typography from '@mui/material/Typography';


/** CSS styles to apply to table cells. */
const useStyles = makeStyles(theme => ({
  root: {
    zIndex: theme.zIndex.drawer - 1
  },
  row: {
    borderBottom: '2px solid black'
  },
  numberCell: {
    width: '1%'
  },
  snippetCell: {
    width: '48%'
  },
  matchesCell: {
    width: '10%'
  },
}));


function Header(props) {
  const { sortHeader, sortDirection, updatePagination } = props;

  const classes = useStyles();

   /**
   * Update the column being sorted or the sorting order.
   * 
   * @param {String} header
   */
    const handleSortUpdate = header => {
      // Normalize the new header.
      const newSortHeader = header.toLowerCase();
  
      if (newSortHeader === sortHeader) {
        updatePagination({sortOrder: -sortDirection});
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
          <Typography variant="h6"><b>Source</b></Typography>
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
          <Typography variant="h6"><b>Target</b></Typography>
        </TableSortLabel>
      </TableCell>
      <TableCell
        align="center"
        className={classes.matchesCell}
        key="matches"
        variant="head"
      >
        <Typography variant="h6"><b>Match Features</b></Typography>
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
          <Typography variant="h6"><b>Score</b></Typography>
        </TableSortLabel>
      </TableCell>
      <TableCell>
      <Typography variant="h6"><b>Multitext</b></Typography>
      </TableCell>
    </TableRow>
  );
}


Header.propTypes = {
  /**
   * 1 for ascending sort, -1 for descending.
   */
  sortDirection: PropTypes.number,

  /**
   * The label to sort results by.
   */
  sortHeader: PropTypes.string,

  /**
   * Function to set new sorting parameters.
   */
  updatePagination: PropTypes.func
};


export default Header;