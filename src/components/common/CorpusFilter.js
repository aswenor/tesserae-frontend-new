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
 * @requires NPM:@mui/material
 * @requires NPM:@mui/styles
 * @requires ./TextSelectDropdowns
 * @requires ../../theme
 * @requires ./YearRangeSlider
 */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { filter, isNumber, isString, maxBy, minBy, uniqBy } from 'lodash';

import makeStyles from '@mui/styles/makeStyles';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import { filterTexts } from '../../utils';
import createTesseraeTheme from '../../theme';
import TypeButtonGroup from './TypeButtonGroup';
import YearRangeSlider from './YearRangeSlider';
import CorpusTextSelect from './CorpusTextSelect';


const useStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3)
  },
  spacer: {
    marginTop: '15px',
    width: '100%'
  }
}));

function CorpusFilter(props) {
  const { availableTexts, authorFilter, dateRangeFilter, language, setAuthorFilter,
          setDateRangeFilter, setTitleFilter, setTypeFilter, titleFilter, typeFilter } = props;

  const classes = useStyles();

  const [ yearRange, setYearRange ] = useState([-10000, 10000]);

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

  return (
    <div className={classes.root}>
      <div className={classes.spacer}></div>
      <Typography variant="h5">Filter Corpus By</Typography>
      <div className={classes.spacer}></div>
      <TypeButtonGroup
        setTypeFilter={setTypeFilter}
        typeFilter={typeFilter}
      />
      <div className={classes.spacer}></div>
      <CorpusTextSelect
        handleAuthorChange={setAuthorFilter}
        handleTitleChange={setTitleFilter}
        handeDateChange={setDateRangeFilter}
        loading={availableTexts.length === 0}
        loadingText={`Loading ${language} corpus`}
        onOpen={() => {}}
        textList={availableTexts}
        selection={{author: authorFilter, title: titleFilter}}
      />
      <div className={classes.spacer}></div>
      <YearRangeSlider
        maxYear={yearRange[1]}
        minYear={yearRange[0]}
        selectYearRange={(value) => { setFilter(prev => ({...prev, year: value})); }}
        selectedYearRange={textFilter.year}
        tickInterval={100}
      />
    </div>
  );
}

CorpusFilter.propTypes = {
  /**
   * List of available texts for viewing.
   */
  availableTexts: PropTypes.arrayOf(PropTypes.shape({
      /**
       * Author of the text.
       */
      author: PropTypes.string,

      /**
       * Title of the text.
       */
      title: PropTypes.string
    })
  ),

  /**
   * Filter for the author in the list of texts.
   */
  authorFilter: PropTypes.string,

  /**
   * Filter for the date range for the texts.
   */
  dateRangeFilter: PropTypes.arrayOf(PropTypes.number),

  /**
   * Function to set the author filter.
   */
  setAuthorFilter: PropTypes.func,

  /**
   * Function to set the date range filter.
   */
  setDateRangeFilter: PropTypes.func,

  /**
   * Function to set the title filter.
   */
  setTitleFilter: PropTypes.func,

  /**
   * Function to set the type filter.
   */
  setTypeFilter: PropTypes.func,

  /** 
   * Filter for the title of the text.
   */
  titleFilter: PropTypes.string,

  /**
   * Filter for the type of the text. (All/Prose/Poetry)
   */
  typeFilter: PropTypes.string,

  /**
   *  Maximum year to display on the publicaiton year filter. 
   */
  maxYear: PropTypes.number,

  /** 
   * Minimum year to display on the publicaiton year filter. 
   */
  minYear: PropTypes.number
};

/**
 * Add redux store state to this component's props.
 * 
 * @param {object} state The global state of the application.
 * @returns {object} Members of the global state to provide as props.
 */
function mapStateToProps(state) {
  return {
    availableTexts: state.corpus.availableSourceTexts,
    language: state.corpus.language
  };
}

export default connect(mapStateToProps)(CorpusFilter); 

/**

const useStyles = makeStyles(theme => ({
  autocomplete: {
    backgroundColor: '#ffffff'
  },
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
      <StyledEngineProvider injectFirst>
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
            isOptionEqualToValue={option => option === textFilter.author}
            onChange={(event, value) => { setFilter(prev => ({...prev, author: isString(value) ? value : ''})); }}
            onInputChange={(event, value) => { setFilter(prev => ({...prev, author: isString(value) ? value : ''})); }}
            options={uniqBy(filteredTextList, 'author').map(item => item.author)}
            renderInput={params => (
              <TextField {...params}
                className={classes.autocomplete}
                fullWidth
                placeholder={"Filter by author"}
                variant="outlined"
              />
            )}
          />
          <Box className={classes.searchSpacer} width={1}></Box>
          <Autocomplete
            autoComplete
            defaultValue={""}
            filterOptions={createFilterOptions({matchFrom: 'start'})}
            isOptionEqualToValue={option => option === textFilter.title}
            onChange={(event, value) => { setFilter(prev => ({...prev, title: isString(value) ? value : ''})); }}
            onInputChange={(event, value) => { setFilter(prev => ({...prev, title: isString(value) ? value : ''})); }}
            options={filteredTextList.filter(item => item.author === textFilter.author).map(item => item.title)}
            renderInput={params => (
              <TextField {...params}
                className={classes.autocomplete}
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
      </StyledEngineProvider>
    </Box>
  );
}


CorpusFilter.propTypes = {
  // Callback to update the filter on changes. 
  filterTextList: PropTypes.func,

  // Filtered list of texts available in the corpus. 
  filteredTextList: PropTypes.arrayOf(
    PropTypes.shape({
      // Author of the text. 
      author: PropTypes.string,

      // Title of the text. 
      title: PropTypes.string
    })
  ),

  // True if the corpus is still loading. 
  loading: PropTypes.bool,

  // Maximum year to display on the publicaiton year filter. 
  maxYear: PropTypes.number,

  // Minimum year to display on the publicaiton year filter. 
  minYear: PropTypes.number,

  // List of texts available in the corpus. 
  textList: PropTypes.arrayOf(
    PropTypes.shape({
      // Author of the text. 
      author: PropTypes.string,

      // Title of the text. 
      title: PropTypes.string
    })
  )
};


function mapStateToProps(state) {
  return {
    availableTexts: state.corpus.availableSourceTexts
  }
}


export default connect(mapStateToProps)(CorpusFilter);