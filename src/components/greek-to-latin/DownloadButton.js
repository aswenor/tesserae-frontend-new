import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import makeStyles from '@mui/styles/makeStyles';
import CircularProgress from '@mui/material/CircularProgress';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import Fab from '@mui/material/Fab';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Popover from '@mui/material/Popper';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import GetAppIcon from '@mui/icons-material/GetApp';

import { downloadResults } from '../../api/search';


const useStyles = makeStyles(theme => ({
  root: {
    // display: 'flex'
  }
}));


function DownloadMenu(props) {
  const { downloadResults, searchID, searchStatus } = props;
  const classes = useStyles();
  const [anchor, setAnchor] = useState(null);
  const open = Boolean(anchor);

  const handleOpen = (event) => {
    setAnchor(event.currentTarget);
  }

  const handleClose = (event) => {
    setAnchor(null);
  }

  const handleSelect = (label) => {
    handleClose();
    downloadResults(searchID, label.toLowerCase());
  };

  return (
    <div
      className={classes.root}
    >
      <Fab
        aria-controls={open ? "download-menu" : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        color="primary"
        disabled={searchID === '' || searchStatus.toLowerCase() !== 'done'}
        onClick={open ? handleClose : handleOpen}
        ref={anchor}
        size="large"
        variant="extended"
      >
        <GetAppIcon /> Download <Divider variant="vertical" /> <ArrowDropDownIcon />
      </Fab>
      <Menu
        anchorEl={anchor}
        anchorOrigin={{
          horizontal: 'center',
          vertical: 'bottom'
        }}
        id='download-menu'
        onClose={handleClose}
        open={open}
        transformOrigin={{
          horizontal: 'center',
          vertical: 'bottom'
        }}
      >
        <MenuItem
          onClick={() => handleSelect('json')}
        >
          JSON
        </MenuItem>
        <MenuItem
          onClick={() => handleSelect('csv')}
        >
          CSV
        </MenuItem>
        <MenuItem
          onClick={() => handleSelect('tsv')}
        >
          Tab-Separated
        </MenuItem>
        <MenuItem
          onClick={() => handleSelect('xml')}
        >
          XML
        </MenuItem>
      </Menu>
    </div>
  );
}


function DownloadProgress(props) {
  return (
    <Fab
      color="primary"
      disabled={true}
      size="large"
      variant="extended"
    >
      <CircularProgress /> Preparing File
    </Fab>
  );
}



function DownloadButton(props) {
  const { downloadInProgress, downloadResults, searchID, searchStatus } = props;
  const classes = useStyles();

  return downloadInProgress
        ? <DownloadProgress />
        : <DownloadMenu downloadResults={downloadResults} searchID={searchID} searchStatus={searchStatus} />
}


DownloadButton.propTypes = {
  downloadInProgress: PropTypes.bool,
  downloadResults: PropTypes.func,
  searchID: PropTypes.string
}


function mapStateToProps(state) {
  return {
      downloadInProgress: state.search.downloadInProgress,
      searchID: state.search.searchID,
      searchStatus: state.search.status
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    downloadResults: downloadResults
  }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(DownloadButton);
