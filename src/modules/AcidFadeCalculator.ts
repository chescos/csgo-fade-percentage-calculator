import BaseCalculator from './BaseCalculator.js';

class AcidFadeCalculator extends BaseCalculator {
  weapons = [
    'SSG 08',
  ];

  reversedWeapons = [];

  tradeUpWeapons = [
    'SSG 08',
  ];

  configs = {
    default: {
      pattern_offset_x_start: -2.4,
      pattern_offset_x_end: -2.1,
      pattern_offset_y_start: 0.0,
      pattern_offset_y_end: 0.0,
      pattern_rotate_start: -55,
      pattern_rotate_end: -65,
    },
  };
}

export default AcidFadeCalculator;
