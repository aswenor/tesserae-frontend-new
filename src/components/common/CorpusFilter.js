/**
 * @fileoverview Form to filter displays of the corpus contents.
 * 
 * @author [Jeff Kinnison](https://github.com/jeffkinnison)
 * 
 * @exports CorpusFilter
 * 
 * @requires NPM:react
 * @requires NPM:prop-types
 * @requires NPM:react-redux
 * @requires NPM:@material-ui/core
 * @requires NPM:@material-ui/styles
 * @requires ./TextSelectDropdowns
 * @requires ../../theme
 * @requires ./YearRangeSlider
 */
import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/Button';
import ThemeProvider from '@material-ui/styles/ThemeProvider'

import { clearFilter, updateFilter } from '../../state/corpus';
import TextSelectDropdowns from './TextSelectDropdowns';
import createTesseraeTheme from '../../theme';
import YearRangeSlider from './YearRangeSlider'


const useStyles = makeStyles(theme => ({
  button: {
    border: '1px solid #000000',
    boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.3)',
  },
  searchSpacer: {
    marginTop: theme.spacing(3),
  },
  yearSpacer: {
    marginTop: theme.spacing(6),
  },
}));


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


function CorpusFilter(props) {
  const { authorFilter, clearFilter, filteredTextList, loading, maxYear,
          minYear, titleFilter, typeFilter, updateFilter, yearFilter } = props;

  const classes = useStyles();

  const buttons = ['All', 'Poetry', 'Prose'].map(item => {
    return (
      <Button
        className={classes.button}
        color={typeFilter === item.toLowerCase() ? "secondary" : "default"}
        key={item.toLowerCase()}
        onClick={e => { updateFilter({type: item.toLowerCase()}); }}
        size="small"
        variant="contained"
      >
        {item}
      </Button>
    );
  });

  return (
    <Box
      direction="column"
      width={.75}
    >
      <ThemeProvider theme={createTesseraeTheme(localTheme)}>
        <Box className={classes.searchSpacer} width={1}></Box>
        <ButtonGroup
          className={classes.button}
          size="small"
        >
          {buttons}
        </ButtonGroup>
        <Box className={classes.searchSpacer} width={1}></Box>
        <TextSelectDropdowns
          handleAuthorChange={(value) => { updateFilter({author: value}); }}
          handleTitleChange={(value) => { updateFilter({title: value}); }}
          loading={loading}
          loadingText={"Loading corpus..."}
          onOpen={() => {}}
          selection={{author: authorFilter, title: titleFilter}}
          textList={filteredTextList}
          title={''}
        />
        <Box className={classes.yearSpacer} width={1}></Box>
        <YearRangeSlider
          maxYear={maxYear}
          minYear={minYear}
          selectYearRange={(value) => { updateFilter({year: value}); }}
          selectedYearRange={yearFilter}
          tickInterval={100}
        />
      </ThemeProvider>
    </Box>
  )
}


CorpusFilter.propTypes = {
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

  /** True if the corpus is still loading. */
  loading: PropTypes.bool,

  /** Maximum year to display on the publicaiton year filter. */
  maxYear: PropTypes.number,

  /** Minimum year to display on the publicaiton year filter. */
  minYear: PropTypes.number,

  /** List of texts available in the corpus. */
  textList: PropTypes.arrayOf(
    PropTypes.shape({
      /** Author of the text. */
      author: PropTypes.string,

      /** Title of the text. */
      title: PropTypes.string
    })
  )
};


function mapStateToProps(state) {
  return {
    authorFilter: state.corpus.filter.author,
    maxYear: state.corpus.maxYear,
    minYear: state.corpus.minYear,
    titleFilter: state.corpus.filter.title,
    typeFilter: state.corpus.filter.type,
    yearFilter: state.corpus.filter.year
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    clearFilter: clearFilter,
    updateFilter: updateFilter
  }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(CorpusFilter);