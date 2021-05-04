/**
 * @fileoverview Search interactions with the REST API.
 * 
 * @author Jeff Kinnison <jkinniso@nd.edu>
 *
 * @exports updateSourceText
 * @exports updateTargetText
 * @exports updateSearchParameters
 * @exports fetchStoplist
 * @exports initiateSearch
 * @exports getSearchStatus
 * @exports fetchResults
 * 
 * @requires NPM:axios
 * @requires NPM:lodash
 * @requires ../state/async
 * @requires ../state/search
 */
import { responsiveFontSizes } from '@material-ui/core';
import axios from 'axios';
import { batch } from 'react-redux';

import { setFetchingStoplist } from '../state/async';
import { updateResults, updateSearchID, updateSearchStatus,
         updateStopwords } from '../state/search';


/**
 * URL of the REST API as defined in the environment.
 */
const REST_API = process.env.REACT_APP_REST_API_URL;


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


export function runSearch(source, target, params) {
  return async dispatch => {
    let response = await fetchStoplist(params.feature, params.stoplist, params.stoplistBasis)(dispatch);

    if (response.status >= 400 && response.atatus < 600) {
      return;
    }

    response = await initiateSearch(source, target, params, response.stopwords)(dispatch);
    
    if (response.status >= 400 && response.atatus < 600) {
      return;
    }

    const searchID = response.data.search_id;
    while (response.status.toLowerCase() !== 'done') {
      response = await getSearchStatus(searchID);

      if (response.status >= 400 && response.atatus < 600) {
        return;
      }
    }

    await fetchResults(searchID)(dispatch);
  }
}


/**
 * Fetch the stoplist from the REST API with selected parameters.
 * 
 * @param {String} feature The token feature of the search.
 * @param {number} stopwords The size of the stoplist to create.
 * @param {String|String[]} stoplistBasis The source of frequency data.
 * @param {boolean} pending True if any AJAX calls are in progress.
 * @returns {function} Callback that calls dispatch to handle communication.
 */
export function fetchStoplist(feature, stopwords, stoplistBasis) {
  /** Parameters to send to the endpoint. */
  let params = {
    feature: feature,
    list_size: stopwords,
  };

  // Different stoplist bases have different nomenclature, so handle accordingly.
  if (stoplistBasis instanceof Array) {
    params.works = stoplistBasis;
  }
  else {
    params.language = stoplistBasis;
  }

  return dispatch => {
    axios({
      method: 'get',
      url: `${REST_API}/stopwords/`,
      crossDomain: true,
      responseType: 'json',
      params: params
    })
    .then(response => {
      dispatch(updateStopwords(response.data.stopwords));
      return response;
    })
    .catch(error => {

    });
  }
}


/**
 * Kick off a search by sending parameters to the REST API.
 * 
 * @param {Object} source Source text metadata.
 * @param {Object} target Target text metadata.
 * @param {Object} params Advanced options for the search.
 * @param {String[]} stopwords List of tokens to exclude from the search.
 * @param {boolean} pending True if any AJAX calls are in progress.
 * @returns {function} Callback that calls dispatch to handle communication.
 */
export function initiateSearch(source, target, params, stopwords, asyncReady) {
  return dispatch => {
    axios({
      method: 'post',
      url: `${REST_API}/parallels/`,
      crossDomain: true,
      headers: {
        contentType: 'x-www-form-urlencoded',
        'X-Requested-With': 'XMLHttpRequest'
      },
      responseType: 'json',
      data: {
        method: {
          name: 'original',
          feature: params.feature,
          stopwords: stopwords,
          freq_basis: params.frequencyBasis,
          max_distance: parseInt(params.maxDistance, 10),
          distance_basis: params.distanceBasis,
          score_basis: params.scoreBasis
        },
        page_number: 0,
        per_page: 100,
        sort_by: 'score',
        sort_order: 'descending',
        source: {
          object_id: source.object_id,
          units: params.unitType
        },
        target: {
          object_id: target.object_id,
          units: params.unitType
        },
      }
    })
    .then(response => {
      let searchID = [];
      
      if (response.headers.location !== undefined) {
        searchID = response.headers.location.match(/parallels[/]([\w\d]+)/);
      }
      
      else if (response.request.responseURL !== undefined) {
        searchID = response.request.responseURL.match(/parallels[/]([\w\d]+)/);
      }

      dispatch(updateSearchID(searchID))
      response.data.searchID = searchID;

      return response;
    })
    .catch(error => {
      return error.response
    });
  }
}


/**
 * Ping the REST API to get the status of a search.
 * 
 * @param {String} searchID The ID of the search obained when it was initiated.
 * @param {boolean} pending True if any AJAX calls are in progress.
 * @returns {function} Callback that calls dispatch to handle communication.
 */
export function getSearchStatus(searchID, asyncReady) {
  return dispatch => {
    axios({
      method: 'get',
      url: `${REST_API}/parallels/${searchID}/status/`,
      crossDomain: true,
      responseType: 'json',
      cacheControl: 'no-store'
    })
    .then(response => {})
    .catch(error => {});
  }
}


/**
 * Fetch available search results from the REST API.
 * 
 * @param {String} searchID The ID of the search obained when it was initiated.
 * @param {boolean} asyncReady True if the app is ready to send a request.
 * @param {number} currentPage The page of results to fetch.
 * @param {number} rowsPerPage The number of rows to fetch.
 * @param {String} sortLabel The table header to sort by.
 * @param {number} sortOrder 1 (asc) or -1 (desc)
 * @returns {function} Callback that calls dispatch to handle communication.
 */
export function fetchResults(searchID, asyncReady, currentPage = 0,
                             rowsPerPage = 100, sortLabel = 'score',
                             sortOrder = -1) {
  return async dispatch => {
    axios({
      method: 'get',
      url: `${REST_API}/parallels/${searchID}`,
      crossDomain: true,
      responseType: 'json',
      cacheControl: 'no-store',
      params: {
        page_number: currentPage,
        per_page: rowsPerPage,
        sort_by: sortLabel,
        sort_order: sortOrder === -1 ? 'descending' : 'ascending',
      }
    })
    .then(response => {})
    .catch(error => {});
  }
}