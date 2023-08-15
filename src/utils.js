/**
 * @fileoverview Utility functions to be used generally.
 * 
 * @author [Jeff Kinnison](https://github.com/jeffkinnison)
 * 
 * @exports filterTexts
 * 
 * @requires NPM:lodash
 * @requires NPM:@mui/material
 */
import { includes, inRange, split } from 'lodash';

import Typography from '@mui/material/Typography';



/**
 * Filter a text list based on user-defined parameters.
 * 
 * @param {Object[]} texts The list of texts to filter.
 * @param {String} type One of 'all', 'poetry', or 'prose'.
 * @param {String} authorFilter Search string for the author. 
 * @param {String} titleFilter Search string for the title.
 * @param {Number[]} years Double of [minYear, maxYear] time range.
 * @returns {Object[]} The filtered text list.
 */
export function filterTexts(texts, type, authorFilter, titleFilter, years) {
  const filterType = type.toLowerCase() === 'prose';
  const authorPattern = new RegExp(authorFilter, 'iu');
  const titlePattern = new RegExp(titleFilter, 'iu');

  return texts.filter(x => (
    (type.toLowerCase() === 'all' || x.is_prose === filterType) &&
    (authorFilter === '' || !x.author.search(authorPattern)) &&
    (titleFilter === '' || !x.title.search(titlePattern)) &&
    inRange(x.year, years[0], years[1] + 1)));
}


/**
 * Highlight relevant tokens in a snippet.
 * 
 * @param {String} snippet The snippet to highlight.
 * @param {String} tag Locus identifier for the snippet.
 * @param {Array} matchIndices The indices of the tokens to highlight.
 * @returns {Component} A Typography component with matches highlighted.
 */
export function highlightMatches(snippet, tag, matchIndices) {
  // Sorry in advance for the code/comment ratio, but this one required some explanation.

  // This RegExp will be weird to explain in comments.
  // For more information, see https://medium.com/@shemar.gordon32/how-to-split-and-keep-the-delimiter-s-d433fb697c65
  // Essentially, it splits the string and keeps the delimiters.
  // This is not guraranteed to work with all languages.
  const splitted = split(snippet, /(?=[\s.,;:?/!&'")(-])|(?<=[\s.,;:?/!&'")(-])/g);
  
  let wordStr = ''; // Collect multi-word parts here to reduce the number of components
  let tags = []; // Add each Typography component here.
  let wordIdx = 0; // Keep a counter of which word we are on for highlighting.

  // Iterate over each index in the array of split strings.
  for (let i in splitted) {
    // Determine if the current string is a word or non-word. If so, handle as described below, otherwise
    // add it to the `wordStr` buffer.
    // Note that all Typography components in this block are "span"
    // components rather than "p" components. This prevents the browser from rendering a newline for every Typography component.
    if (splitted[i].search(/[^\s.,;:?/!&'")(-]/) >= 0){

      // Determine if the current string is a match word. If so, compile the current`wordStr` into a
      // Typography component, compile the current string into a highlighted Typography component, and clear
      // the current `wordStr`. Otherwise, add the current string to the `wordStr` buffer.
      if (includes(matchIndices, wordIdx)) {
        if (wordIdx > 0 && wordIdx.length > 0) {
          tags.push(
            <Typography
              color="primary"
              component="span" 
              key={`${tag}-${tags.length}`}
            >
              {wordStr}
            </Typography>
          );
          wordStr = '';
        }
        tags.push(
          <Typography 
            component="span" 
            key={`${tag}-${tags.length}`} 
            color="primary"
          >
            {splitted[i]}
          </Typography>
        );
      }
      else {
        wordStr = `${wordStr}${splitted[i]}`;
      }
      wordIdx += 1;
    }
    else {
      wordStr = `${wordStr}${splitted[i]}`;
    }
  }

  // Compile the remaining parts of the snippet.
  tags.push(
    <Typography 
      component="span" 
      key={`${tag}-${tags.length}`}
      color="primary"
    >
      {wordStr}
    </Typography>
  );

  // Wrap the result in a "p" Typography component to contain it all.
  //return (<Typography>{tags}</Typography>);
  return tags;
}


/**
 * Busy wait for some amount of time.
 * 
 * @param {number} ms The amount of time to sleep in milliseconds.
 * @returns {Promise} Async Promise to await on for a blocking sleep.
 * 
 * @example
 *  return sleep(5000);
 */
 export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


/**
 * Convert a multi-word string to title case.
 * 
 * @param {String} str The string to convert.
 * 
 * @returns {String} `str` with the first letter of each word capitalized.
 * 
 * @todo Include the option to ignore words (per language?).
 * 
 * @example
 *   let title = 'bellum civile';
 *   return toTitleCase(title);
 */
 export function toTitleCase(str) {
  return str.toLowerCase().split().map(item => {
    if (item.length > 1) {
      return item.charAt(0).toUpperCase() + item.substring(1)
    }
    else {
      return item
    }
  }).join(' ');
}