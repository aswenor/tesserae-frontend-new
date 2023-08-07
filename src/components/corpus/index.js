import React, { useState } from 'react';
import { connect } from 'react-redux';

import CorpusViewer from './CorpusViewer';
import CorpusViewerSidebar from './CorpusViewerSidebar'
import PageContainer from '../common/PageContainer';
import TwoPanelView from '../common/TwoPanelView';


function Corpus(props) {
  const { textList } = props;

  const [ filteredTextList, setFilteredTextList ] = useState([...textList]);

  return (
    <PageContainer>
      <TwoPanelView
        leftMaxWidth={350}
        leftMinWidth={350}
        showToggle={false}
      >
        <CorpusViewerSidebar
          filteredTextList={filteredTextList}
          updateFilteredTextList={setFilteredTextList}
        />
        <CorpusViewer
          textList={filteredTextList}
        />
      </TwoPanelView>
    </PageContainer>
  );
}


function mapStateToProps(state) {
  return {
    textList: state.corpus.availableSourceTexts
  };
}


export default connect(mapStateToProps)(Corpus);