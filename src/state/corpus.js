/**
 * Redux utilities for managing the available corpus.
 * 
 * @author Jeff Kinnison <jkinniso@nd.edu>
 * 
 * @exports DEFAULT_STATE
 * @exports updateAvailableLanguages
 * @exports updateAvailableTexts
 * @exports updateSelectedLanguage
 * @exports corpusReducer
 */
import { maxBy, minBy } from 'lodash';


/**
 * Default state for async communications.
 */
 export const DEFAULT_STATE = {
  availableLanguages: [],
  availableSourceTexts: [],
  availableTargetTexts: [],
  availableTexts: [],
  filter: {
    author: '',
    title: '',
    type: 'all',
    year: [-1000000, 1000000]
  },
  language: '',
  maxYear: 1000000,
  minYear: -1000000,
};


/**
 * Action identifiers to specify which update occurs.
 */
const CLEAR_FILTER = 'CLEAR_FILTER';
const UPDATE_AVAILABLE_LANGUAGES = 'UPDATE_AVAILABLE_LANGUAGES';
const UPDATE_AVAILABLE_SOURCE_TEXTS = 'UPDATE_AVAILABLE_SOURCE_TEXTS';
const UPDATE_AVAILABLE_TARGET_TEXTS = 'UPDATE_AVAILABLE_TARGET_TEXTS';
const UPDATE_AVAILABLE_TEXTS = 'UPDATE_AVAILABLE_TEXTS';
const UPDATE_FILTER = 'UPDATE_FILTER';
const UPDATE_SELECTED_LANGUAGE = 'UPDATE_SELECTED_LANGUAGE';


/**
 * Actions
 * 
 * These functions update the application state related to async communucations.
 */


/**
 * Clear the current corpus filter pattern.
 * 
 * @returns {Object} A redux-style action.
 */
 export function clearFilter() {
  return {
    type: CLEAR_FILTER,
    payload: {
      filter: {
        ...DEFAULT_STATE.filter
      }
    }
  }
}


/**
 * Update the languages exposed through the REST API.
 * 
 * @param {Array} availableLanguages List of languages with texts in the corpus.
 * @param {String} language The language to select from the list.
 * @returns {Object} A redux-style action.
 */
export function updateAvailableLanguages(availableLanguages = DEFAULT_STATE.availableLanguages,
                                         language = DEFAULT_STATE.language) {
  return {
    type: UPDATE_AVAILABLE_LANGUAGES,
    payload: {
      availableLanguages: availableLanguages,
      language: language
    }
  }
}

/** 
 * Update the texts exposed through the REST API.
 * 
 * @param {Array} availableTexts List of texts in the corpus in the selected language.
 * @returns {Object} A redux-style action.
 */
export function updateAvailableTexts(availableTexts = DEFAULT_STATE.availableTexts) {
  const maxYear = availableTexts.length > 0 ?
                  maxBy(availableTexts, 'year').year :
                  DEFAULT_STATE.filter.year[1];
  const minYear = availableTexts.length > 0 ?
                  minBy(availableTexts, 'year').year :
                  DEFAULT_STATE.filter.year[0];

  return {
    type: UPDATE_AVAILABLE_TEXTS,
    payload: {
      availableTexts: availableTexts,
      filter: {
        year: [minYear, maxYear]
      },
      maxYear: maxYear,
      minYear: minYear
    }
  }
}

/**
 * Update the source texts exposed through the REST API.
 * 
 * @param {Array} availableSourceTexts List of source texts in the corpus in the selected language.
 * @returns {Object} A redux-style action.
 */
export function updateAvailableSourceTexts(availableSourceTexts = DEFAULT_STATE.availableSourceTexts) {
  const maxYear = availableSourceTexts.length > 0 ?
                  maxBy(availableSourceTexts, 'year').year :
                  DEFAULT_STATE.filter.year[1];
  const minYear = availableSourceTexts.length > 0 ?
                  minBy(availableSourceTexts, 'year').year :
                  DEFAULT_STATE.filter.year[0];

  return {
    type: UPDATE_AVAILABLE_SOURCE_TEXTS,
    payload: {
      availableSourceTexts: availableSourceTexts,
      filter: {
        year: [minYear, maxYear]
      },
      maxYear: maxYear,
      minYear: minYear
    }
  }
}

/**
 * Update the texts exposed through the REST API.
 * 
 * @param {Array} availableTargetTexts List of texts in the corpus in the selected language.
 * @returns {Object} A redux-style action.
 */
export function updateAvailableTargetTexts(availableTargetTexts = DEFAULT_STATE.availableTargetTexts) {
  const maxYear = availableTargetTexts.length > 0 ?
                  maxBy(availableTargetTexts, 'year').year :
                  DEFAULT_STATE.filter.year[1];
  const minYear = availableTargetTexts.length > 0 ?
                  minBy(availableTargetTexts, 'year').year :
                  DEFAULT_STATE.filter.year[0];

  return {
    type: UPDATE_AVAILABLE_TARGET_TEXTS,
    payload: {
      availableTargetTexts: availableTargetTexts,
      filter: {
        year: [minYear, maxYear]
      },
      maxYear: maxYear,
      minYear: minYear
    }
  }
}


/**
 * Clear the current corpus filter pattern.
 * 
 * @returns {Object} A redux-style action.
 */
 export function updateFilter(filter = DEFAULT_STATE.filter) {
  return {
    type: UPDATE_FILTER,
    payload: {
      filter: {
        ...DEFAULT_STATE.filter,
        ...filter
      }
    }
  }
}



/**
 * Update the selected language to display in the app.
 * 
 * @param {Array} language List of languages with texts in the corpus.
 * @returns {Object} A redux-style action.
 */
export function updateSelectedLanguage(language = DEFAULT_STATE.language) {
  return {
    type: UPDATE_SELECTED_LANGUAGE,
    payload: {
      availableSourceTexts: DEFAULT_STATE.availableSourceTexts,
      availableTargetTexts: DEFAULT_STATE.availableTargetTexts,
      availableTexts: DEFAULT_STATE.availableTexts,
      language: language
    }
  }
}


/**
 * Reducer
 * 
 * This function commits changes requested by actions.
 */


/**
 * Update internal application state in reaction to an action.
 * 
 * @param {Object} state The current state of the application.
 * @param {Object} action The requested action to perform.
 * @returns {Object} A new state object with unaffected prior state and updates.
 */
export function corpusReducer(state = DEFAULT_STATE, action = {}) {
  switch (action.type) {
    case CLEAR_FILTER:
    case UPDATE_AVAILABLE_LANGUAGES:
    case UPDATE_AVAILABLE_SOURCE_TEXTS:
    case UPDATE_AVAILABLE_TARGET_TEXTS:
    case UPDATE_AVAILABLE_TEXTS:
    case UPDATE_FILTER:
    case UPDATE_SELECTED_LANGUAGE:
      return {
        ...state,
        ...action.payload,
        ...state.filter,
        ...action.payload.filter
      };
    default:
      return state;
  }
}