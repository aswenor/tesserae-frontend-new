/**
 * @fileoverview Input widget for selecting the frequency basis.
 * 
 * @author [Jeff Kinnison](https://github.com/jeffkinnison)
 * 
 * @exports FrequencyBasisInput
 * 
 * @requires NPM:react
 * @requires NPM:prop-types
 * @requires NPM:redux
 * @requires NPM:react-redux
 * @requires NPM:@material-ui/core
 * @requires ../../common/CollapseBox
 * @requires ../../../theme
 */
import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { batch, connect } from 'react-redux';

import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import FormControl from '@material-ui/core/FormControl';

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
 * Dropdown menu to select the frequency basis.
 * 
 * @component
 * 
 * @example
 *   const updateSearchParameters = update => update;
 *   return (
 *     <FrequencyBasisInput
 *       frequencyBasis="phrase"
 *       updateSearchParameters={updateSearchParameters}
 *     />
 *   );
 */
function FrequencyBasisInput(props) {
  const { clearSearchMetadata, frequencyBasis,
          updateSearchParameters } = props;

  const classes = useStyles();

  const handleChange = (newFrequencyBasis) => {
    batch(() => {
      clearSearchMetadata();
      updateSearchParameters({frequencyBasis: newFrequencyBasis});
    });
  };

  return (
    <CollapseBox
      headerText="Frequency Basis"
    >
      <Box>
        <ThemeProvider theme={createTesseraeTheme(localTheme)}>
          <FormControl
            margin="dense"
          >
            <ButtonGroup
              aria-label="select frequency basis"
              size="small"
            >
              <Button
                aria-label="corpus frequency basis"
                className={classes.button}
                color={frequencyBasis === 'corpus' ? 'secondary' : 'default'}
                onClick={() => { handleChange('corpus') }}
                variant='contained'
              >
                Corpus
              </Button>
              <Button
                aria-label="texts frequency basis"
                className={classes.button}
                color={frequencyBasis === 'texts' ? 'secondary' : 'default'}
                onClick={() => { handleChange('texts') }}
                variant='contained'
              >
                Texts
              </Button>
            </ButtonGroup>
          </FormControl>
        </ThemeProvider>
      </Box>
    </CollapseBox>
  );
}


FrequencyBasisInput.propTypes = {
  /**
   * FrequencyBasis currently selected.
   */
  frequencyBasis: PropTypes.string,

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
  return { frequencyBasis: state.search.searchParameters.frequencyBasis };
}


/**
 * Add redux store actions to this component's props.
 * @param {function} dispatch The redux dispatch function.
 */
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    clearSearchMetadata: clearSearchMetadata,
    updateSearchParameters: updateSearchParameters
  }, dispatch);
}


// Do redux binding here.
export default connect(mapStateToProps, mapDispatchToProps)(FrequencyBasisInput);