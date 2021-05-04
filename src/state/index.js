/**
 * @fileoverview Composed Redux application state management.
 * 
 * @author [Jeff Kinnison](https://github.com/jeffkinnison)
 * 
 * @exports DEFAULT_STATE
 * @exports tesseraeReducer
 * 
 * @requires NPM:redux
 */
import { combineReducers } from 'redux';

import { DEFAULT_STATE as asyncDefault, asyncReducer } from './async';
import { DEFAULT_STATE as corpusDefault, corpusReducer } from './corpus';
import { DEFAULT_STATE as multitextDefault, multitextReducer } from './multitext';
import { DEFAULT_STATE as paginationDefault, paginationReducer } from './pagination';
import { DEFAULT_STATE as searchDefault, searchReducer } from './search';
import { DEFAULT_STATE as textsDefault, textsReducer } from './texts';


/**
 * Default Tesserae application state at fresh load.
 */
export const DEFAULT_STATE = {
  async: asyncDefault,
  corpus: corpusDefault,
  multitext: multitextDefault,
  pagination: paginationDefault,
  search: searchDefault,
  texts: textsDefault
};


/**
 * Combine reducers for all state branches into one function.
 */
export const tesseraeReducer = combineReducers({
  async: asyncReducer,
  corpus: corpusReducer,
  multitext: multitextReducer,
  pagination: paginationReducer,
  search: searchReducer,
  texts: textsReducer,
});