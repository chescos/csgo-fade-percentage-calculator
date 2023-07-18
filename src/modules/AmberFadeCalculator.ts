import BaseCalculator from './BaseCalculator.js';

class AmberFadeCalculator extends BaseCalculator {
  weapons = [
    'AUG',
    'Galil AR',
    'MAC-10',
    'P2000',
    'R8 Revolver',
    'Sawed-Off',
  ];

  reversedWeapons = [];

  tradeUpWeapons = [
    'AUG',
    'Galil AR',
    'MAC-10',
    'P2000',
    'R8 Revolver',
    'Sawed-Off',
  ];

  configs = {
    default: {
      pattern_offset_x_start: -0.7,
      pattern_offset_x_end: -0.7,
      pattern_offset_y_start: -0.7,
      pattern_offset_y_end: -0.7,
      pattern_rotate_start: -55,
      pattern_rotate_end: -65,
    },
  };
}

export default AmberFadeCalculator;
