import React from 'react';

import MultitextSearchParametersForm from './MultitextSearchParametersForm';
import PageContainer from '../common/PageContainer';
import RightPanel from './RightPanel';
import TwoPanelView from '../common/TwoPanelView';


function Multitext(props) {
  return (
    <PageContainer>
      <TwoPanelView
        leftMaxWidth={600}
        leftMinWidth={400}
        showToggle={true}
      >
        <MultitextSearchParametersForm />
        <RightPanel />
      </TwoPanelView>
    </PageContainer>
  );
}


export default Multitext;