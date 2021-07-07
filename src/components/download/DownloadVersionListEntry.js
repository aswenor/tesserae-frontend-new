/**
 * @fileoverview One version of Tesserae for a specific OS.
 * 
 * @author [Jeff Kinnison](https://github.com/jeffkinnison)
 * 
 * @exports DownloadVersionListEntry
 * 
 * @requires NPM:react
 * @requires NPM:prop-types
 * @requires NPM:@material-ui/core
 * @requires NPM:@material-ui/icons
 */
import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';

import GetAppIcon from '@material-ui/icons/GetApp';


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
        >
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