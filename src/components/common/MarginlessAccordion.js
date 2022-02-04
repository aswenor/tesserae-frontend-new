/**
 * @fileoverview Custom expansion panels with a dense layout.
 * 
 * @author [Jeff Kinnison](https://github.com/jeffkinnison)
 * 
 * @requires NPM:@mui/material
 */
import withStyles from '@mui/styles/withStyles';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary from '@mui/material/AccordionSummary';


/**
 * Custom styling to make Accordion layout more dense.
 * 
 * @component
 * 
 * @example
 *   return (
 *     <Accordion>
 *       <AccordionSummary>
 *         <p>Example summary text </p>
 *       </AccordionSummary>
 *       <AccordionDetails>
 *         <p>This is the interior text.</p>
 *       </AccordionDetails>
 *     </Accordion>
 *   );
 */
export const MarginlessAccordion = withStyles(theme => ({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    borderBottom: '1px solid rgba(0, 0, 0, 0)',
    boxShadow: 'none',
    backgroundColor: theme.palette.secondary.main,
    overflowX: 'hidden',
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
}))(MuiAccordion);


/**
 * Custom styling to make AccordionSummary layout more dense.
 * 
 * @component
 * 
 * @example
 *   return (
 *     <Accordion>
 *       <AccordionSummary>
 *         <p>Example summary text </p>
 *       </AccordionSummary>
 *       <AccordionDetails>
 *         <p>This is the interior text.</p>
 *       </AccordionDetails>
 *     </Accordion>
 *   );
 */
export const MarginlessAccordionSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    // marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);


/**
 * Custom styling to make AccordionSummary layout more dense.
 * 
 * @component
 * 
 * @example
 *   return (
 *     <Accordion>
 *       <AccordionSummary>
 *         <p>Example summary text </p>
 *       </AccordionSummary>
 *       <AccordionDetails>
 *         <p>This is the interior text.</p>
 *       </AccordionDetails>
 *     </Accordion>
 *   );
 */
export const MarginlessAccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);