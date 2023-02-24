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
}

interface WeaponFadePercentage {
  weapon: string,
  percentages: Array<FadePercentage>
}

class MarbleFadeCalculator {
  weapons: Array<string>;

  limits: { [key: string ]: number };

  configs: {
    [key: string]: WeaponConfig,
  };

  minPercentage: number;

  constructor() {
    this.weapons = [
      'Bayonet',
      'Flip Knife',
      'Karambit',
      'Gut Knife',
    ];

    this.limits = {
      Bayonet: 923,
      'Flip Knife': 923,
      Karambit: 972,
      'Gut Knife': 923,
    };

    this.configs = {
      default: {
        pattern_offset_x_start: 0.0,
        pattern_offset_x_end: 0.0,
        pattern_offset_y_start: -0.7,
        pattern_offset_y_end: -0.7,
        pattern_rotate_start: -50,
        pattern_rotate_end: -70,
      },
    };

    this.minPercentage = 0;
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

    for (let i = 0; i <= 999; i += 1) {
      const randomNumberGenerator = new RandomNumberGenerator();

      randomNumberGenerator.setSeed(i);

      randomNumberGenerator.randomFloat(
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

      rawResults.push(Math.abs(rotation));
    }

    const bestResult: number = Math.max(...rawResults);
    const worstResult: number = rawResults[this.limits[weapon]];

    const resultRange: number = worstResult - bestResult;

    return rawResults
      .map((result, i) => ({
        seed: i,
        result,
      }))
      .filter((result) => result.result >= worstResult)
      .map((result) => ({
        seed: result.seed,
        percentage: ((worstResult - result.result) / resultRange) * 100,
      }));
  }
}

export default MarbleFadeCalculator;
