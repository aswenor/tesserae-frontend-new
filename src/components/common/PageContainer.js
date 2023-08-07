/**
 * @fileoverview Standard styling container to fill the whole main page area.
 * 
 * @author [Jeff Kinnison](https://github.com/jeffkinnison)
 * 
 * @exports PageContainer
 * 
 * @requires NPM:react
 * @requires NPM:@mui/material
 */
import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import makeStyles from '@mui/styles/makeStyles';
import Box from '@mui/material/Box';

import { initialFetch } from '../../api/corpus';
import LoadingScreen from './LoadingScreen';


/** CSS styles to apply to the component. */
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.secondary.main,
    overflowY: 'hidden'
  }
}));


/**
 * Standard styling container to fill the whole main page area.
 * 
 * @container
 * @example
 *   return (
 *     <PageContainer
 *       languages=['latin']
 *     >
 *       <div><h2>Here is content.</h2></div>
 *     </PageContainer>
 *   );
 */
function PageContainer(props) {
  const { availableSourceTexts, availableTargetTexts, children, fetchLanguages, languages } = props;
  
  /** CSS styles and global theme. */
  const classes = useStyles();

  useEffect(() => {
    if (languages.length === 0) {
      fetchLanguages();
    }
  }, [fetchLanguages, languages]);

  return (
    <Box
      className={classes.root}
      flexDirection="column"
      display="flex"
      height="100vh"
      m={0}
      maxHeight="100vh"
      maxWidth="100vw"
      p={0}
      width={1.0}
    >
      {languages.length === 0 || availableSourceTexts.length === 0 || availableTargetTexts === 0
       ? <LoadingScreen />
       : children
      }
    </Box>
  )
}


function mapStateToProps(state) {
  return {
    availableSourceTexts: state.corpus.availableSourceTexts,
    availableTargetTexts: state.corpus.availableTargetTexts,
    languages: state.corpus.availableLanguages
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchLanguages: initialFetch
  }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(PageContainer);