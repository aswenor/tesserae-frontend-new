/**
 * Redux utilities for managing async communications.
 * 
 * @author [Jeff Kinnison](https://github.com/jeffkinnison)
 * 
 * @exports DEFAULT_STATE
 * @exports clearError
 * @exports registerError
 * @exports asyncReducer
 */

/**
 * Default state for async communications.
 */
 export const DEFAULT_STATE = {
  errors: [],  // Error queue for AJAX requests
  fetchingStoplist: null,
  maxErrorQueueSize: 10,  // Maximum error queue size
};


/**
 * Action identifiers to specify which update occurs.
 */
const CLEAR_ERROR = 'CLEAR_ERROR';
const REGISTER_ERROR = 'REGISTER_ERROR';
const SET_FETCHING_STOPLIST = 'SET_FETCHING_STOPLIST';


/**
 * Actions
 * 
 * These functions update the application state related to async communucations.
 */


/**
 * Remove an error from the error message queue.
 * 
 * @param {number} index The index of the error to clear from the queue. 
 * @returns {Object} A redux-style object.
 */
export function clearError(index) {
  return {
    type: CLEAR_ERROR,
    payload: {
      error: index
    }
  }
}


/**
 * Add an error to the error message queue.
 * 
 * @param {Object} error Information about the error that occurred. 
 * @returns {Object} A redux-style object.
 */
 export function registerError(error) {
  return {
    type: REGISTER_ERROR,
    payload: {
      error: error
    }
  }
}


/**
 * Set the flag determining if a stoplist fetch is in progress.
 * 
 * @param {Promise} flag The in-progress promise.
 */
export function setFetchingStoplist(flag) {
  return {
    type: SET_FETCHING_STOPLIST,
    payload: {
      fetchingStoplist: flag
    }
  }
}



/**
 * Update internal application state in reaction to an action.
 * 
 * @param {Object} state The current state of the application.
 * @param {Object} action The requested action to perform.
 * @returns {Object} A new state object with unaffected prior state and updates.
 */
export function asyncReducer(state = DEFAULT_STATE, action = {}) {
  switch (action.type) {
    case CLEAR_ERROR:
      return {
        ...state,
        errors: state.errors.splice(action.payload.error, 1)
      };
    case REGISTER_ERROR:
      let errors = [...state.errors, action.payload.error];
      
      if (errors.length >= state.maxErrorQueueSize) {
        const diff = errors.length - state.maxErrorQueueSize;
        errors = state.errors.slice(diff, errors.length);
      }

      return {
        ...state,
        errors: [...errors]
      }
    default:
      return state;
  }
}