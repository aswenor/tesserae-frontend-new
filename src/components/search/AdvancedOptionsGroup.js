/**
 * @fileoverview Form for specifying advanced Tesserae search options.
 * 
 * @author [Jeff Kinnison](https://github.com/jeffkinnison)
 * 
 * @exports AdvancedOptionsGroup
 * 
 * @requires NPM:react
 * @requires NPM:@material-ui/core
 * @requires ../common/inputs/DistanceBasisInput
 * @requires ../common/inputs/DropScoresInput
 * @requires ../common/inputs/FeatureInput
 * @requires ../common/inputs/FrequencyBasisInput
 * @requires ../common/inputs/ScoreBasisInput
 * @requires ../common/inputs/StoplistBasisInput
 * @requires ../common/inputs/StoplistInput
 * @requires ../common/inputs/UnitInput
 */
import React from 'react';

import Box from '@material-ui/core/Box';

import DistanceBasisInput from '../common/inputs/DistanceBasisInput';
import DropScoresInput from '../common/inputs/DropScoresInput';
import FeatureInput from '../common/inputs/FeatureInput';
import FrequencyBasisInput from '../common/inputs/FrequencyBasisInput';
import ScoreBasisInput from '../common/inputs/ScoreBasisInput';
import StoplistBasisInput from '../common/inputs/StoplistBasisInput';
import StoplistInput from '../common/inputs/StoplistInput';
import UnitInput from '../common/inputs/UnitInput';


/**
 * Form to specify advanced Tesserae search options.
 * 
 * @component
 * 
 * @example
 *  
 *  return (
 *    <AdvancedOptionsGroup />
 *  );
 */
function AdvancedOptionsGroup(props) {
  return (
    <Box>
        <UnitInput />
        <FeatureInput />
        <StoplistInput />
        <StoplistBasisInput />
        <FrequencyBasisInput />
        <ScoreBasisInput />
        <DistanceBasisInput />
        <DropScoresInput />
    </Box>
  );
}


// Do redux binding here.
export default AdvancedOptionsGroup;
