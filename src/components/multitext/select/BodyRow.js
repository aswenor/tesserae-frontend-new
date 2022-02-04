import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { findIndex } from 'lodash';

import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import { addText, removeText } from '../../../state/multitext';


function BodyRow(props) {
  const { addText, multitextSelections, removeText, text } = props;

  const checked = findIndex(multitextSelections, x => x.object_id === text.object_id) >= 0;

  const handleSelect = event => {
    const wasChecked = event.target.checked;

    if (wasChecked) {
      addText(text);
    }
    else {
      removeText(text);
    }
  };


  return (
    <TableRow
      key={text.object_id}
    >
      <TableCell
        variant="body"
      >
        <Checkbox
          checked={checked}
          color="primary"
          onChange={handleSelect}
        />
      </TableCell>
      <TableCell
        variant="body"
      >
        <Typography variant="body1">
          {text.author}
        </Typography>
      </TableCell>
      <TableCell
        variant="body"
      >
        <Typography variant="body1">
          {text.title}
        </Typography>
      </TableCell>
      <TableCell
        variant="body"
      >
        <Typography variant="body1">
          {`${Math.abs(text.year)} ${text.year < 0 ? 'BCE' : 'CE'}`}
        </Typography>
      </TableCell>
    </TableRow>
  );
}


function mapStateToProps(state) {
  return {
    multitextSelections: state.multitext.selectedTexts
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addText: addText,
    removeText: removeText
  }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(BodyRow);