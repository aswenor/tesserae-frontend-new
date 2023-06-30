import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import BodyRow from './BodyRow';


function Body(props) {
  const { currentPage, results, rowsPerPage, sourceDivision, targetDivision } = props;

  return (
    <React.Fragment>
      {[results.map((item, idx) => (
        <BodyRow 
          idx={currentPage * rowsPerPage + idx + 1}
          result={item}
          sourceDivision={sourceDivision}
          targetDivision={targetDivision}
        />
      ))]}
    </React.Fragment>
  );
}


Body.propTypes = {
  currentPage: PropTypes.number,
  results: PropTypes.arrayOf(PropTypes.object),
  rowsPerPage: PropTypes.number,
  sourceDivision: PropTypes.string,
  targetDivision: PropTypes.string
}


function mapStateToProps(state) {
  return {
    results: state.search.results
  }
}


export default connect(mapStateToProps)(Body);