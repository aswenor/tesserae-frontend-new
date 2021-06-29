import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import MultitextResultsPlaceholder from './MultitextResultsPlaceholder';
import Table from './results/Table';


function RightPanel(props) {
  const { resultsCount } = props;

  return (
    resultsCount === 0
    ? <MultitextResultsPlaceholder />
    : <Table />
  );
}


RightPanel.propTypes = {
  resultsCount: PropTypes.number
}


function mapStateToProps(state) {
  return {
    resultsCount: state.multitext.results.length
  }
}


export default connect(mapStateToProps)(RightPanel);