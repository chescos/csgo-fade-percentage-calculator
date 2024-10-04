import BaseCalculator from './BaseCalculator';

class FadeCalculator extends BaseCalculator {
  weapons = [
    'AWP',
    'Bayonet',
    'Bowie Knife',
    'Butterfly Knife',
    'Classic Knife',
    'Falchion Knife',
    'Flip Knife',
    'Glock-18',
    'Gut Knife',
    'Huntsman Knife',
    'Karambit',
    'Kukri Knife',
    'M4A1-S',
    'M9 Bayonet',
    'MAC-10',
    'MP7',
    'Navaja Knife',
    'Nomad Knife',
    'Paracord Knife',
    'R8 Revolver',
    'Shadow Daggers',
    'Skeleton Knife',
    'Stiletto Knife',
    'Survival Knife',
    'Talon Knife',
    'UMP-45',
    'Ursus Knife',
  ];

  reversedWeapons = [
    'AWP',
    'Karambit',
    'Talon Knife',
  ];

  tradeUpWeapons = [
    'AWP',
    'Glock-18',
    'M4A1-S',
    'MAC-10',
    'MP7',
    'R8 Revolver',
    'UMP-45',
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
    MP7: {
      pattern_offset_x_start: -0.9,
      pattern_offset_x_end: -0.3,
      pattern_offset_y_start: -0.7,
      pattern_offset_y_end: -0.5,
      pattern_rotate_start: -55,
      pattern_rotate_end: -65,
    },
    'M4A1-S': {
      pattern_offset_x_start: -0.14,
      pattern_offset_x_end: 0.05,
      pattern_offset_y_start: 0,
      pattern_offset_y_end: 0,
      pattern_rotate_start: -45,
      pattern_rotate_end: -45,
    },
  };
}

export default FadeCalculator;
