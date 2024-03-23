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

abstract class BaseCalculator {
  protected abstract weapons: Array<string>;

  protected abstract reversedWeapons: Array<string>;

  protected abstract tradeUpWeapons: Array<string>;

  protected abstract configs: {
    [key: string]: WeaponConfig,
  };

  private minPercentage: number = 80;

  public getSupportedWeapons(): Array<String> {
    return this.weapons;
  }

  public getFadePercentage(weapon: string, seed: number): FadePercentage {
    const percentages = this.getFadePercentages(weapon);

    return percentages[seed];
  }

  public getAllFadePercentages(): Array<WeaponFadePercentage> {
    return this.weapons.map((weapon) => ({
      weapon,
      percentages: this.getFadePercentages(weapon),
    }));
  }

  public getFadePercentages(weapon: string): Array<FadePercentage> {
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
        const rotationRange = Math.abs(config.pattern_rotate_end - config.pattern_rotate_start);
        const rotationDistance = Math.abs(config.pattern_rotate_end - rotation);
        const rotationPercentage = 100 * (1 - (rotationDistance / rotationRange));

        const xOffsetRange = Math.abs(config.pattern_offset_x_end - config.pattern_offset_x_start);
        const xOffsetDistance = Math.abs(config.pattern_offset_x_end - xOffset);
        const xOffsetPercentage = 100 * (xOffsetDistance / xOffsetRange);

        rawResult = (rotationPercentage * 0.5) + xOffsetPercentage;
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

    const sortedPercentageResults: Array<number> = [...percentageResults].sort(
      (a, b) => a - b,
    );

    return percentageResults.map((percentageResult, i) => ({
      seed: i,
      percentage: this.minPercentage + (percentageResult * (100 - this.minPercentage)),
      ranking: Math.min(
        sortedPercentageResults.indexOf(percentageResult) + 1,
        sortedPercentageResults.length - sortedPercentageResults.indexOf(percentageResult),
      ),
    }));
  }
}

export default BaseCalculator;
