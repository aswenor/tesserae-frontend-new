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
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { filter, isNumber, isString, maxBy, minBy, uniqBy } from 'lodash';

import { makeStyles } from '@material-ui/core/styles';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import ThemeProvider from '@material-ui/styles/ThemeProvider'

import { filterTexts } from '../../utils';
import createTesseraeTheme from '../../theme';
import TypeButtonGroup from './TypeButtonGroup';
import YearRangeSlider from './YearRangeSlider';


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
  const { availableTexts, filteredTextList, updateFilteredTextList } = props;

  const [ yearRange, setYearRange ] = useState([-10000, 10000]);

  const [ textFilter, setFilter ] = useState({
    author: '',
    title: '',
    type: 'all',
    year: [-10000, 10000]
  });

  useEffect(() => {
    const numbersOnly = filter(availableTexts, t => isNumber(t.year));
    const minYear = Math.floor(minBy(numbersOnly, 'year').year / 100) * 100;
    const maxYear = Math.ceil(maxBy(numbersOnly, 'year').year / 100) * 100;

    setYearRange([minYear, maxYear]);

    setFilter({
      author: '',
      title: '',
      type: 'all',
      year: [minYear, maxYear]
    });
  }, [availableTexts, setFilter, setYearRange]);

  console.log(yearRange);

  useEffect(() => {
    updateFilteredTextList(
      filterTexts(
        availableTexts,
        textFilter.type,
        textFilter.author,
        textFilter.title,
        textFilter.year
      )
    );
  }, [availableTexts, textFilter, updateFilteredTextList]);

  const classes = useStyles();

  return (
    <Box
      alignContent="center"
      alignItems="center"
      justifyContent="center"
      justifyItems="center"
      width={.75}
    >
      <ThemeProvider theme={createTesseraeTheme(localTheme)}>
        <Box className={classes.searchSpacer} width={1}></Box>
        <TypeButtonGroup
          setTypeFilter={value => { setFilter(prev => ({...prev, type: value}));; }}
          typeFilter={textFilter.type}
        />
        <Box className={classes.searchSpacer} width={1}></Box>
        <Autocomplete
          autoComplete
          defaultValue={""}
          filterOptions={createFilterOptions({matchFrom: 'start'})}
          getOptionSelected={option => option === textFilter.author}
          onChange={(event, value) => { setFilter(prev => ({...prev, author: isString(value) ? value : ''})); }}
          onInputChange={(event, value) => { setFilter(prev => ({...prev, author: isString(value) ? value : ''})); }}
          options={uniqBy(filteredTextList, 'author').map(item => item.author)}
          renderInput={params => (
            <TextField {...params}
              fullWidth
              placeholder={"Filter by author"}
              variant="outlined"
            />
          )}
        />
        <Autocomplete
          autoComplete
          defaultValue={""}
          filterOptions={createFilterOptions({matchFrom: 'start'})}
          getOptionSelected={option => option === textFilter.title}
          onChange={(event, value) => { setFilter(prev => ({...prev, title: isString(value) ? value : ''})); }}
          onInputChange={(event, value) => { setFilter(prev => ({...prev, title: isString(value) ? value : ''})); }}
          options={filteredTextList.filter(item => item.author === textFilter.author).map(item => item.title)}
          renderInput={params => (
            <TextField {...params}
              fullWidth
              placeholder={"Filter by title"}
              variant="outlined"
            />
          )}
        />
        <Box className={classes.yearSpacer} width={1}></Box>
        <YearRangeSlider
          maxYear={yearRange[1]}
          minYear={yearRange[0]}
          selectYearRange={(value) => { setFilter(prev => ({...prev, year: value})); }}
          selectedYearRange={textFilter.year}
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
    availableTexts: state.corpus.availableTexts
  }
}


export default connect(mapStateToProps)(CorpusFilter);