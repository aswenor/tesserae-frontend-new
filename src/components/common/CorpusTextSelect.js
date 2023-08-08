/** 
 * Very similar to the TextSelectDropdown on the live site because it does not include
 * the subsetion dropdowns but this one will also include the options for the year range 
 */

/**
 * @fileoverview Dropdown text select menus for the corpus viewer.
 * 
 * @author [Abby Swenor](https://github.com/aswenor)
 * 
 * @exports CorpusTextSelect
 * 
 * @requires NPM:react
 * @requires NPM:prop-types
 * @requires NPM:lodash
 * @requires NPM:@material-ui/core
 */

import React from 'react';
import PropTypes from 'prop-types';
import { isFunction, isNull, uniqBy } from 'lodash';

import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

/** CSS styles to apply to the component. */
const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
    },
    heading: {
      marginBottom: '10px'
    },
    select: {
      backgroundColor: theme.palette.default.main,
      marginBottom: '10px',
      [theme.breakpoints.up('md')]: {
  
      },
      [theme.breakpoints.down('sm')]: {
  
      }
    }
  }));
  
  function CorpusTextSelect(props) {
    const { handleAuthorChange, handleTitleChange, handleDateChange, loading,
            loadingText, onOpen, selection, textList, title } = props;

    /** CSS styles and global theme. */
    const classes = useStyles();

    /** Text list to select author, the first text in the list by each author. */
    const authorItems = uniqBy(textList, 'author').sort((a,b) => a.author > b.author);

    /** Text list to select title, filtered by author when an author is selected. */
    const textItems = textList.fitler(t => selection.author === '' || t.author.toLowerCase() === selection.author).sort((a,b) => a.title > b.title);

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
                className={classes.select}
                defaultValue={{author: '', title: ''}}
                getOptionLabel={option => option.author !== undefined ? option.author : ''}
                loading={loading}
                loadingText={loadingText}
                onChange={(event, value) => handleAuthorChange(!isNull(value) ? value : '')}
                onOpen={(event) => {onOpen()}}
                options={authorItems}
                renderInput={params => (
                    <TextField {...params}
                        fullWidth
                        placeholder={"Filter by Author"}
                        variant="outlined"
                    />
                )}
                value={selection}
            />
            <Autocomplete
                className={classes.select}
                defaultValue={{author: '', title: ''}}
                getOptionLabel={option => option.title !== undefined ? option.title : ''}
                loading={loading}
                loadingText={loadingText}
                onChange={(event, value) => handleTitleChange(!isNull(value) ? value : '')}
                onOpen={(event) => {onOpen()}}
                options={textItems}
                renderInput={params => (
                    <TextField {...params}
                        fullWidth
                        placeholder={"Filter by Text"}
                        variant="outlined"
                    />
                )}
                value={selection}
            />
        </div>
    );
  }

  CorpusTextSelect.propTypes = {
    /**
     * Callback to handle selecting an author in a dropdown.
     */
    handleAuthorChange: PropTypes.func,

    /**
     * Callback to handle selecting a text in a dropdown.
     */
    handleTitleChange: PropTypes.func,

    /**
     * Callback to handle selecting a date range.
     */
    handleDateChange: PropTypes.func,

    /**
     * Indicates whether or not the texts are loading from the REST API.
     */
    loading: PropTypes.bool,

    /**
     * Text to display when the texts are loading from the REST API.
     */
    loadingText: PropTypes.string,

    /**
     * Callback to handle opening either dropdown, e.g. kicking off loading texts
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
  }

  export default CorpusTextSelect;