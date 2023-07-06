import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ResultsPlaceholder from './ResultsPlaceholder';
import Table from './results/Table';


function RightPanel(props) {
  const { resultsCount } = props;

  return (
    resultsCount === 0
    ? <ResultsPlaceholder />
    : <Table />
  );
}


RightPanel.propTypes = {
  resultsCount: PropTypes.number
}


function mapStateToProps(state) {
  return {
    resultsCount: state.search.resultsCount
  }
}


export default connect(mapStateToProps)(RightPanel);
