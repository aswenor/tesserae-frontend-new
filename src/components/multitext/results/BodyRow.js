/**
 * @fileoverview Styled header for the Tesserae search results table.
 * 
 * @author [Jeff Kinnison](https://github.com/jeffkinnison)
 * 
 * @exports ResultsTableBody
 * 
 * @requires NPM:react
 * @requires NPM:prop-types
 * @requires NPM:@mui/material
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { flatten, sortBy, uniq, uniqBy } from 'lodash';
 
import makeStyles from '@mui/styles/makeStyles';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
 
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import Subtable from './Subtable';
import { highlightMatches } from '../../../utils';
 
 
 /** CSS styles to apply to table cells. */
 const useStyles = makeStyles(theme => ({
   root: {
     height: '80%',
     overflow: 'overlay'
   },
   row: {
     overflowX: 'hidden',
   },
   numberCell: {
     overflowX: 'hidden',
     width: '2%'
   },
   snippetCell: {
     overflowX: 'hidden',
     width: '43%'
   },
   matchesCell: {
     overflowX: 'hidden',
     width: '10%'
   },
 }));
 
 
/**
 * Sequence of cells with search results.
 * 
 * @component
 */
function BodyRow(props) {
  const { idx, result } = props;
 
  const [ open, setOpen ] = useState(false);

  /** CSS styles and global theme. */
  const classes = useStyles();

  // Get the indices of match words in each snippet.
  let sourceIndices = uniq(result.match.highlight.map(x => x[0])).sort();
  let targetIndices = uniq(result.match.highlight.map(x => x[1])).sort();

  const sourceSnippet = highlightMatches(result.match.source_snippet, result.match.source_tag, sourceIndices);
  const targetSnippet = highlightMatches(result.match.target_snippet, result.match.target_tag, targetIndices);

  const multiresults = sortBy(
    uniqBy(
      flatten(
        result['cross-ref'].map(item => item.units)
      ),
      'tag'),
    'score').reverse();

  return (
    <React.Fragment>
      <TableRow
        className={classes.row}
        hover
        tabIndex={-1}
        key={result.match.object_id}
      >
        <TableCell
          className={classes.numberCell}
          variant="body"
        >
          <Typography
            align="left"
          >
            {idx}
          </Typography>
        </TableCell>
        <TableCell
          align="left"
          className={classes.snippetCell}
          variant="body"
        >
          <Typography><b>{result.match.source_tag}</b>:</Typography>
            {sourceSnippet}
        </TableCell>
        <TableCell
          align="left"
          className={classes.snippetCell}
          size="small"
          style={{maxWidth: '10px'}}
          variant="body"
        >
          <Typography><b>{result.match.target_tag}</b>:</Typography>
            {targetSnippet}
        </TableCell>
        <TableCell
          align="center"
          className={classes.matchesCell}
          size="small"
          style={{maxWidth: '1px'}}
          variant="body"
        >
          <Typography>
            {result.match.matched_features.join(', ')}
            </Typography>
        </TableCell>
        <TableCell
          align="center"
          className={classes.numberCell}
          variant="body"
        >
          <Typography>
            <b>{Math.floor(result.match.score)}</b>
          </Typography>
        </TableCell>
        <TableCell
          align="center"
          className={classes.numberCell}
          variant="body"
        >
          { result['cross-ref'].length > 0
            ? <Typography>
                <IconButton 
                  aria-label="expand row"
                  onClick={() => setOpen(prev => !prev)}
                  size="small"
                >
                  {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
                More ({multiresults.length})
              </Typography>
            : <Typography>
                No multitext matches.
              </Typography>
          }
        </TableCell>     
      </TableRow>
      { result['cross-ref'].length > 0 &&
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open}>
              <Box m={1}>
                <Subtable multiresults={multiresults} />
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      }
    </React.Fragment>
  );
}


BodyRow.propTypes = {
  /**
   * List of results as specified in the REST API.
   */
  result: PropTypes.arrayOf(
    PropTypes.shape({
      /**
       * One source/target match result.
       */
      match: PropTypes.shape({

        /**
         * Pairs of source/target snippet token indices corresponding to matches.
         */
        highlight: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),

        /**
         * Score of the match.
         */
        score: PropTypes.number,

        /**
         * Matching passage of source text.
         */
        source_snippet: PropTypes.string,

        /**
         * Locus of matching passage of source text.
         */
        source_tag: PropTypes.string,

        /**
         * Matching passage of target text.
         */
        target_snippet: PropTypes.string,

        /**
         * Locus of matching passage of source text.
         */
        target_tag: PropTypes.string,
      }),

      /**
       * Multitext search cross-references.
       */
      crossref: PropTypes.shape({

        /**
         * Multitext search cross-references.
         */
        units: PropTypes.arrayOf(
          PropTypes.shape({

            /**
             * Score of the multi-text match.
             */
            score: PropTypes.number,

            /**
             * Raw text of the match.
             */
            snippet: PropTypes.string,

            /**
             * Locus tag of the match
             */
            tag: PropTypes.string,

            /**
             * Database id of the unit of this match.
             */
            unit_id: PropTypes.string,
          })
        )
      })
    })
  ),

  /**
   * The index of the first entry on the page (0-indexed).
   */
  startIdx: PropTypes.number
};
 
 
export default BodyRow;