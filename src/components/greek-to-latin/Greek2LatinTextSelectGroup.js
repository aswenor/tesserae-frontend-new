/** 
 * @fileoverview Set of dropdowns for selecting source and target texts (Greek-to-latin search).
 * 
 * @author [Jeff Kinnison](https://github.com/jeffkinnison)
 * @author [Abby Swenor] (https://github.com/aswenor)
 * 
 * @exports TextSelectGroup
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
  const { availableTexts, language, sourceDivision, sourceText,
          targetDivision, targetText, updateSource, updateSourceDivision,
          updateTarget, updateTargetDivision } = props

  /** Update selected text on user selection. */
  const handleTextChange = (text, updateFunc) => {
    updateFunc(text);
  }

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
          loading={availableTexts.length === 0}
          loadingText={`Loading ${language} corpus`}
          onOpen={() => {}}
          selection={sourceText}
          textList={availableTexts}
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
          loading={availableTexts.length === 0}
          loadingText={`Loading ${language} corpus`}
          onOpen={() => {}}
          selection={targetText}
          textList={availableTexts}
          title="Target Text"
        />
      </Grid>
    </Grid>
  );
}


Greek2LatinTextSelectGroup.propTypes = {
  /**
   * List of texts exposed by the REST API.
   */
  availableTexts: PropTypes.arrayOf(PropTypes.object),

  /**
   * The current language populating the UI.
   */
  language: PropTypes.string,

  /**
   * The currently selected source text subsection.
   */
  sourceDivision: PropTypes.string,

  /**
   * The currently selected source text.
   */
  sourceText: PropTypes.object,

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
  return {
    availableTexts: state.corpus.availableTexts,
    language: state.corpus.language,
    sourceDivision: state.search.sourceDivision,
    sourceText: state.search.sourceText,
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
