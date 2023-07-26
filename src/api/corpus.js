/**
 * @fileoverview Retrieve corpus metadata from the REST API.
 * 
 * @author [Jeff Kinnison](https://github.com/jeffkinnison)
 * 
 * @exports fetchLanguages
 * @exports fetchSourceTexts
 * @exports fetchTargetTexts
 * 
 * @requires NPM:axios
 * @requires NPM:lodash
 * @requires NPM:react-redux
 * @requires ../state/async
 * @requires ../state/corpus
 * @requires ../state/search
 */

import axios from 'axios';
import { difference, find, hasIn, isUndefined, union } from 'lodash';

import { registerError } from '../state/async';
import { updateAvailableLanguages,
         updateAvailableSourceTexts, updateAvailableTargetTexts } from '../state/corpus';
import { updateSourceText, updateTargetText } from '../state/search';


/**
 * URL of the REST API as defined in the environment.
 */
const REST_API = process.env.REACT_APP_REST_API_URL;


/**
 * 
 * @returns 
 */
export function initialFetch() {
  return async dispatch => {
    let response = await fetchLanguages()(dispatch);
    console.log(response);

    if (response.status >= 400 && response.status < 600) {
      return;
    }

    await fetchSourceTexts(response.data.language)(dispatch);
    await fetchTargetTexts(response.data.language)(dispatch);
  }
}


/**
 * Fetch the list of languages available in the corpus. 
 */
export function fetchLanguages() {
  return async dispatch => {
    return axios({
      method: 'get',
      url: `${REST_API}/languages/`,
      crossDomain: true,
      responseType: 'json'
    })
    .then(response => {
      const languages = response.data.languages.map(item => item.toLowerCase()).sort();
      const defaults = union(languages, ['greek', 'latin']).reverse();
      const others = difference(languages, defaults).sort();

      /**
       * Choose Latin as default, then fall back to Greek,
       * and if neither is available select the first listed language.
       */
      const language = (languages.indexOf('latin') !== undefined
        ? 'latin'
        : languages.indexOf('greek') !== undefined
          ? 'greek'
          : languages.length > 0
            ? languages[0]
            : ''
      );

      dispatch(updateAvailableLanguages([...defaults, ...others], language));

      response.data.language = language;
      return response;
    })
    .catch(error => {
      dispatch(registerError(error));
      return error
    });
  };
}


/**
 * Fetch the list of texts available for a language.
 * 
 * @param {String} language The language of the texts to fetch.
 
export function fetchTexts(language) {
  return async dispatch => {
    return axios({
      method: 'get',
      url: `${REST_API}/texts/`,
      crossDomain: true,
      responseType: 'json',
      params: {
        language: language.toLowerCase()
      }
    })
    .then(response => {
      const texts = response.data.texts.sort((a, b) => 
        a.author > b.author || (a.author === b.author && a.title > b.title)
      );

      if (texts.length > 1) {
        const source = (language.toLowerCase() === 'latin'
          ? find(texts, {author: 'vergil', title: 'aeneid'})
          : undefined
        );

        const target = (language.toLowerCase() === 'latin'
          ? find(texts, {author: 'lucan', title: 'bellum civile'})
          : undefined
        );

        dispatch(updateSourceText(!isUndefined(source) ? source : texts[0]));
        dispatch(updateTargetText(!isUndefined(target) ? target : texts[-1]));
      }
      
      dispatch(updateAvailableTexts(texts));
      return texts;
    })
    .catch(error => {
      dispatch(registerError(error));
      return error
    })
  };
}
*/

/**
 * Fetch the list of texts available for the source.
 * 
 * @param {String} language The language of the texts to fetch.
 */
export function fetchSourceTexts(language) {
  return async dispatch => {
    return axios({
      method: 'get',
      url: `${REST_API}/texts/`,
      crossDomain: true,
      responseType: 'json',
      params: {
        language: language.toLowerCase()
      }
    })
    .then(response => {
      const sourceTexts = response.data.texts.sort((a,b) =>
        a.author > b.author || (a.author === b.author && a.title > b.title)
      );
        let source = undefined;

        if (language.toLowerCase() === 'latin') {
          source = find(texts, {author: 'vergil', title: 'aeneid'});
        }
        else if (language.toLowerCase() === 'greek') {
          source = find(texts, {author: 'homer', title: 'iliad'});
        }

        dispatch(updateSourceText(!isUndefined(source) ? source : sourceTexts[0]));

      dispatch(updateAvailableSourceTexts(sourceTexts));
      return sourceTexts;
    })
    .catch(error => {
      dispatch(registerError(error));
      return error
    })
  };
}

/**
 * Fetch the list of available target texts in the language.
 * 
 * @param {String} language The language of the texts to fetch.
 */
export function fetchTargetTexts(language) {
  return async dispatch => {
    return axios({
      method: 'get',
      url: `${REST_API}/texts/`,
      crossDomain: true,
      responseType: 'json',
      params: {
        language: language.toLowerCase()
      }
    })
    .then(response => {
      const targetTexts = response.data.texts.sort((a,b) =>
        a.author > b.author || (a.author === b.author && a.title > b.title)
      );
        let target = undefined;

      if (language.toLowerCase() === 'latin') {
        target = find(texts, {author: 'lucan', title: 'bellum civile'});
      }
      else if (language.toLowerCase() === 'greek') {
        target = find(texts, {author: 'apollonius', title: 'agronautica'});
      }

      dispatch(updateTargetText(!isUndefined(target) ? target : texts[-1]));

      dispatch(updateAvailableTargetTexts(targetTexts));
      return targetTexts;
    })
    .catch(error => {
      dispatch(registerError(error));
      return error
    })
  };
}



export function ingestText() {}


export function updateTextMetadata() {}


export function deleteTexts() {}