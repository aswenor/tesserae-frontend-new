// Default file for creating Greek-to-Latin search button 

/**
 * @fileoverview Button for Greek-to-Latin search method
 * 
 * @author [Abby Swenor](https://github.com/aswenor)
 * 
 * @exports MethodSelectButtons
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
import { connect } from 'react-redux';

import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import createTesseraeTheme from '../../theme';
import { fetchSourceTexts, fetchTargetTexts } from '../../api/corpus';
import { updateSelectedLanguage } from '../../state/corpus';
import { updateMethod } from '../../state/search';

// Need to add a state update for the method of the search ('default' to 'greek-to-latin')

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

function MethodSelectButtons(props) {
    const { method, language, fetchSourceTexts, fetchTargetTexts, setSelectedMethod } = props;

    /** CSS styles and global theme. */
    const classes = useStyles();

    /** Element to attach the methods dropdown to on open. */
    const [ anchorEl, setAnchorEl ] = useState(null);

    /** Whether or not the methods dropdown is open. */
    const open = Boolean(anchorEl);

    const methods = ['original', 'greek-to-latin'];

    const changeMethod = (method) => {
        setSelectedMethod(method);
        if (method.toLowerCase() === 'greek-to-latin') {
            fetchSourceTexts('greek');
            fetchTargetTexts('latin');
        }
        else {
            fetchSourceTexts(language);
            fetchTargetTexts(language);
        }
    };

    let buttons = [];
    let menuItems = [];

    for (let i = 0; i < methods.length; i++) {
        if (methods.length === 3 || i < 2) {
            buttons.push(
                <Button
                    className={classes.button}
                    color={method === methods[i] ? 'secondary' : 'default'}
                    key={methods[i]}
                    onClick={() => changeMethod(methods[i])}
                >
                    <Typography
                        variant="button"
                    >
                        {methods[i]}
                    </Typography>
                </Button>
            );
        }
        else if (methods.length > 3 && i === 2) {
            buttons.push(
                <Button
                    aria-controls={open ? 'additional-methods-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="menu"
                    aria-label="select a search method"
                    className={classes.button}
                    color={method === methods[0] || method === methods[1] ? 'secondary' : 'default'}
                    onClick={(event) => setAnchorEl(event.currentTarget)}
                >
                    <Typography
                        variant="button"
                    >
                        <ArrowDropDownIcon />
                        {method === methods[0] || method === methods[1] ? 'More...' : method}
                    </Typography>
                </Button>
            );

            menuItems.push(

            );
        }
    }

    return (
        <Box>
            {/* Use a custom theme to match the nav bar.  */}
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
                    {/* If more than three methods are present, this is where we put them. */}
                    {methods.length > 3 &&
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
                                {methods.slice(2, methods.length).map(item => {
                                    return (
                                        <MenuItem
                                            key={item}
                                            onClick={() => changeMethod(item)}
                                            selected={item === method}
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


MethodSelectButtons.propTypes = {
    /** Function to fetch source texts from the REST API */
    fetchSourceTexts: PropTypes.func,

    /** Function to fetch target texts from the REST API */
    fetchTargetTexts: PropTypes.func,

    /** The current user-selected method. */
    method: PropTypes.string,

    /** The current user-selected language. */
    language: PropTypes.string,

    /** Function to update application state on method selection. */
    setSelectedMethod: PropTypes.func

}

/** Add redux store state to this component's props. 
 * 
 * @param {object} state The global state of the application.
 * @returns {object} Members of the global state to provide as props.
*/
function mapStateToProps(state) {
    return {
        method: state.search.method,
        language: state.corpus.language
    }
}


/** Add redux store actions to this component's props.
 * 
 * @param {function} dispatch The redux dispatch function.
 */
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setSelectedMethod: updateMethod,
        fetchSourceTexts: fetchSourceTexts,
        fetchTargetTexts: fetchTargetTexts
    }, dispatch)
}

// Do the redux binding here.
export default connect(mapStateToProps, mapDispatchToProps)(MethodSelectButtons); 