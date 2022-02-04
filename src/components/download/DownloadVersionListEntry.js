/**
 * @fileoverview One version of Tesserae for a specific OS.
 * 
 * @author [Jeff Kinnison](https://github.com/jeffkinnison)
 * 
 * @exports DownloadVersionListEntry
 * 
 * @requires NPM:react
 * @requires NPM:prop-types
 * @requires NPM:@mui/material
 * @requires NPM:@mui/icons-material
 */
import React from 'react';
import PropTypes from 'prop-types';

import makeStyles from '@mui/styles/makeStyles';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';

import GetAppIcon from '@mui/icons-material/GetApp';


/**
 * 
 * @param {*} props 
 * @returns 
 */
function DownloadVersionListEntry(props) {
  const { avatar, os, url, version } = props;
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          {avatar}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={version}
        secondary={`for ${os}`}
      />
      <ListItemSecondaryAction>
        <IconButton
          aria-label={`download-version-${version}-for-${os}`}
          component={Link}
          edge="end"
          href={url}
          size="large">
          <GetAppIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}


DownloadVersionListEntry.propTypes = {
  /**
   * Path to the OS avatar to display.
   */
  avatar: PropTypes.string,

  /**
   * Operating system this version is for.
   */
  os: PropTypes.string,

  /**
   * Download URL.
   */
  url: PropTypes.string,

  /**
   * Version number/string.
   */
  version: PropTypes.string
};


export default DownloadVersionListEntry;