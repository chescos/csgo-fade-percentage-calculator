import { AcidFadeCalculator } from '../../src';

test('Get all supported weapons', () => {
  const supportedWeapons = AcidFadeCalculator.getSupportedWeapons();

  expect(Array.isArray(supportedWeapons)).toBe(true);
  expect(supportedWeapons.length).toBeGreaterThan(0);
  expect(supportedWeapons).toContain('SSG 08');
});

test('Get specific fade percentage for weapon', () => {
  const lowestSsg08Percentage = AcidFadeCalculator.getFadePercentage('SSG 08', 182);
  const highestSsg08Percentage = AcidFadeCalculator.getFadePercentage('SSG 08', 576);
  const midSsg08Percentage = AcidFadeCalculator.getFadePercentage('SSG 08', 187);

  expect(lowestSsg08Percentage.percentage).toBe(80);
  expect(lowestSsg08Percentage.seed).toBe(182);
  expect(lowestSsg08Percentage.ranking).toBe(1);

  expect(highestSsg08Percentage.percentage).toBe(100);
  expect(highestSsg08Percentage.seed).toBe(576);
  expect(highestSsg08Percentage.ranking).toBe(1);

  expect(midSsg08Percentage.percentage).toBe(90.18487051332353);
  expect(midSsg08Percentage.seed).toBe(187);
  expect(midSsg08Percentage.ranking).toBe(487);
});

test('Get all fade percentages for weapon', () => {
  const ssg08Percentages = AcidFadeCalculator.getFadePercentages('SSG 08');

  expect(ssg08Percentages[999].seed).toBe(999);
  expect(ssg08Percentages[999].ranking).toBe(454);
  expect(ssg08Percentages[0].percentage).toBe(86.58311851785098);
  expect(ssg08Percentages[182].percentage).toBe(80);
  expect(ssg08Percentages[576].percentage).toBe(100);
  expect(ssg08Percentages[999].percentage).toBe(89.72107504169335);
  expect(ssg08Percentages).toHaveLength(1001);
});

test('Get all fade percentages for all weapons', () => {
  const weaponFadePercentages = AcidFadeCalculator.getAllFadePercentages();

  const ssg08 = weaponFadePercentages.find((weaponFadePercentage) => weaponFadePercentage.weapon === 'SSG 08');

  expect(ssg08!.percentages[0].percentage).toBe(86.58311851785098);
});
