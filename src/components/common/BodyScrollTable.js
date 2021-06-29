import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody'
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';

import { resetPagination, updatePagination } from '../../state/pagination';
import TesseraeTablePagination from './TesseraeTablePagination';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    height: '100%',
    margin: 0,
    padding: 0,
    width: '100%',
  },
  container: {
    height: '100%',
  },
  table: {
    overflowY: 'hidden',
  },
  header: {
    backgroundColor: theme.palette.secondary.main,
  },
  body: {
    height: '100%',
    overflowY: 'overlay'
  }
}));


function BodyScrollTable(props) {
  const { bodyCount, children, initialRowsPerPage, onPageChange,
          pagination, resetPagination, rowsPerPageLabel, rowsPerPageOptions,
          updatePagination } = props;

  const classes = useStyles();
  
  return (
    <Box
      alignContent="flex-start"
      alignItems="flex-start"
      className={classes.root}
      justifyContent="flex-start"
      justifyItems="flex-start"
      display="flex"
      flexDirection="column"
      m={0}
      p={0}
      width={1}
    >
      <Box
        height={'100%'}
        width={1}
      >
        <TableContainer className={classes.container}>
          <Table
            className={classes.table}
            stickyHeader
          >
            <TableHead
              className={classes.header}
            >
              {children[0]}
            </TableHead>
            <TableBody
              className={classes.body}
            >
              {children[1]}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TesseraeTablePagination
                  count={bodyCount}
                  initialRowsPerPage={initialRowsPerPage}
                  onPageChange={onPageChange}
                  pagination={pagination}
                  resetPagination={resetPagination}
                  rowsPerPageLabel={rowsPerPageLabel}
                  rowsPerPageOptions={rowsPerPageOptions}
                  updatePagination={updatePagination}
                />
              </TableRow>
            </TableFooter>
          </Table>
          
        </TableContainer>
      </Box>
    </Box>
  );
}


BodyScrollTable.propTypes = {
  bodyCount: PropTypes.number,
  bodyRows: PropTypes.arrayOf(PropTypes.element),
  headerRow: PropTypes.element,
  onPageChange: PropTypes.func,
  rowsPerPageLabel: PropTypes.string,
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number)
};


export default BodyScrollTable;