import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';

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