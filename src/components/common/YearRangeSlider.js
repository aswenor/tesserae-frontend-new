/**
 * @fileoverview Slider to select a range of years tailored to BCE/CE ranges.
 * 
 * @author [Jeff Kinnison](https://girhub.com/jeffkinnison)
 * 
 * @exports YearRangeSlider
 * 
 * @requires NPM:react
 * @requires NPM:prop-types
 * @requires NPM:lodash
 * @requires NPM:@mui/material
 */
import React from 'react';
import PropTypes from 'prop-types';
import { range } from 'lodash';

import Slider from '@mui/material/Slider';
import Tooltip from '@mui/material/Tooltip';


function YearLabel(props) {
  const { children, open, value } = props;

  return (
    <Tooltip
      enterTouchDelay={0}
      open={open}
      placement="top"
      title={value}
    >
      {children}
    </Tooltip>
  );
}



/**
 * Slider to select a range of years tailored to BCE/CE ranges.
 * 
 * @component 
 * @example
 *   return <YearRangeSlider
 *     maxYear={1000}
 *     minYear={-1000}
 *     selectYearRange={x => x}
 *     selectedYearRange={[-200, 400]}
 *     tickInterval={100}
 *   /> 
 */
function YearRangeSlider(props) {
  const { maxYear, minYear, selectYearRange,
          selectedYearRange, tickInterval } = props;
  
  /** Maximum year to display normalized to the ticks. */
  const sliderMin = Math.floor(minYear / tickInterval) * tickInterval;

  /** Minimum year to display normalized to the ticks. */
  const sliderMax = Math.ceil(maxYear / tickInterval) * tickInterval;

  /** Convert the display to show years as BCE/CE. */
  const yearDisplay = (value, idx) => {
    const label = `${Math.abs(value)}${value > 0 ? 'CE' : 'BCE'}`
    return label;
  }

  /** Ticks to display on the slider (0 changed to 1). */
  const marks = [sliderMin, sliderMax] // range(sliderMin, sliderMax, tickInterval)
    .map(x => {
      return {
        value: x,
        label: yearDisplay(x, null)
      }
    });

  /** Pass-through to the higher-level update function. */
  const handleChange = (event, value) => {
    selectYearRange(value.sort());
  }

  const yearLower = Math.floor(selectedYearRange[0] / tickInterval) * tickInterval;
  const yearUpper = Math.ceil(selectedYearRange[1] / tickInterval) * tickInterval;

  return (
    <Slider
      color="primary"
      marks={marks}
      max={sliderMax}
      min={sliderMin}
      name="year-range-select"
      onChange={(event, value) => {selectYearRange(value);}}
      onChangeCommitted={handleChange}
      value={[yearLower, yearUpper]}
      ValueLabelComponent={YearLabel}
      valueLabelDisplay="auto"
      valueLabelFormat={yearDisplay}
    />
  );
}


YearRangeSlider.propTypes = {
  /** The maximum year to display. */
  maxYear: PropTypes.number,

  /** The minimum year to display. */
  minYear: PropTypes.number,

  /** Function to update the selected year. */
  selectYearRange: PropTypes.func,

  /** The current lower and upper bounds of selected years. */
  selectedYearRange: PropTypes.arrayOf(PropTypes.number),

  /** The spacing between displayed ticks on the slider. */
  tickInterval: PropTypes.number
}


export default YearRangeSlider;