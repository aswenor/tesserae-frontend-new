/**
 * @fileoverview Button group for language selection across different pages.
 * 
 * @author [Jeff Kinnison](https://github.com/jeffkinnison)
 * 
 * @exports LanguageSelectButtons
 * 
 * @requires NPM:react
 * @requires NPM:prop-types
 * @requires NPM:redux
 * @requires NPM:react-redux
 * @requires NPM:@material-ui/core
 * @requires NPM:@material-ui/icons
 * @requires ../../theme
 * @requires ../../state/corpus
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'

import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'

import createTesseraeTheme from '../../theme';
import { updateSelectedLanguage } from '../../state/corpus';


/** CSS styles to apply to the component. */
const useStyles = makeStyles(theme => ({
  button: {
    border: '1px solid #000000',
    boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.3)',
  },
  menuButton: {
    border: '1px solid #000000',
    boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.3)',
    background: '#bfbfbf'
  }
}));


/** Local theme override for button styling. */
const localTheme = {
  palette: {
    default: {
      main: '#ffffff'
    },
    primary: {
      main: '#757575'
    },
    secondary: {
      main: '#757575'
    },
  }
};


/**
 * Button group for language selection across different pages.
 * 
 * @component 
 * @example
 *   return (
 *     <LanguageSelectButtons
 *       language="latin"
 *       languages={['latin', 'greek', 'english', 'sanskrit', 'esperanto']}
 *       setSelectedLanguage={(language) => language}
 *     />
 *   )
 */
function LanguageSelectButtons(props) {
  const { language, languages, setSelectedLanguage } = props;

  /** CSS styles and global theme. */
  const classes = useStyles();

  /** Element to attach the languages dropdown to on open. */
  const [ anchorEl, setAnchorEl] = useState(null);

  /** Whether or not the languages dropdown is open. */
  const open = Boolean(anchorEl);

  let labels = [...languages];
  let buttons = [];

  // This setup assumes that we want at most three buttons displayed.
  // If three or fewer languages are available, create a distinct button to
  // select each language. If more than three are available, the third button
  // should instead be a dropdown to select from the additional languages
  // beyone the first two. This allows us to feature some languages (e.g.,
  // Latin and Greek) without having to create separate pages or a huge
  // collection of buttons.
  while (buttons.length < 3 && labels.length > 0) {
    // Create distinc buttons for the first two languages, and a third if
    // only three are available.
    if (buttons.length < 2 || (buttons.length === 2 && labels.length === 1)) {
      buttons.push(
        <Button
          className={classes.button}
          color={language === labels[0] ? 'secondary' : 'default'}
          key={labels[0]}
          onClick={() => setSelectedLanguage(labels[0])}
        >
          <Typography
            variant="button"
          >
            {labels[0]}
          </Typography>
        </Button>
      );

      // Remove this language from the array for ease of menu creation later.
      labels.shift();
    }
    // Create a dropdown with the third language onward if more than three
    // are available.
    else if (buttons.length === 2 && labels.length > 1) {
      buttons.push(
        <Button
          aria-controls={open ? 'additional-languages-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="menu"
          aria-label="select a language to search"
          className={classes.button}
          color={language === languages[0] || language === languages[1] ? 'secondary' : 'default'}
          onClick={(event) => setAnchorEl(event.currentTarget)}
        >
          <Typography
            variant="button"
          >
            <ArrowDropDownIcon />
            {language === languages[0] || language === languages[1] ? 'More...' : language}
          </Typography>
        </Button>
      )
    }
  }

  return (
    <Box>
      {/* Use a custom theme to match the nav bar. */}
      <ThemeProvider theme={createTesseraeTheme(localTheme)}>
        <ButtonGroup
          size="small"
          variant="contained"
        >
          {buttons}
        </ButtonGroup>
        {/* If more than three languages are present, this is where we put them. */}
        {languages.length > 3 &&
          <Popover
            anchorEl={anchorEl}
            anchorOrigin={{
              horizontal: 'center',
              vertical: 'bottom'
            }}
            onClose={() => setAnchorEl(null)}
            open={open}
            transformOrigin={{
              horizontal: 'center',
              vertical: 'top'
            }}
          >
            <MenuList>
              {labels.map(item => {
                return (
                  <MenuItem
                    key={item}
                    onClick={() => setSelectedLanguage(item)}
                    selected={item === language}
                  >
                    <Typography variant="button">
                      {item.toUpperCase()}
                    </Typography>
                  </MenuItem>
                )
              })}
            </MenuList>
          </Popover>
        }
      </ThemeProvider>
    </Box>
  );
}


LanguageSelectButtons.propTypes = {
  /** The current user-selected language. */
  language: PropTypes.string,

  /** The languages available to the application. */
  languages: PropTypes.arrayOf(PropTypes.string),

  /** Function to update application state on language selection. */
  setSelectedLanguage: PropTypes.func
}


/**
 * Add redux store state to this component's props.
 * 
 * @param {object} state The global state of the application.
 * @returns {object} Members of the global state to provide as props.
 */
function mapStateToProps(state) {
  return {
    language: state.corpus.language,
    languages: state.corpus.availableLanguages
  }
}


/**
 * Add redux store actions to this component's props.
 * @param {funciton} dispatch The redux dispatch function.
 */
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setSelectedLanguage: updateSelectedLanguage
  }, dispatch)
}


// Do redux binding here.
export default connect(mapStateToProps, mapDispatchToProps)(LanguageSelectButtons);