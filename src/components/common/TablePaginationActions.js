/**
 * @fileoverview More pagination options for large tables.
 * 
 * @author [Jeff Kinnison](https://github.com/jeffkinnison)
 * 
 * @exports TablePagination
 * 
 * @requires NPM:react
 * @requires NPM:prop-types
 * @requires NPM:lodash
 * @requires NPM:@mui/material
 * @requires NPM:@mui/icons-material
 */
import React from 'react';
import PropTypes from 'prop-types';

import { useTheme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import IconButton from '@mui/material/IconButton';

import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';


const useStyles = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5)
  }
}));


function TablePaginationActions(props) {
  const { count, onPageChange, page, rowsPerPage } = props;

  const classes = useStyles();
  const theme = useTheme();

  const totalPages = Math.ceil(count / rowsPerPage) - 1;
  const prevPage = Math.max(page - 1, 0);
  const nextPage = Math.min(page + 1, totalPages);

  return (
    <span
      className={classes.root}
    >
      <IconButton
        aria-label="first page"
        disabled={page === 0}
        onClick={(event) => onPageChange(event, 0)}
        size="large">
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        aria-label="previous page"
        disabled={page === 0}
        onClick={(event) => onPageChange(event, prevPage)}
        size="large">
        {theme.direction === 'rtl'
         ? <KeyboardArrowRightIcon />
         : <KeyboardArrowLeftIcon />
        }
      </IconButton>
      <IconButton
        aria-label="next page"
        disabled={page === totalPages}
        onClick={(event) => onPageChange(event, nextPage)}
        size="large">
        {theme.direction === 'rtl'
         ? <KeyboardArrowLeftIcon />
         : <KeyboardArrowRightIcon />
        }
      </IconButton>
      <IconButton
        aria-label="last page"
        disabled={page === totalPages}
        onClick={(event) => onPageChange(event, totalPages)}
        size="large">
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </span>
  );
}


TablePaginationActions.propTypes = {
  count: PropTypes.number,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  updatePaging: PropTypes.func,
  onPageChange: PropTypes.func
};


export default TablePaginationActions;