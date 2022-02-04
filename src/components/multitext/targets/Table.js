import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import makeStyles from '@mui/styles/makeStyles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

import BodyRow from './BodyRow';
import Header from './Header'

const useStyles = makeStyles(theme => ({
  root: {
    maxHeight: '400px',
    overflowY: 'auto',
  },
  body: {
    border: 'solid',
  },
  unbordered: {
    border: 'none'
  }
}));


function TargetsTable(props) {
  const { multitextTargets } = props;

  const classes = useStyles();

  return (
    <Box
      className={classes.root}
      m={0}
      p={0}
      width={1}
    >
      <Table
        stickyHeader
      >
        <Header />
        <TableBody
          className={(multitextTargets.length > 0
                      ? classes.body
                      : classes.unbordered)}
        >
          {multitextTargets.length > 0
            ? multitextTargets.map(item => {
                return <BodyRow text={item} />
              })
            : <TableCell
                align="center"
                className={classes.unbordered}
                colSpan={4}
              >
                <Typography>No targets selected.</Typography>
              </TableCell>
          }
        </TableBody>
      </Table>
    </Box>
  );
}


TargetsTable.propTypes = {
  /**
   * Array of selected multitext targets.
   */
  multitextTargets: PropTypes.arrayOf(
    PropTypes.shape({
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
  )
}


function mapStateToProps(state) {
  return {
    multitextTargets: state.multitext.selectedTexts
  }
}


export default connect(mapStateToProps)(TargetsTable);