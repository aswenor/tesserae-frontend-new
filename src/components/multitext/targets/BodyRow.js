import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import makeStyles from '@mui/styles/makeStyles';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import ClearIcon from '@mui/icons-material/Clear';

import { removeText } from '../../../state/multitext';


const useStyles = makeStyles(theme => ({
  authorCell: {
    borderRight: 'none',
    width: '30%'
  },
  titleCell: {
    borderLeft: 'none',
    borderRight: 'none',
    width: '50%'
  },
  buttonCell: {
    borderLeft: 'none',
  }
}));


/**
 * Selected multitext target information.
 * 
 * @component
 * @example
 *  return (
 *    <BodyRow
 *      removeText={() => {}}
 *      text={{author: 'Homer', object_id='foo', title='Iliad'}}
 *    />
 *  ); 
 */
function BodyRow(props) {
  const { removeText, text } = props;

  const classes = useStyles();

  return (
    <TableRow
      key={text.object_id}
    >
      <TableCell
        align="left"
        className={classes.authorCell}
        size="small"
      >
        <Typography
          nowrap={true}
          variant="body1"
        >
          {text.author}
        </Typography>
      </TableCell>
      <TableCell
        align="left"
        className={classes.titleCell}
        colSpan={2}
        size="small"
      >
        <Typography
          nowrap={true}
          variant="body1"
        >
          {text.title}
        </Typography>
      </TableCell>
      <TableCell
        align="center"
        className={classes.buttonCell}
        padding="checkbox"
        size="small"
      >
        <Tooltip
          placement="top"
          title="Remove"
        >
          <IconButton onClick={() => { removeText(text) }} size="large">
            <ClearIcon />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
}


BodyRow.propTypes = {
  /**
   * Deselect the text in this row.
   */
  removeText: PropTypes.func,

  /**
   * The text to display.
   */
  text: PropTypes.shape({
    /**
     * Author of the text.
     */
    author: PropTypes.string,

    /**
     * Database ID of the text.
     */
    object_id: PropTypes.string,

    /**
     * Title of the text.
     */
    title: PropTypes.string
  })
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    removeText: removeText
  }, dispatch);
}


export default connect(null, mapDispatchToProps)(BodyRow);