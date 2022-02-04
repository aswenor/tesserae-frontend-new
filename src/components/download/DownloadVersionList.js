/**
 * @fileoverview List of Tesserae downloads for a specific OS.
 * 
 * @author [Jeff Kinnison](https://github.com/jeffkinnison)
 * 
 * @exports DownloadVersionList
 * 
 * @requires NPM:react
 * @requires NPM:prop-types
 * @requires NPM:@mui/material
 * @requires ./DownloadVersionListEntry
 */
import React from 'react';
import PropTypes from 'prop-types';

import makeStyles from '@mui/styles/makeStyles';
import List from '@mui/material/List';

import DownloadVersionListEntry from './DownloadVersionListEntry';


/**
 * List of Tesserae downloads for a specific OS.
 * 
 * @component 
 * @example
 *  return (
 *    
 *  );
 */
function DownloadVersionList(props) {
  const { avatar, os, versions } = props;

  const links = versions.map(item => {
    return (
      <DownloadVersionListEntry
        avatar={avatar}
        os={os}
        url={item.url}
        version={item.version}
      />
    );
  });

  return (
    <List>
      {links}
    </List>
  );
}


DownloadVersionList.propTypes = {
  /**
   * OS avatar to display next to the entry.
   */
  avatar: PropTypes.string,

  /**
   * Operating system this version was compiled for.
   */
  os: PropTypes.string,

  /**
   * List of versions available for the OS.
   */
  versions: PropTypes.arrayOf(
    PropTypes.shape({
      /**
       * Download URL of this version.
       */
      url: PropTypes.string,

      /**
       * Version number/string.
       */
      version: PropTypes.string
    })
  )
};


export default DownloadVersionList;