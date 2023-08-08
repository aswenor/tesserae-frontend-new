import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import CorpusViewer from './CorpusViewer';
import CorpusViewerSidebar from './CorpusViewerSidebar'
import PageContainer from '../common/PageContainer';
import TwoPanelView from '../common/TwoPanelView';


/**
 * Filter a list of text by multiple metadata constraints.
 * 
 * @param {Object} text The text to filter.
 * @param {string} text.author The author of the text.
 * @param {boolean} text.is_prose Whether the text is prose or poetry.
 * @param {string} text.title The title of the text.
 * @param {number} text.year The year the text was published.
 * @param {Object} filter The user-selected filter values.
 * @param {string} filter.author String pattern to filter author by.
 * @param {boolean} filter.type "All", "Prose", "Poetry".
 * @param {string} filter.title String pattern to filter title by.
 * @param {number[]} filter.year Lower/upper bounds on the publication year.
 * 
 * @returns {boolean} True if the text meets all of the filter criteria.
 */
function filterText(text, filter) {
  /** If 'all', ignore. Otherwise determine if the type is 'prose',
   * then determine if the text's flag matches the selected type.
  */
 let typeFilter = true;
 if (filter.type.toLowerCase() !== 'all') {
  const isProse = filter.type === 'prose';
  typeFilter = isProse === text.is_prose;
 }

 // Search the text's author for the pattern if a pattern was supplied.
 const authorFilter = (
  filter.author === '' ||
  text.author.toLowerCase().search(filter.author) >= 0);

// Search the text's title for the pattern if a pattern was supplied.
const titleFilter = (
  filter.title === '' ||
  text.title.toLowerCase().search(filter.title) >= 0);

// Determine if the publication year falls in the supplied date range.
const yearFilter = (
  filter.year !== undefined &&
  (text.year >= filter.year[0] || text.year <= filter.year[1])
);

// Include the text ONLY if it meets all of the criteria.
return (typeFilter && authorFilter && titleFilter && yearFilter);
}


function Corpus(props) {
  const { availableTexts } = props;

  //const [ filteredTextList, setFilteredTextList ] = useState([...textList]);
  const [filter, setFilter] = useState({
    type: 'all',
    author: '',
    title: '',
    year: [-10000000, 100000000]
  });

  // The texts of the corpus filtered by the user-supplied criteria.
  const textList = availableTexts.filter(item => filterText(item, filter));

  return (
    <PageContainer>
      <TwoPanelView
        leftMaxWidth={350}
        leftMinWidth={350}
        showToggle={false}
      >
        <CorpusViewerSidebar
          //filteredTextList={filteredTextList}
          //updateFilteredTextList={setFilteredTextList}
          filter={filter}
          setFilter={setFilter}
          show={availableTexts.length > 0}
        />
        <CorpusViewer
          textList={textList}
        />
      </TwoPanelView>
    </PageContainer>
  );
}

Corpus.propTypes = {
  /**
   * Array of text metadata comprising the loaded corpus.
   */
  availableTexts: PropTypes.arrayOf(
    PropTypes.shape({
      /**
       * Name of the author of the text.
       */
      author: PropTypes.string,

      /**
       * Whether the text is prose or poetry.
       */
      isProse: PropTypes.bool,

      /**
       * Database ID of the text.
       */
      object_id: PropTypes.string,

      /**
       * Title of the text.
       */
      title: PropTypes.string,

      /**
       * Year that the text was published.
       */
      year: PropTypes.number
    })
  )
}

/**
 * 
 * @param {Object} state The global state of the application. 
 * @returns {Object} Members of the global state to provide as props.
 */
function mapStateToProps(state) {
  return {
    availableTexts: state.corpus.availableSourceTexts
  };
}


export default connect(mapStateToProps)(Corpus);