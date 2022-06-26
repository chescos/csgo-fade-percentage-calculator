import RandomNumberGenerator from './RandomNumberGenerator';

class FadeCalculator {
  weapons: Array<string>;

  configs: any;

  constructor() {
    this.weapons = [
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

    this.configs = {
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
    };
  }

  calculateFadePercentages(weapon: string): Array<number> {
    if (!this.weapons.includes(weapon)) {
      return [];
    }

    const config = this.configs[weapon] || this.configs.default;

    const rawResults = [] as Array<number>;

    for (let i = 0; i < 1000; i += 1) {
      const randomNumberGenerator = new RandomNumberGenerator();
      randomNumberGenerator.setSeed(i);
      randomNumberGenerator.randomFloat(config.pattern_offset_x_start, config.pattern_offset_x_end);
      randomNumberGenerator.randomFloat(config.pattern_offset_y_start, config.pattern_offset_y_end);

      rawResults[i] = Math.abs(randomNumberGenerator.randomFloat(
        config.pattern_rotate_start,
        config.pattern_rotate_end,
      ));
    }

    const percentageResults = [] as Array<number>;

    const isReversed = ['Karambit', 'Talon Knife', 'AWP'].includes(weapon);

    let bestResult: number;
    let worstResult: number;

    if (isReversed) {
      bestResult = Math.max(...rawResults);
      worstResult = Math.min(...rawResults);
    } else {
      bestResult = Math.min(...rawResults);
      worstResult = Math.max(...rawResults);
    }

    const resultRange = worstResult - bestResult;

    rawResults.forEach((result, i) => {
      percentageResults[i] = (worstResult - result) / resultRange;
    });

    const minPercentage = 80;

    const cleanResults = [] as Array<number>;

    percentageResults.forEach((result, i) => {
      cleanResults[i] = minPercentage + (result * (100 - minPercentage));
    });

    return cleanResults;
  }
}

export default FadeCalculator;
