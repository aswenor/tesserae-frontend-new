/**
 * @fileoverview Dropdown menus for selecting Greek authors and texts to search.
 * 
 * @author [Jeff Kinnison](https://github.com/jeffkinnison)
 * @author [Abby Swenor](https://github.com/aswenor)
 * 
 * @exports GreekTextSelectDropdowns
 * 
 * @requires NPM:react
 * @requires NPM:prop-types
 * @requires NPM:lodash
 * @requires NPM:@mui/material
 */
import React from 'react';
import PropTypes from 'prop-types';
import { hasIn, isNull, isObject, uniqBy } from 'lodash';
import { connect } from 'react-redux';

import makeStyles from '@mui/styles/makeStyles';
import Autocomplete from '@mui/material/Autocomplete';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { updateSelectedLanguage } from '../../state/corpus';


/** CSS styles to apply to the component. */
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  heading: {
    marginBottom: '10px'
  },
  select: {
    backgroundColor: '#ffffff',
    marginBottom: '10px',
    width: '100%',
    [theme.breakpoints.up('md')]: {

    },
    [theme.breakpoints.down('lg')]: {

    }
  }
}));


/**
 * Aligned searchable dropdown menus for selecting author and text.
 * 
 * @component
 * 
 * @example
 *   const handleTextChange = (event) => event;
 *   const onOpen = (event) => event;
 *   const selection = {author: 'lucan', title: 'bellum civile'};
 *   const textList = [
 *     {author: 'lucan', title: 'bellum civile'},
 *     {author: 'vergil', title: 'aeneid'}
 *   ];
 *   return (
 *     <TextSelectGroup
 *        handleTextChange={handleTextChange}
 *        loading={false}
 *        loadingText="Loading text list..."
 *        onOpen={onOpen}
 *        selection={selection}
 *        textList={textList}
 *        title="Source Text"
 *     />
 *   )
 */
function GreekTextSelectDropdowns(props) {
  const { division, handleAuthorChange, handleDivisionChange,
          handleTitleChange, loading, loadingText, onOpen, selection,
          textList, title } = props;
  
  connect(updateSelectedLanguage('greek'));
  textList = state.corpus.availableTexts;


  console.log(division);
 
  /** CSS styles and global theme. */
  const classes = useStyles();
 
  /** Text list to select author, the first text in the list by each author. */
  const authorItems = uniqBy(textList, 'author').sort((a, b) => a.author > b.author);
 
  /** Text list to select title, filtered by author when an author is selected. */
  const textItems = textList.filter(t => selection.author === '' || t.author.toLowerCase() === selection.author).sort((a, b) => a.title > b.title);
 
  const isAuthorSelected = (option, value) => {
    return isObject(value)
      ? option.author.toLowerCase() === value.author.toLowerCase()
      : false;
     
  }

  const isTitleSelected = (option, value) => {
    return isObject(value)
      ? option.title.toLowerCase() === value.title.toLowerCase()
      : false;
  }

  let full = (
    <MenuItem
      key="Full Text"
      onClick={() => { handleDivisionChange('0'); }}
      selected={division === '0'}
      value="0"
    >
      Full Text
    </MenuItem>);

  let divisions = [];
  if (Boolean(selection.divisions)) {
    divisions = selection.divisions.map(item => {
      return (
        <MenuItem
          key={item}
          onClick={() => { handleDivisionChange(item); }}
          selected={division === item}
          value={item}
        >
          Book {item}
        </MenuItem>
      );
    });
  }

  return (
    <div>
      { title !== '' &&
        <Typography
          align="left"
          className={classes.heading}
          variant="h5"
        >
          {title}
        </Typography>
      }
      <Autocomplete
        autoComplete={true}
        className={classes.select}
        defaultValue={{author: '', title: ''}}
        getOptionLabel={option => { return hasIn(option, 'author') ? option.author : '' }}
        isOptionEqualToValue={isAuthorSelected}
        loading={loading}
        loadingText={loadingText}
        onChange={(event, value) => handleAuthorChange(!isNull(value) ? value : '')}
        // onInputChange={(event, value) => {console.log(value); handleAuthorChange(isString(value) ? value : '')}}
        onOpen={(event) => {onOpen()}}
        options={authorItems}
        renderInput={params => (
          <TextField {...params}
            fullWidth
            placeholder={"Select an Author"}
            variant="outlined"
          />
        )}
        value={selection}
      />
      <Autocomplete
        autoComplete={true}
        className={classes.select}
        defaultValue={{author: '', title: ''}}
        getOptionLabel={option => hasIn(option, 'title') ? option.title : ''}
        isOptionEqualToValue={isTitleSelected}
        loading={loading}
        loadingText={loadingText}
        onChange={(event, value) => handleTitleChange(!isNull(value) ? value : '')}
        // onInputChange={(event, value) => handleTitleChange(!isNull(value) ? value : '')}
        onOpen={(event) => {onOpen()}}
        options={textItems}
        renderInput={params => (
          <TextField {...params}
            fullWidth
            placeholder={"Select a Text"}
            variant="outlined"
          />
        )}
        value={selection}
      />
      <Select
        align="left"
        className={classes.select}
        value={division}
        variant="outlined"
      >
        {[full, ...divisions]}
      </Select>
    </div>
  );
}
 
 
GreekTextSelectDropdowns.propTypes = {
  /**
   * The text subsection to use in the search.
   */
  division: PropTypes.string,

  /**
   * Callback to handle selecting an author.
   */
  handleAuthorChange: PropTypes.func,

  /**
   * Callback to handle changing the text subsection.
   */
  handleDivisionChange: PropTypes.func,

  /**
   * Callback to handle selecting a text in either dropdown.
   */
  handleTextChange: PropTypes.func,

  /**
   * Indicates whether or not the texts are loading from the REST API.
   */
  loading: PropTypes.bool,

  /**
   * Text to display when the texts are loading from the REST API.
   */
  loadingText: PropTypes.string,

  /**
   * Callback to handle opening either dropdown, e.g. kicking off loading texts.
   */
  onOpen: PropTypes.func,

  /**
   * The current selection, propagated over both dropdowns.
   */
  selection: PropTypes.object,

  /**
   * List of texts to distribute over both dropdowns.
   */
  textList: PropTypes.arrayOf(PropTypes.object),

  /**
   * Text to display describing the purpose of these dropdowns.
   */
  title: PropTypes.string
};

/**
 * Add redux store state to this component's props.
 * 
 * @param {object} state The global state of the application.
 * @returns {object} Members of the global state to provide as props.
 */
const mapStatetoProps = (state) => {
  const action = updateSelectedLanguage('greek');
  connect(action);
  return {
    textList: state.corpus.availableTexts
  };
};


export default connect(mapStatetoProps)(GreekTextSelectDropdowns);
 
