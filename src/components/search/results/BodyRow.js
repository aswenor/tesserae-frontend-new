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
import React from 'react';
import PropTypes from 'prop-types';
import uniq from 'lodash/uniq';

import makeStyles from '@mui/styles/makeStyles';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

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
  const { idx, result, sourceDivision, targetDivision } = props;

  /** CSS styles and global theme. */
  const classes = useStyles();

  // Get the indices of match words in each snippet.
  let sourceIndices = uniq(result.highlight.map(x => x[0])).sort();
  let targetIndices = uniq(result.highlight.map(x => x[1])).sort();

  const sourceSnippet = highlightMatches(result.source_snippet, result.source_tag, sourceIndices);
  const targetSnippet = highlightMatches(result.target_snippet, result.target_tag, targetIndices);

  // Get the divisions and parse out the given integer value of each division (no integer value means use full text)
  let sourceDiv = parseInt(sourceDivision)
  let targetDiv = parseInt(targetDivision)

  // Parse out the subsection from the text tags
  //let sourceSection = Math.floor(parseFloat(result.source_tag))
  //let targetSection = Math.floor(parseFloat(result.target_tag))
  let sourceSection = parseInt(result.source_tag)
  let targetSection = parseInt(result.target_tag)
  
  // Check for subsection tags and if they match (or its a full text search) return the corresponding BodyRow object
  //if( (isNaN(sourceDiv) && isNaN(targetDiv)) || ((sourceDiv === sourceSection) && isNaN(targetDiv)) || (isNaN(sourceDiv) && (targetDiv === targetSection)) || ((sourceDiv === sourceSection) && (targetDiv === targetSection))) {
  if (isNaN(sourceSection)) {  
    return (
    <TableRow
      className={classes.row}
      hover
      tabIndex={-1}
      key={`${result.object_id}-${result.source_tag}-${result.target_tag}`}
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
        <Typography><b>{result.source_tag}</b>:</Typography>
          {sourceSnippet}
      </TableCell>
      <TableCell
        align="left"
        className={classes.snippetCell}
        size="small"
        style={{maxWidth: '10px'}}
        variant="body"
      >
        <Typography><b>{result.target_tag}</b>:</Typography>
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
          {result.matched_features.join(', ')}
          </Typography>
      </TableCell>
      <TableCell
        align="center"
        className={classes.numberCell}
        variant="body"
      >
        <Typography>
          <b>{Math.floor(result.score)}</b>
        </Typography>
      </TableCell>
    </TableRow>
  );
  }

  else {
    return false;
  }
  
  
}


BodyRow.propTypes = {
  /**
   * List of results as specified in the REST API.
   */
  results: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ),

  /**
   * The index of the first entry on the page (0-indexed).
   */
  startIdx: PropTypes.number
};


export default BodyRow;
