/**
 * Redux utilities for managing two-text search parameters and results.
 * 
 * @author Jeff Kinnison <jkinniso@nd.edu>
 * 
 * @exports DEFAULT_STATE
 * @exports resetSearch
 * @exports updateResults
 * @exports updateSearchID
 * @exports updateSearchParameters
 * @exports updateSearchStatus
 * @exports updateSourceText
 * @exports updateStopwords
 * @exports updateTargetText
 * @exports corpusReducer
 */


/**
 * Default state for async communications.
 */
 export const DEFAULT_STATE = {
  changingPage: false,
  results: [],
  resultsCount: 0,
  searchID: '',
  searchInProgress: false,
  searchParameters: {
    unitType: 'phrase',
    feature: 'lemmata',
    stoplist: 10,
    stoplistBasis: 'corpus',
    scoreBasis: 'form',
    frequencyBasis: 'corpus',
    maxDistance: '10 words',
    distanceBasis: 'frequency',
    dropScoresBelow: '6'
  },
  progress: [],
  status: '',
  sourceText: {author: '', title: ''},
  stopwords: [],
  targetText: {author: '', title: ''}
};


/**
 * Action identifiers to specify which update occurs.
 */
const CLEAR_RESULTS = 'CLEAR_RESULTS';
const CLEAR_SEARCH_METADATA = 'CLEAR_SEARCH_METADATA';
const CLEAR_SOURCE_TEXT = 'CLEAR_SOURCE_TEXT';
const CLEAR_STOPWORDS = 'CLEAR_STOPWORDS';
const CLEAR_TARGET_TEXT = 'CLEAR_TARGET_TEXT';
const RESET_SEARCH = 'RESET_SEARCH';
const UPDATE_CHANGE_PAGE = 'UPDATE_CHANGE_PAGE';
const UPDATE_RESULTS = 'UPDATE_RESULTS';
const UPDATE_SEARCH_ID = 'UPDATE_SEARCH_ID';
const UPDATE_SEARCH_IN_PROGRESS = 'UPDATE_SEARCH_IN_PROGRESS';
const UPDATE_SEARCH_PARAMETERS = 'UPDATE_SEARCH_PARAMETERS';
const UPDATE_SEARCH_STATUS = 'UPDATE_SEARCH_STATUS';
const UPDATE_SOURCE_TEXT = 'UPDATE_SOURCE_TEXT';
const UPDATE_STOPWORDS = 'UPDATE_STOPWORDS';
const UPDATE_TARGET_TEXT = 'UPDATE_TARGET_TEXT';



/**
 * Actions
 * 
 * These functions update the application state related to async communucations.
 */


/**
 * Clear current results to make way for a new search.
 * 
 * @returns {Object} A redux-style action.
 */
export function clearResults() {
  return {
    type: CLEAR_RESULTS,
    payload: {
      results: DEFAULT_STATE.results,
      resultsCount: DEFAULT_STATE.resultsCount,
      searchID: DEFAULT_STATE.searchID,
      progress: DEFAULT_STATE.progress,
      status: DEFAULT_STATE.searchStatus,
    }
  }
}


/**
 * Clear out metadata of a search without removing results.
 * 
 * @returns {Object} A redux-style action.
 */
export function clearSearchMetadata() {
  return {
    type: CLEAR_SEARCH_METADATA,
    payload: {
      searchID: DEFAULT_STATE.searchID,
      progress: DEFAULT_STATE.progress,
      status: DEFAULT_STATE.searchStatus,
    }
  };
}


/**
 * Clear the source text selection.
 * 
 * @returns {Object} A redux-style action.
 */
export function clearSourceText() {
  return {
    type: CLEAR_SOURCE_TEXT,
    payload: {
      sourceText: { ...DEFAULT_STATE.sourceText }
    }
  };
}


/**
 * Clear the current stoplist.
 * 
 * @returns {Object} A redux-style action.
 */
export function clearStopwords() {
  return {
    type: CLEAR_STOPWORDS,
    payload: {
      stopwords: DEFAULT_STATE.stopwords
    }
  }
}


/**
 * Clear the target text selection.
 * 
 * @returns {Object} A redux-style action.
 */
export function clearTargetText() {
  return {
    type: CLEAR_TARGET_TEXT,
    payload: {
      targetText: { ...DEFAULT_STATE.targetText }
    }
  };
}


/**
 * Reset the state of the search.
 *
 * @returns {Object} A redux-style action.
 */
export function resetSearch() {
  return {
    type: RESET_SEARCH,
    payload: {
      ...DEFAULT_STATE
    }
  }
}


/**
 * Update the page change in progress flag.
 * 
 * @param {Boolean} changingPage True if page change in progress, false otherwise.
 * @returns {Object} A redux-style action.
 */
export function updateChangePage(changingPage = DEFAULT_STATE.changingPage) {
  return {
    type: UPDATE_CHANGE_PAGE,
    payload: {
      changingPage: changingPage
    }
  }
}


/**
 * Update the results of a search.
 *
 * @param {Array} results The search results to display.
 * @param {Number} resultsCount the total number of search results.
 * @returns {Object} A redux-style action.
 */
export function updateResults(results = DEFAULT_STATE.results,
                              resultsCount = DEFAULT_STATE.resultsCount) {
  return {
    type: UPDATE_RESULTS,
    payload: {
      results: results,
      resultsCount: resultsCount
    }
  }
}


/**
 * Update the the database ID of a search.
 *
 * @param {String} searchID The database ID of the current search.
 * @returns {Object} A redux-style action.
 */
export function updateSearchID(searchID = DEFAULT_STATE.searchID) {
  return {
    type: UPDATE_SEARCH_ID,
    payload: {
      searchID: searchID
    }
  }
}


/**
 * Set the flag determining whether or not a search is running.
 * 
 * @param {bool} searchInProgress True if a search is running.
 * @returns {Object} A redux-style action.
 */
export function updateSearchInProgress(searchInProgress = DEFAULT_STATE.searchInProgress) {
  return {
    type: UPDATE_SEARCH_IN_PROGRESS,
    payload: {
      searchInProgress: searchInProgress
    }
  }
}


/**
*  Update additional parameters of a search.
*
* @param {Object} searchParameters Constraints/settings for the search
* @returns {Object} A redux-style action.
**/
export function updateSearchParameters(searchParameters = DEFAULT_STATE.searchParameters) {
  return {
    type: UPDATE_SEARCH_PARAMETERS,
    payload: {
      ...searchParameters
    }
  };
}


/**
*  Update the status of an in-progress search.
*
* @param {Object} status Status of the search.
* @param {Array} progress Progress indicators for the search.
* @returns {Object} A redux-style action.
**/
export function updateSearchStatus(status = DEFAULT_STATE.status,
                                   progress = DEFAULT_STATE.progress) {
  return {
    type: UPDATE_SEARCH_STATUS,
    payload: {
      progress: progress,
      status: status
    }
  };
}


/**
*  Update the search source text.
*
* @param {Object} sourceText - the new source text to search
* @returns {Object} A redux-style action.
**/
export function updateSourceText(sourceText = DEFAULT_STATE.sourceText) {
  sourceText = sourceText === null ? DEFAULT_STATE.sourceText : sourceText;
  return {
    type: UPDATE_SOURCE_TEXT,
    payload: {
      sourceText: sourceText
    }
  };
}


/**
*  Update the search source text.
*
* @param {Object} stopwords The list of words to exclude from the search.
* @returns {Object} A redux-style action.
**/
export function updateStopwords(stopwords = DEFAULT_STATE.stopwords) {
  return {
    type: UPDATE_STOPWORDS,
    payload: {
      stopwords: stopwords
    }
  };
}


/**
*  Update the search target text.
*
* @param {Object} targetText - the new target text to search
* @returns {Object} A redux-style action.
**/
export function updateTargetText(targetText = DEFAULT_STATE.targetText) {
  targetText = targetText === null ? DEFAULT_STATE.targetText : targetText;
  return {
    type: UPDATE_TARGET_TEXT,
    payload: {
      targetText: targetText
    }
  };
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
export function searchReducer(state = DEFAULT_STATE, action = {}) {
  switch (action.type) {
    case CLEAR_RESULTS:
    case CLEAR_SEARCH_METADATA:
    case CLEAR_SOURCE_TEXT:
    case CLEAR_STOPWORDS:
    case CLEAR_TARGET_TEXT:
    case RESET_SEARCH:
    case UPDATE_CHANGE_PAGE:
    case UPDATE_RESULTS:
    case UPDATE_SEARCH_ID:
    case UPDATE_SEARCH_IN_PROGRESS:
    case UPDATE_SEARCH_STATUS:
    case UPDATE_SOURCE_TEXT:
    case UPDATE_STOPWORDS:
    case UPDATE_TARGET_TEXT:
      return {
        ...state,
        ...action.payload
      }
    case UPDATE_SEARCH_PARAMETERS:
      return {
        ...state,
        searchParameters: {
          ...state.searchParameters,
          ...action.payload
        }
      }
    default:
      return state;
  }
}