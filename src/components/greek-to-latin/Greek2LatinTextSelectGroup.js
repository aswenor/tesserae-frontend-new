/** 
 * @fileoverview Set of dropdowns for selecting source and target texts (Greek-to-latin search).
 * 
 * @author [Jeff Kinnison](https://github.com/jeffkinnison)
 * @author [Abby Swenor] (https://github.com/aswenor)
 * 
 * @exports Greek2LatinTextSelectGroup
 * 
 * @requires NPM:react
 * @requires NPM:prop-types
 * @requires NPM:redux
 * @requires NPM:react-redux
 * @requires NPM:@mui/material
 * @requires ../common/TextSelectDropdowns
 * @requires ../../state/search
 */
import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Grid from '@mui/material/Grid';

import TextSelectDropdowns from '../common/TextSelectDropdowns';
import { updateSourceDivision, updateSourceText,
         updateTargetDivision, updateTargetText } from '../../state/search';
import { updateSelectedLanguage } from '../../state/corpus'
import { fetchTexts } from '../../api/corpus'


/**
 * Set of dropdowns for selecting source and target texts.
 * 
 * @component
 * @example
 *  import React, { useState } from 'react';
 * 
 *  const availableTexts = [
 *    {author: 'Steve', object_id: 'foo', 'title': 'foo'},
 *    {author: 'Abigail', object_id: 'bar', 'title': 'bar'},
 *    {author: 'Neil', object_id: 'baz', 'title': 'baz'},
 *    {author: 'Tiberius', object_id: 'quux', 'title': 'quux'},
 *    {author: 'Homer', object_id: 'meep', 'title': 'meep'},
 *    {author: 'Bart', object_id: 'moop', 'title': 'moop'},
 *  ];
 *  
 *  const [ sourceText, setSourceText ] = useState(availableTexts[0]);
 *  const [ targetText, setTargetText ] = useState(availableTexts[1]);
 * 
 *  return(
 *    <TextSelectGroup
 *      availableTexts={availableTexts}
 *      language="latin"
 *      sourceText={sourceText}
 *      targetText={targetText}
 *      updateSource={setSourceText}
 *      updateTarget={setTargetText}
 *    />
 *  );
 */
function Greek2LatinTextSelectGroup(props) {
  const { //sourceAvailableTexts, sourceLanguage, 
          sourceDivision, sourceText,
          //targetAvailableTexts, targetLanguage, 
          targetDivision, targetText, updateSource, updateSourceDivision,
          updateTarget, updateTargetDivision } = props

  /** Update selected text on user selection. */
  const handleTextChange = (text, updateFunc) => {
    updateFunc(text);
  }
  const sourceLanguage = 'greek';
  const targetLanguage = 'latin';
  const sourceAvailableTexts = Object.values(fetchTexts('greek'));
  const targetAvailableTexts = Object.values(fetchTexts('latin'));

  return (
    <Grid container
      alignContent="center"
      alignItems="center"
      justifyContent="flex-start"
      spacing={2}
    >
      <Grid item
        align="center"
        xs={12}
      >
        {/* Source text selection. */}
        <TextSelectDropdowns
          division={sourceDivision}
          handleAuthorChange={(value) => handleTextChange(value, updateSource)}
          handleDivisionChange={updateSourceDivision}
          handleTitleChange={(value) => handleTextChange(value, updateSource)}
          loading={sourceAvailableTexts.length === 0}
          loadingText={`Loading ${sourceLanguage} corpus`}
          onOpen={() => {}}
          selection={sourceText}
          textList={sourceAvailableTexts}
          title="Source Text"
        />
      </Grid>
      <Grid item 
        align="center"
        xs={12}
      >
        {/* Target text selection. */}
        <TextSelectDropdowns
          division={targetDivision}
          handleAuthorChange={(value) => handleTextChange(value, updateTarget)}
          handleDivisionChange={updateTargetDivision}
          handleTitleChange={(value) => handleTextChange(value, updateTarget)}
          loading={targetAvailableTexts.length === 0}
          loadingText={`Loading ${targetLanguage} corpus`}
          onOpen={() => {}}
          selection={targetText}
          textList={targetAvailableTexts}
          title="Target Text"
        />
      </Grid>
    </Grid>
  );
}


Greek2LatinTextSelectGroup.propTypes = {
  /**
   * List of source texts exposed by the REST API. (greek)
   */
  //sourceAvailableTexts: PropTypes.arrayOf(PropTypes.object),

  /**
   * The current source language populating the UI. (greek)
   */
  //sourceLanguage: PropTypes.string,

  /**
   * The currently selected source text subsection.
   */
  sourceDivision: PropTypes.string,

  /**
   * The currently selected source text.
   */
  sourceText: PropTypes.object,

  /**
   * List of target texts exposed by the REST API. (latin)
   */
  //targetAvailableTexts: PropTypes.arrayOf(PropTypes.object),

  /**
   * The current target language populating the UI. (latin)
   */
  //targetLanguage: PropTypes.string,

  /**
   * The currently selected target text subsection.
   */
  targetDivision: PropTypes.string,
  
  /**
   * The currently selected target text.
   */
  targetText: PropTypes.object,

  /**
   * Function to select a new source text from the dropdown menu.
   */
  updateSource: PropTypes.func,

  /**
   * Function to select a source text subsection.
   */
  updateSourceDivision: PropTypes.func,
  
  /**
   * Function to select a new target text from the dropdown menu.
   */
  updateTarget: PropTypes.func,

  /**
   * Function to select a target text subsection.
   */
  updateTargetDivision: PropTypes.func
};


/**
 * Add redux store state to this component's props.
 * 
 * @param {object} state The global state of the application.
 * @returns {object} Members of the global state to provide as props.
 */
const mapStateToProps = (state) => {
  updateSelectedLanguage('greek');
  const sourceTexts = state.corpus.availableTexts;
  updateSelectedLanguage('latin');
  const targetTexts = state.corpus.availableTexts;
  return {
    //availableTexts: state.corpus.availableTexts,
    //language: state.corpus.language,
    //sourceAvailableTexts: sourceTexts,
    //sourceLanguage: 'greek',
    sourceDivision: state.search.sourceDivision,
    sourceText: state.search.sourceText,
    //targetAvailableTexts: targetTexts,
    //targetLanguage: 'latin',
    targetDivision: state.search.targetDivision,
    targetText: state.search.targetText,
  };
};


/**
 * Add redux store actions to this component's props.
 * 
 * @param {function} dispatch The redux dispatch function.
 */
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateSourceDivision: updateSourceDivision,
    updateSource: updateSourceText,
    updateTargetDivision: updateTargetDivision,
    updateTarget: updateTargetText
  }, dispatch);
}


// Do redux binding here.
export default connect(mapStateToProps, mapDispatchToProps)(Greek2LatinTextSelectGroup);
