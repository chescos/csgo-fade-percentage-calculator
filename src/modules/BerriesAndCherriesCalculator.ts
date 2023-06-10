import BaseCalculator from './BaseCalculator';

class BerriesAndCherriesCalculator extends BaseCalculator {
  weapons = [
    'Five-SeveN',
  ];

  reversedWeapons = [];

  tradeUpWeapons = [
    'Five-SeveN',
  ];

  configs = {
    default: {
      pattern_offset_x_start: -0.9,
      pattern_offset_x_end: -0.5,
      pattern_offset_y_start: -0.7,
      pattern_offset_y_end: -0.5,
      pattern_rotate_start: -55,
      pattern_rotate_end: -65,
    },
  };
}

export default BerriesAndCherriesCalculator;
