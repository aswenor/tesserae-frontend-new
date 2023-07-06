import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import BodyRow from './BodyRow';


function Body(props) {
  const { currentPage, results, rowsPerPage } = props;

  return (
    <React.Fragment>
      {[results.map((item, idx) => (
        <BodyRow 
          idx={currentPage * rowsPerPage + idx + 1}
          result={item}
        />
      ))]}
    </React.Fragment>
  );
}


Body.propTypes = {
  currentPage: PropTypes.number,
  results: PropTypes.arrayOf(PropTypes.object),
  rowsPerPage: PropTypes.number
}


function mapStateToProps(state) {
  return {
    results: state.search.results
  }
}


export default connect(mapStateToProps)(Body);
