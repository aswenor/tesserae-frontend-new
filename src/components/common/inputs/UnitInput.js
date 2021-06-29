/**
 * @fileoverview Input widget for selecting the unit type.
 * 
 * @author [Jeff Kinnison](https://github.com/jeffkinnison)
 * 
 * @exports UnitInput
 * 
 * @requires NPM:react
 * @requires NPM:prop-types
 * @requires NPM:redux
 * @requires NPM:react-redux
 * @requires NPM:@material-ui/core
 */
import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { batch, connect } from 'react-redux';

import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import CollapseBox from '../../common/CollapseBox';
import createTesseraeTheme from '../../../theme';

import { clearSearchMetadata, updateSearchParameters } from '../../../state/search';


/** CSS styles to apply to the component. */
const useStyles = makeStyles(theme => ({
  button: {
    border: '1px solid #000000',
    boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.3)',
  }
}));


/** Local theme override for nav button styling. */
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
 * Dropdown menu to select the unit type.
 * 
 * @component
 * 
 * @example
 *   const updateSearchParameters = update => update;
 *   return (
 *     <UnitInput
 *       unit="phrase"
 *       updateSearchParameters={updateSearchParameters}
 *     />
 *   );
 */
function UnitInput(props) {
  const { clearSearchMetadata, unit, updateSearchParameters } = props;

  const classes = useStyles();

  const handleChange = (newUnit) => {
    batch(() => {
      clearSearchMetadata();
      updateSearchParameters({unitType: newUnit});
    });
  };

  return (
    <CollapseBox
      headerText="Unit"
    >
      <Box>
        <ThemeProvider theme={createTesseraeTheme(localTheme)}>
          <FormControl
            margin="dense"
          >
            <ButtonGroup
              aria-label="select unit type"
              size="small"
            >
              <Button
                aria-label="line unit type"
                className={classes.button}
                color={unit === 'line' ? "primary" : "default"}
                onClick={() => { handleChange('line') }}
                variant="contained"
              >
                Line
              </Button>
              <Button
                aria-label="phrase unit type"
                className={classes.button}
                color={unit === 'phrase' ? "primary" : "default"}
                onClick={() => { handleChange('line') }}
                variant="contained"
              >
                Phrase
              </Button>
            </ButtonGroup>
          </FormControl>
        </ThemeProvider>
      </Box>
    </CollapseBox>
  );
}


UnitInput.propTypes = {
  /**
   * Unit currently selected.
   */
  unit: PropTypes.string,

  /**
   * Callback to update the selected search parameters.
   */
  updateSearchParameters: PropTypes.func
}


/**
 * Add redux store state to this component's props.
 * 
 * @param {object} state The global state of the application.
 * @returns {object} Members of the global state to provide as props.
 */
function mapStateToProps(state) {
  return { unit: state.search.searchParameters.unitType };
}


/**
 * Add redux store actions to this component's props.
 * @param {funciton} dispatch The redux dispatch function.
 */
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    clearSearchMetadata: clearSearchMetadata,
    updateSearchParameters: updateSearchParameters
  }, dispatch);
}


// Do redux binding here.
export default connect(mapStateToProps, mapDispatchToProps)(UnitInput);