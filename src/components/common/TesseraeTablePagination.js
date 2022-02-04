import React from 'react';
import PropTypes from 'prop-types';

import makeStyles from '@mui/styles/makeStyles';
import TablePagination from '@mui/material/TablePagination';

import TablePaginationActions from './TablePaginationActions';


const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.secondary.main,
    borderTop: '1px solid rgba(224, 224, 224, 1)',
    bottom: 0,
    left: 0,
    overflow: 'hidden',
    position: 'sticky',
    top: 'auto',
    width: '100%',
    zIndex: 2
  }
}));


/**
 * Custom table pagination with results fetching on request.
 * 
 * @component
 */
function TesseraeTablePagination(props) {
  const { count, initialRowsPerPage, onPageChange, pagination,
          resetPagination, rowsPerPageLabel, rowsPerPageOptions,
          updatePagination } = props;
  
  const classes = useStyles();

  const handleChangePage = (event, newPage) => {
    updatePagination({currentPage: newPage});
  };

  const handleChangeRowsPerPage = (event) => {
    updatePagination({currentPage: 0, rowsPerPage: event.target.value});
  };

  return (
    <TablePagination
      ActionsComponent={TablePaginationActions}
      className={classes.root}
      count={count}
      labelRowsPerPage={rowsPerPageLabel}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      page={pagination.currentPage}
      rowsPerPage={pagination.rowsPerPage}
      rowsPerPageOptions={rowsPerPageOptions}
      variant="footer"
    />
  );
}


TesseraeTablePagination.propTypes = {
  pagination: PropTypes.shape({

  }),
  updatePagination: PropTypes.func
};


export default TesseraeTablePagination;