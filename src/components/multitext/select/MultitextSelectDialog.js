import React, { useState } from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';

import CorpusFilter from '../../common/CorpusFilter';
import Table from './Table';
import ThemedDialog from '../../common/ThemedDialog';


function MultitextSelectDialog(props) {
  const { availableTexts, closeDialog, open } = props;
  
  const [ textList, setTextList ] = useState(availableTexts);

  return (
    <ThemedDialog
      actions={null}
      body={
        <Grid container>
          <Grid item md={4} xs={12}>
            <CorpusFilter
              filteredTextList={textList}
            />
          </Grid>
          <Grid item md={8} xs={12}>
            <Table textList={textList} />
          </Grid>
        </Grid>
      }
      closeDialog={closeDialog}
      maxWidth="xl"
      open={open}
      scroll="body"
      title="Select Multitext Targets"
    />
  );
}


function mapStateToProps(state) {
  return {
    availableTexts: state.corpus.availableTexts
  }
}


export default connect(mapStateToProps)(MultitextSelectDialog);