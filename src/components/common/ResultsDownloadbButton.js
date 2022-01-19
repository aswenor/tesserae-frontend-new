/**
 * @fileoverview Menu to download Tesserae search results.
 * 
 * @author [Jeff Kinnison](https://github.com/jeffkinnison)
 * 
 * @exports ResultsDownloadButton
 * 
 * @requires NPM:react
 * @requires NPM:prop-types
 * @requires NPM:@material-ui/core
 * @requires NPM:@material-ui/icons
 */
import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';

import DownArrowIcon from '@material-ui/icons/DownArrow';


/**
 * URL of the REST API as defined in the environment.
 */
 const REST_API = process.env.REACT_APP_REST_API_URL;


function ResultsDownloadButton(props) {
  const { fileTypes, searchID, searchStatus } = props;

  /**
   * Reference element for the popover to attach to. Set to the button when
   * the menu is open and to null when it is closed (shows/hides, respectivesly).
   */
  const [ anchorRef, setAnchorRef ] = useRef(null);
  
  /**
   * Menu items to display. Each item corresponds to a filetype and links to
   * the static download URL on the Tesserae server.
   */
  const menuItems = fileTypes.map(item => {
    return (
      <MenuItem
        component={a}
        href={`${REST_API}/${searchID}/${item}`}
      >
        <Typography>
          {item}
        </Typography>
      </MenuItem>
    );
  });

  return (
    <React.Fragment>
      {/* Enable the button when the current search has completed. */}
      <Fab
        disabled={searchStatus.toLowerCase() !== 'done'}
        onclick={(event) => { setAnchorRef(event.target); }}
      >
        <Typography>Download</Typography>
        <DownArrowIcon />
      </Fab>
      {/* The button opens a menu of filetypes; clicking a menu item kicks
          off the download and closes the menu. Clicking off of the menu
          also closes it. */}
      <Popover
        open={anchorRef}
        position="bottom center"
        ref={}
      >
        <Menu
          onClose={() => { setAnchorRef(null); }}
        >
          {menuItems}
        </Menu>
      </Popover>
    </React.Fragment>
  );
}


ResultsDownloadButton.propTypes = {
  /**
   * Available filetypes exposed by the REST API.
   */
  fileTypes: PropTypes.arrayOf(PropTypes.string),

  /**
   * Database ID of the search.
   */
  searchID: PropTypes.string,

  /**
   * Running status of the current search.
   */
  searchStatus: PropTypes.string
};


export default ResultsDownloadButton;