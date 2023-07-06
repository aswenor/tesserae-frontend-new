import React from 'react';

import PageContainer from '../common/PageContainer';
import RightPanel from './RightPanel';
import Greek2LatinSearchParametersForm from './Greek2LatinSearchParametersForm';
import TwoPanelView from '../common/TwoPanelView';


function Greek_to_Latin(props) {
  return (
    <PageContainer>
      <TwoPanelView
        leftMaxWidth={500}
        leftMinWidth={300}
        showToggle={true}
      >
        <Greek2LatinSearchParametersForm />
        <RightPanel />
      </TwoPanelView>
    </PageContainer>
  );
}


export default Greek_to_Latin;
