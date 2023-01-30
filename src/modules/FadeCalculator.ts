import RandomNumberGenerator from './RandomNumberGenerator';

interface WeaponConfig {
  pattern_offset_x_start: number,
  pattern_offset_x_end: number,
  pattern_offset_y_start: number,
  pattern_offset_y_end: number,
  pattern_rotate_start: number,
  pattern_rotate_end: number,
}

interface FadePercentage {
  seed: number,
  percentage: number,
  ranking: number,
}

interface WeaponFadePercentage {
  weapon: string,
  percentages: Array<FadePercentage>
}

class FadeCalculator {
  weapons: Array<string>;

  reversedWeapons: Array<string>;

  tradeUpWeapons: Array<string>;

  configs: {
    [key: string]: WeaponConfig,
  };

  minPercentage: number;

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

    this.reversedWeapons = [
      'AWP',
      'Karambit',
      'Talon Knife',
    ];

    this.tradeUpWeapons = [
      'AWP',
      'Glock-18',
      'MAC-10',
      'MP7',
      'R8 Revolver',
      'UMP-45',
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

    this.minPercentage = 80;
  }

  getSupportedWeapons(): Array<String> {
    return this.weapons;
  }

  getFadePercentage(weapon: string, seed: number): FadePercentage {
    const percentages = this.getFadePercentages(weapon);

    return percentages[seed];
  }

  getAllFadePercentages(): Array<WeaponFadePercentage> {
    return this.weapons.map((weapon) => ({
      weapon,
      percentages: this.getFadePercentages(weapon),
    }));
  }

  getFadePercentages(weapon: string): Array<FadePercentage> {
    if (!this.weapons.includes(weapon)) {
      throw new Error(`The weapon "${weapon}" is currently not supported.`);
    }

    const config = this.configs[weapon] || this.configs.default;

    const rawResults: Array<number> = [];

    const maxSeed: number = this.tradeUpWeapons.includes(weapon)
      ? 1000
      : 999;

    for (let i = 0; i <= maxSeed; i += 1) {
      const randomNumberGenerator = new RandomNumberGenerator();

      randomNumberGenerator.setSeed(i);

      const xOffset: number = randomNumberGenerator.randomFloat(
        config.pattern_offset_x_start,
        config.pattern_offset_x_end,
      );

      randomNumberGenerator.randomFloat(
        config.pattern_offset_y_start,
        config.pattern_offset_y_end,
      );

      const rotation: number = randomNumberGenerator.randomFloat(
        config.pattern_rotate_start,
        config.pattern_rotate_end,
      );

      let rawResult: number;

      if (config.pattern_offset_x_start !== config.pattern_offset_x_end) {
        rawResult = rotation * xOffset;
      } else {
        rawResult = rotation;
      }

      rawResults.push(Math.abs(rawResult));
    }

    const isReversed: boolean = this.reversedWeapons.includes(weapon);

    let bestResult: number;
    let worstResult: number;

    if (isReversed) {
      bestResult = Math.max(...rawResults);
      worstResult = Math.min(...rawResults);
    } else {
      bestResult = Math.min(...rawResults);
      worstResult = Math.max(...rawResults);
    }

    const resultRange: number = worstResult - bestResult;

    const percentageResults: Array<number> = rawResults.map(
      (rawResult) => (worstResult - rawResult) / resultRange,
    );

    const sortedPercentageResults: Array<number> = [...percentageResults].sort((a, b) => a - b);

    return percentageResults.map((percentageResult, i) => ({
      seed: i,
      percentage: this.minPercentage + (percentageResult * (100 - this.minPercentage)),
      ranking: Math.min(sortedPercentageResults.indexOf(percentageResult), 999-sortedPercentageResults.indexOf(percentageResult)) + 1,
    }));
  }
}

export default FadeCalculator;
