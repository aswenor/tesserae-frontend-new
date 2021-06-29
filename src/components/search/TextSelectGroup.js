/** 
 * @fileoverview Set of dropdowns for selecting source and target texts.
 * 
 * @author [Jeff Kinnison](https://github.com/jeffkinnison)
 * 
 * @exports TextSelectGroup
 * 
 * @requires NPM:react
 * @requires NPM:prop-types
 * @requires NPM:redux
 * @requires NPM:react-redux
 * @requires NPM:@material-ui/core
 * @requires ../common/TextSelectDropdowns
 * @requires ../../state/search
 */
import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';

import TextSelectDropdowns from '../common/TextSelectDropdowns';
import { updateSourceText, updateTargetText } from '../../state/search';


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
function TextSelectGroup(props) {
  const { availableTexts, language, sourceText, targetText,
          updateSource, updateTarget } = props

  /** Update selected text on user selection. */
  const handleTextChange = (text, updateFunc) => {
    updateFunc(text);
  }

  return (
    <Grid container
      alignContent="center"
      alignItems="center"
      justify="flex-start"
      spacing={2}
    >
      <Grid item
        align="center"
        xs={12}
      >
        {/* Source text selection. */}
        <TextSelectDropdowns
          handleAuthorChange={(value) => handleTextChange(value, updateSource)}
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
          handleAuthorChange={(value) => handleTextChange(value, updateTarget)}
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


TextSelectGroup.propTypes = {
  /**
   * List of texts exposed by the REST API.
   */
  availableTexts: PropTypes.arrayOf(PropTypes.object),

  /**
   * The current language populating the UI.
   */
  language: PropTypes.string,

  /**
   * The currently selected source text.
   */
  sourceText: PropTypes.object,
  
  /**
   * The currently selected target text.
   */
  targetText: PropTypes.object,

  /**
   * Function to select a new source text from the dropdown menu.
   */
  updateSource: PropTypes.func,
  
  /**
   * Function to select a new target text from the dropdown menu.
   */
  updateTarget: PropTypes.func
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
    sourceText: state.search.sourceText,
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
    updateSource: updateSourceText,
    updateTarget: updateTargetText
  }, dispatch);
}


// Do redux binding here.
export default connect(mapStateToProps, mapDispatchToProps)(TextSelectGroup);