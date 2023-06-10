import { BerriesAndCherriesCalculator } from '../../src';

test('Get all supported weapons', () => {
  const supportedWeapons = BerriesAndCherriesCalculator.getSupportedWeapons();

  expect(Array.isArray(supportedWeapons)).toBe(true);
  expect(supportedWeapons.length).toBeGreaterThan(0);
  expect(supportedWeapons).toContain('Five-SeveN');
});

test('Get specific fade percentage for weapon', () => {
  const lowestFSPercentage = BerriesAndCherriesCalculator.getFadePercentage('Five-SeveN', 182);
  const highestFSPercentage = BerriesAndCherriesCalculator.getFadePercentage('Five-SeveN', 80);
  const midFSPercentage = BerriesAndCherriesCalculator.getFadePercentage('Five-SeveN', 143);

  expect(lowestFSPercentage.percentage).toBe(80);
  expect(lowestFSPercentage.seed).toBe(182);
  expect(lowestFSPercentage.ranking).toBe(1);

  expect(highestFSPercentage.percentage).toBe(100);
  expect(highestFSPercentage.seed).toBe(80);
  expect(highestFSPercentage.ranking).toBe(1);

  expect(midFSPercentage.percentage).toBe(90.20747509041848);
  expect(midFSPercentage.seed).toBe(143);
  expect(midFSPercentage.ranking).toBe(501);
});

test('Get all fade percentages for weapon', () => {
  const fiveSevenPercentages = BerriesAndCherriesCalculator.getFadePercentages('Five-SeveN');

  expect(fiveSevenPercentages[999].seed).toBe(999);
  expect(fiveSevenPercentages[999].ranking).toBe(412);
  expect(fiveSevenPercentages[0].percentage).toBe(88.11996844758909);
  expect(fiveSevenPercentages[182].percentage).toBe(80);
  expect(fiveSevenPercentages[80].percentage).toBe(100);
  expect(fiveSevenPercentages[999].percentage).toBe(91.91730978136147);
  expect(fiveSevenPercentages).toHaveLength(1001);
});

test('Get all fade percentages for all weapons', () => {
  const weaponFadePercentages = BerriesAndCherriesCalculator.getAllFadePercentages();

  const fiveseven = weaponFadePercentages.find((weaponFadePercentage) => weaponFadePercentage.weapon === 'Five-SeveN');

  expect(fiveseven!.percentages[0].percentage).toBe(88.11996844758909);
});
