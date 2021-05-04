/**
 * @fileoverview Sidebar with text filter options.
 * 
 * @author [Jeff Kinnison](https://github.com/jeffkinnison)
 * 
 * @exports CorpusViewerSidebar
 * 
 * @requires NPM:react
 * @requires NPM:prop-types
 * @requires NPM:@material-ui/core
 * @requires ../common/BodyScrollTable
 * @requires ../common/CorpusFilter
 * @requires ./SearchButtons
 */
import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import CorpusFilter from '../common/CorpusFilter';
import LanguageSelectButtons from '../common/LanguageSelectButtons';
import SearchButtons from './SearchButtons';


/** CSS styles to apply to the component. */
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.secondary.main,
    scrollbarColor: theme.palette.secondary.main,
    scrollbarWidth: 0,
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      backgroundColor: theme.palette.secondary.main,
      width: '0em',
      display: 'none'
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      display: 'none',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      display: 'none',
      outline: '1px solid slategrey'
    }
  },
  spacer: {
    marginTop: theme.spacing(3)
  }
}));


/**
 * Sidebar with text filter options.
 * 
 * @component
 * @example
 *   let filter = {
 *     type: 'all',
 *     author: '',
 *     title: '',
 *     year: year: [-10000000, 100000000]
 *   };
 * 
 *   return (
 *     <CorpusViewerSidebar
 *       filter={filter}
 *       setFilter={() => {}}
 *     />
 *   );
 */
function CorpusViewerSidebar(props) {
  const { filteredTextList, textList } = props;

  /** CSS styles and global theme. */
  const classes = useStyles();

  return (
    <Box
      alignItems="center"
      className={classes.root}
      component="section"
      display="flex"
      flexDirection="column"
      flexGrow={1}
      height={'100%'}
      width={1}
    >
      <div className={classes.spacer}></div>
      <LanguageSelectButtons />
      <CorpusFilter
        filteredTextList={filteredTextList}
        loading={textList && textList.length > 0}
      />
      <div className={classes.spacer}></div>
      <SearchButtons />
    </Box>
  );
}


CorpusViewerSidebar.propTypes = {
  /** Callback to update the filter on changes. */
  filterTextList: PropTypes.func,

  /** Filtered list of texts available in the corpus. */
  filteredTextList: PropTypes.arrayOf(
    PropTypes.shape({
      /** Author of the text. */
      author: PropTypes.string,

      /** Title of the text. */
      title: PropTypes.string
    })
  ),

  /** List of texts available in the corpus. */
  textList: PropTypes.arrayOf(
    PropTypes.shape({
      /** Author of the text. */
      author: PropTypes.string,

      /** Title of the text. */
      title: PropTypes.string
    })
  )
}


export default CorpusViewerSidebar;