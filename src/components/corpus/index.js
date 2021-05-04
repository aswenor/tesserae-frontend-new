import React, { useState } from 'react';
import { connect } from 'react-redux';

import CorpusViewer from './CorpusViewer';
import CorpusViewerSidebar from './CorpusViewerSidebar'
import PageContainer from '../common/PageContainer';
import TwoPanelView from '../common/TwoPanelView';
import { filterTexts } from '../../utils';


function Corpus(props) {
  const { textList } = props;

  const [ filteredTextList, setFilteredTextList ] = useState([...textList]);

  function filterTextList(texts, type, authorFilter, titleFilter, years) {
    filterTexts(texts, type, authorFilter, titleFilter, years)
    setFilteredTextList([...filterTexts(
      texts,type, authorFilter, titleFilter, years
    )]);
  }

  console.log(filteredTextList);

  return (
    <PageContainer>
      <TwoPanelView
        leftMaxWidth={500}
        leftMinWidth={250}
        showToggle={false}
      >
        <CorpusViewerSidebar
          filteredTextList={filteredTextList}
        />
        <CorpusViewer
          textList={filteredTextList}
        />
      </TwoPanelView>
    </PageContainer>
  );
}


function mapStateToProps(state) {
  console.log(state.corpus)
  return {
    textList: state.corpus.availableTexts
  };
}


export default connect(mapStateToProps)(Corpus);