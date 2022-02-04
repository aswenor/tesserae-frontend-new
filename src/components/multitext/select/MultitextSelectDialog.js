import React, { useState } from 'react';
import { connect } from 'react-redux';

import makeStyles from '@mui/styles/makeStyles';
import Divider from '@mui/material/Divider';
import Hidden from '@mui/material/Hidden';
import Grid from '@mui/material/Grid';

import CorpusFilter from '../../common/CorpusFilter';
import Table from './Table';
import ThemedDialog from '../../common/ThemedDialog';


const useStyles = makeStyles(theme => ({
  root: {
    maxHeight: '100%',
    overflowY: 'hidden'
  },
  divider: {
    // backgroundColor: '#ababab',
    height: '100%'
  },
  leftSide: {
  },
  rightSide: {
    height: "100%"
  }
}));


function MultitextSelectDialog(props) {
  const { availableTexts, closeDialog, open } = props;
  
  const [ filteredTextList, setFilteredTextList ] = useState([...availableTexts]);

  const classes = useStyles();

  return (
    <ThemedDialog
      actions={null}
      body={
        <Grid container
          className={classes.root}
          direction="row"
          justifyContent="center"
        >
          <Grid item xs={12}
            className={classes.leftSide}
          >
            <CorpusFilter
              filteredTextList={filteredTextList}
              updateFilteredTextList={setFilteredTextList}
            />
          </Grid>
          <Hidden xlDown={true}>
            <Grid item xs={12}>
              <Divider
                className={classes.divider}
                orientation="vertical"
                variant="fullWidth"
              />
            </Grid>
          </Hidden>
          <Grid item xs={12}
            className={classes.rightside}
          >
            <Table textList={filteredTextList} />
          </Grid>
        </Grid>
      }
      closeDialog={closeDialog}
      fullWidth={true}
      maxWidth="md"
      open={open}
      scroll="paper"
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