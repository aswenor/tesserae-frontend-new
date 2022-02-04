/**
 * @fileoverview Header columns with a button to ingest a text.
 * 
 * @author [Jeff Kinnison](https://github.com/jeffkinnison)
 * 
 * @exports CorpusViewerHeader
 * 
 * @requires NPM:react
 * @requires NPM:prop-types
 * @requires NPM:react-router-dom
 * @requires NPM:@mui/material
 * @requires NPM:@mui/icons-material
 * @requires ./IngestForm
 * @requires ../../state/pagination
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import makeStyles from '@mui/styles/makeStyles';
import Fab from '@mui/material/Fab';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Typography from '@mui/material/Typography';

import AddIcon from '@mui/icons-material/Add';

import IngestForm from './IngestForm';


/**
 * Whether or not we are in admin mode.
 */
const MODE = process.env.REACT_APP_MODE.toLowerCase() === 'admin';


const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.secondary.main,
  },
  cell: {
    backgroundColor: theme.palette.secondary.main,
  }
}));


/**
 * Header columns with a button to ingest a text.
 * 
 * @component
 * @example
 *  return (
 *    <CorpusViewerHeader
 *      sortHeader="author"
 *      sortOrder={1}
 *      updatePagination={(value) => {}}
 *    />
 *  );
 */
function CorpusViewerHeader(props) {
  const { sortHeader, sortOrder, updatePagination } = props;

  /** Flag indicating that the ingest form should be visible. */
  const [ ingestOpen, setIngestOpen ] = useState(false);

  const classes = useStyles();

  /**
   * Update pagination on header click.
   * 
   * @param {string} newHeader The column that was clicked.
   */
  const handleHeaderClick = newHeader => {
    // If the header did not change, update the sort order.
    // Otherwise update the header and set the order to ascending. 
    if (newHeader === sortHeader) {
      updatePagination({sortOrder: -sortOrder});
    }
    else {
      updatePagination({sortHeader: newHeader, sortOrder: 1});
    }
  };

  /** The header cells. Some are sortable and others are not. */
  const headCells = ['Source', 'Target', 'Multitext', 'Author', 'Title', 'Year', 'Genre', ''].map((item, idx) => {
    const order = sortOrder === 1 ? 'asc' : 'desc';
    // If not sortable, create a standard cell.
    // If sortable, create a sortable cell.
    // If at the end of the row, create the ingest button.
    if ((idx < 3 || idx > 5) && idx !== 7) {
      return (
        <TableCell
          className={classes.cell}
          key={item}
          variant="head"
        >
          <Typography><b>{item}</b></Typography>
        </TableCell>
      );
    }
    else if (MODE && idx === 7) {
      return (
        <TableCell
          align="right"
          className={classes.cell}
          colSpan={3}
          key={item}
          variant="head"
        >
          <Fab
            onClick={() => setIngestOpen(true)}
            variant="extended"
          >
            <AddIcon /> Add A Text
          </Fab>
          <IngestForm
            closeDialog={() => setIngestOpen(false)}
            open={ingestOpen}
          />
        </TableCell>
      );
    }
    else {
      return (
        <TableCell
          className={classes.cell}
          key={item}
          sortDirection={sortHeader.toLowerCase() === item.toLowerCase() ? order : false}
          variant="head"
        >
          <TableSortLabel
            active={sortHeader.toLowerCase() === item.toLowerCase()}
            direction={sortHeader.toLowerCase() === item.toLowerCase()
                       ? (sortOrder === 1 ? 'asc' : 'desc')
                       : 'asc'
            }
            onClick={() => handleHeaderClick(item.toLowerCase())}
          >  
            <Typography><b>{item}</b></Typography>
          </TableSortLabel>
        </TableCell>
      );
    }
  });

  return (
    <TableRow
      className={classes.root}
    >
      {headCells}
    </TableRow>
  );
}


CorpusViewerHeader.propTypes = {
  /**
   * The header text of the column to sort by.
   */
  sortHeader: PropTypes.string,

  /**
   * 1 for ascending, -1 for descending.
   */
  sortOrder: PropTypes.number,

  /**
   * Function to update the sort header and order.
   */
  updatePagination: PropTypes.func
};


// Do redux binding here.
export default CorpusViewerHeader;