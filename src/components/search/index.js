import React from 'react';

import PageContainer from '../common/PageContainer';
import RightPanel from './RightPanel';
import SearchParametersForm from './SearchParametersForm';
import TwoPanelView from '../common/TwoPanelView';


function Search(props) {
  return (
    <PageContainer>
      <TwoPanelView
        leftMaxWidth={500}
        leftMinWidth={300}
        showToggle={true}
      >
        <SearchParametersForm />
        <RightPanel />
      </TwoPanelView>
    </PageContainer>
  );
}


export default Search;