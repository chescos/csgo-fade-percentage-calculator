import { AmberFadeCalculator } from '../../src';

test('Get all supported weapons', () => {
  const supportedWeapons = AmberFadeCalculator.getSupportedWeapons();

  expect(Array.isArray(supportedWeapons)).toBe(true);
  expect(supportedWeapons.length).toBeGreaterThan(0);
  expect(supportedWeapons).toContain('MAC-10');
});

test('Get specific fade percentage for weapon', () => {
  const lowestR8Percentage = AmberFadeCalculator.getFadePercentage('R8 Revolver', 412);
  const highestR8Percentage = AmberFadeCalculator.getFadePercentage('R8 Revolver', 763);
  const midR8Percentage = AmberFadeCalculator.getFadePercentage('R8 Revolver', 329);

  expect(lowestR8Percentage.percentage).toBe(80);
  expect(lowestR8Percentage.seed).toBe(412);
  expect(lowestR8Percentage.ranking).toBe(1);

  expect(highestR8Percentage.percentage).toBe(100);
  expect(highestR8Percentage.seed).toBe(763);
  expect(highestR8Percentage.ranking).toBe(1);

  expect(midR8Percentage.percentage).toBe(82.71807854388648);
  expect(midR8Percentage.seed).toBe(329);
  expect(midR8Percentage.ranking).toBe(141);
});

test('Get all fade percentages for weapon', () => {
  const sawedOffPercentages = AmberFadeCalculator.getFadePercentages('Sawed-Off');

  expect(sawedOffPercentages[999].seed).toBe(999);
  expect(sawedOffPercentages[999].ranking).toBe(353);
  expect(sawedOffPercentages[0].percentage).toBe(84.8679629387681);
  expect(sawedOffPercentages[412].percentage).toBe(80);
  expect(sawedOffPercentages[763].percentage).toBe(100);
  expect(sawedOffPercentages[999].percentage).toBe(86.91688014295212);
  expect(sawedOffPercentages).toHaveLength(1001);

  const mac10Percentages = AmberFadeCalculator.getFadePercentages('MAC-10');

  expect(mac10Percentages).toHaveLength(1001);
});

test('Get all fade percentages for all weapons', () => {
  const weaponFadePercentages = AmberFadeCalculator.getAllFadePercentages();

  const aug = weaponFadePercentages.find((weaponFadePercentage) => weaponFadePercentage.weapon === 'AUG');

  expect(aug!.percentages[0].percentage).toBe(84.8679629387681);
});
