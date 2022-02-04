import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import makeStyles from '@mui/styles/makeStyles';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';

import { clearTexts } from '../../../state/multitext';
import MultitextSelectDialog from '../select/MultitextSelectDialog';


const useStyles = makeStyles(theme => ({
  header: {
    backgroundColor: theme.palette.secondary.main
  },
  titleCell: {
    backgroundColor: theme.palette.secondary.main,
    border: 'none',
    width: '90%'
  },
  unbordered: {
    backgroundColor: theme.palette.secondary.main,
    border: 'none'
  }
}));


function Header(props) {
  const { clearMultitextTargets, multitextTargetsCount } = props;

  const [ dialogOpen, setDialogOpen ] = useState(false);

  const classes = useStyles();

  return (
    <TableHead
      className={classes.header}
    >
      <TableRow
        className={classes.header}
      >
        <TableCell
          align="left"
          className={classes.titleCell}
          colSpan={2}
        >
          <Typography variant='h5'>
            Multitext Targets
          </Typography>
        </TableCell>
        <TableCell
          align="center"
          padding="checkbox"
          className={classes.unbordered}
        >
          <Tooltip
            placement="top"
            title="Select Multitext Targets"
          >
            <IconButton
              onClick={() => { setDialogOpen(true) }}
              size="small"
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
        </TableCell>
        <TableCell
          align="center"
          padding="checkbox"
          className={classes.unbordered}
        >
          <Tooltip
            placement="top"
            title="Clear All"
          >
            <span>
              <IconButton
                disabled={multitextTargetsCount === 0}
                onClick={clearMultitextTargets}
                size="small"
              >
                <ClearIcon />
              </IconButton>
              <MultitextSelectDialog
                closeDialog={() => { setDialogOpen(false) }}
                open={dialogOpen}
              />
            </span>
          </Tooltip>
        </TableCell>
      </TableRow>
    </TableHead>
  );
}


Header.propTypes = {
  clearMultitextTargets: PropTypes.func,
  multitextTargetsCount: PropTypes.number,
};


function mapStateToProps(state) {
  return {
    multitextTargetsCount: state.multitext.selectedTexts.length
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    clearMultitextTargets: clearTexts
  }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Header);