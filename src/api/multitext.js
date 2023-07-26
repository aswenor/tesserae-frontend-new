import axios from 'axios';

import { runSearch } from './search';
import { updateChangePage,
         updateResults,
         updateSearchID,
         updateSearchInProgress,
         updateStatus } from '../state/multitext';


/**
 * URL of the REST API as defined in the environment.
 */
const REST_API = process.env.REACT_APP_REST_API_URL;


export function runMultitextSearch(language, source, target, params, multitextTargets) {
  return async dispatch => {
    dispatch(updateSearchInProgress(true));

    const searchID = await runSearch('original', language, source, target, params)(dispatch);
    console.log(searchID);

    if (searchID === null || searchID === undefined) {
      dispatch(updateSearchInProgress(false));
      return;
    }

    let response = await initiateSearch(searchID, multitextTargets, params.unitType)(dispatch);
    console.log(response);
    const multiSearchID = response.data.search_id;
    response.data.status = '';

    if (response.status >= 400 && response.status < 600) {
      dispatch(updateSearchInProgress(false));
      return;
    }

    while (response.data.status.toLowerCase() !== 'done') {
      response = await getSearchStatus(multiSearchID)(dispatch);
    
      if (response.status >= 400 && response.status < 600) {
        dispatch(updateSearchInProgress(false));
        return;
      }
    }

    response = await fetchResults(multiSearchID)(dispatch);
    dispatch(updateSearchInProgress(false));

    return multiSearchID;
  }
}


export function changePage(searchID, currentPage, rowsPerPage, sortLabel, sortOrder) {
  return async dispatch => {
    dispatch(updateChangePage(true));
    const response = fetchResults(searchID, currentPage, rowsPerPage, sortLabel, sortOrder)(dispatch);
    dispatch(updateChangePage(false));
  }
}


function normalizeScores(parallels, maxScore = 10) {
  const normedParallels = parallels.map(item => {
    const newScore = Math.round((item.score * 10) / maxScore);
    return {
      ...item,
      score: newScore <= 10 ? newScore : 10
    }
  });

  return normedParallels;
}


export function initiateSearch(searchID, multitextSelections, unit) {
  return async dispatch => {
    // Start a request to the parallels endpoint of the REST API.
    // This creates a Promise that resolves when a reqponse or error is received.
    return axios({
        method: 'post',
        url: `${REST_API}/multitexts/`,
        crossDomain: true,
        headers: {
          contentType: 'x-www-form-urlencoded'
        },
        responseType: 'json',
        cacheControl: 'no-store',
        data: {
          parallels_uuid: searchID,
          unit_type: unit,
          text_ids: multitextSelections.map(item => item.object_id),
        }
    })
    .then(response => {
      console.log('multitext response: ', response);
      let searchID = [];

      if (response.headers.location !== undefined) {
        searchID = response.headers.location.match(/multitexts[/]([\w\d]+)/)[1];
      }
      else if (response.request.responseURL !== undefined) {
        searchID = response.request.responseURL.match(/multitexts[/]([\w\d]+)/)[1];
      }

      dispatch(updateSearchID(searchID));

      response.data.search_id = searchID;
      
      return response;
    });
    // .catch(error => {
    //   return error.response;
    // });
  };
}


/**
 * Ping the REST API to get the status of a search.
 * 
 * @param {String} searchID The ID of the search obained when it was initiated.
 * @param {boolean} pending True if any AJAX calls are in progress.
 * @returns {function} Callback that calls dispatch to handle communication.
 */
export function getSearchStatus(searchID) {
  return dispatch => {
    // Start a request to the parallels endpoint of the REST API.
    // This creates a Promise that resolves when a reqponse or error is received.
    return axios({
      method: 'get',
      url: `${REST_API}/multitexts/${searchID}/status/`,
      crossDomain: true,
      responseType: 'json',
      cacheControl: 'no-store'
    })
    .then(response => {
      // On success, update the global state and return the status.

      if (response.data.status !== undefined) {
        dispatch(updateStatus(response.data.status, response.data.progress, response.data.message));
      }

      return response;
    })
    .catch(error => {
      return error.response;
    })
  }
}


/**
 * Fetch available texts of the selected language from the REST API.
 * 
 * @param {String} searchID The ID of the search obained when it was initiated.
 * @param {number} currentPage The page of results to fetch.
 * @param {number} rowsPerPage The number of rows to fetch.
 * @param {String} sortLabel The table header to sort by.
 * @param {number} sortOrder 1 (asc) or -1 (desc)
 * @returns {function} Callback that calls dispatch to handle communication.
 */
export function fetchResults(searchID, currentPage = 0,
                             rowsPerPage = 100, sortLabel = 'score',
                             sortOrder = -1) {
  return async dispatch => {
    // Start a request to the parallels endpoint of the REST API.
    // This creates a Promise that resolves when a reqponse or error is received.
    return axios({
      method: 'get',
      url: `${REST_API}/multitexts/${searchID}/`,
      crossDomain: true,
      responseType: 'json',
      cacheControl: 'no-store',
      params: {
        search_id: searchID,
        page_number: currentPage,
        per_page: rowsPerPage,
        sort_by: sortLabel,
        sort_order: sortOrder === -1 ? 'descending' : 'ascending',
      }
    })
    .then(response => {
      // On success, update the global state and return the results.
      // Because of strange design constraints and group consensus, normalize
      // all scores to be in range [0, 10].
      console.log(response);
      dispatch(updateResults(response.data.multiresults, response.data.total_count, response.data.max_score));
      return response;
    })
    .catch(error => {
      return error.response;
    });
  }
}