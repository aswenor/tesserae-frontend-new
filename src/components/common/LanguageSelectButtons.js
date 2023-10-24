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
 * @requires NPM:@mui/material
 * @requires NPM:@mui/icons-material
 * @requires ../../theme
 * @requires ../../state/corpus
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'

import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

import createTesseraeTheme from '../../theme';
import { fetchSourceTexts, fetchTargetTexts, updateLanguage } from '../../api/corpus';
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
  const { fetchSourceTexts, fetchTargetTexts, language, languages, setSelectedLanguage, updateLanguage } = props;

  /** CSS styles and global theme. */
  const classes = useStyles();

  /** Element to attach the languages dropdown to on open. */
  const [ anchorEl, setAnchorEl ] = useState(null);

  /** Whether or not the languages dropdown is open. */
  const open = Boolean(anchorEl);

  const changeLanguage = (language) => {
    //setSelectedLanguage(language);
    updateLanguage(language);
    fetchSourceTexts(language);
    fetchTargetTexts(language);
  };

  let buttons = [];
  let menuItems = [];

  for (let i = 0; i < languages.length; i++) {
    if (languages.length === 3 || i < 2) {
      buttons.push(
        <Button
          className={classes.button}
          color={language === languages[i] ? 'secondary' : 'default'}
          key={languages[i]}
          onClick={() => changeLanguage(languages[i])}
        >
          <Typography
            variant="button"
          >
            {languages[i]}
          </Typography>
        </Button>
      );
    }
    else if (languages.length > 3 && i === 2) {
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
      );

      menuItems.push(

      );
    }
  }

  return (
    <Box>
      {/* Use a custom theme to match the nav bar. */}
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={createTesseraeTheme(localTheme)}>
          <ButtonGroup
            ref={anchorEl}
            size="small"
            sx={{
              marginTop: (theme) => theme.spacing(2)
            }}
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
                {languages.slice(2, languages.length).map(item => {
                  return (
                    <MenuItem
                      key={item}
                      onClick={() => changeLanguage(item)}
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
      </StyledEngineProvider>
    </Box>
  );
}


LanguageSelectButtons.propTypes = {
  /** Function to fetch source texts from the REST API */
  fetchSourceTexts: PropTypes.func,

  /** Function to fetch target texts from the REST API */
  fetchTargetTexts: PropTypes.func,

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
    fetchSourceTexts: fetchSourceTexts,
    fetchTargetTexts: fetchTargetTexts,
    setSelectedLanguage: updateSelectedLanguage,
    updateLanguage: updateLanguage
  }, dispatch)
}


// Do redux binding here.
export default connect(mapStateToProps, mapDispatchToProps)(LanguageSelectButtons);