import { FadeCalculator } from '../../src';

test('Get all supported weapons', () => {
  const supportedWeapons = FadeCalculator.getSupportedWeapons();

  expect(Array.isArray(supportedWeapons)).toBe(true);
  expect(supportedWeapons.length).toBeGreaterThan(0);
  expect(supportedWeapons).toContain('Shadow Daggers');
});

test('Get specific fade percentage for weapon', () => {
  const lowestMp7Percentage = FadeCalculator.getFadePercentage('MP7', 182);
  const highestMp7Percentage = FadeCalculator.getFadePercentage('MP7', 80);
  const midMp7Percentage = FadeCalculator.getFadePercentage('MP7', 329);

  expect(lowestMp7Percentage.percentage).toBe(80);
  expect(lowestMp7Percentage.seed).toBe(182);

  expect(highestMp7Percentage.percentage).toBe(100);
  expect(highestMp7Percentage.seed).toBe(80);

  expect(midMp7Percentage.percentage).toBe(91.81044998736732);
  expect(midMp7Percentage.seed).toBe(329);
});

test('Get all fade percentages for weapon', () => {
  const karambitPercentages = FadeCalculator.getFadePercentages('Karambit');

  expect(karambitPercentages[3].seed).toBe(3);
  expect(karambitPercentages[0].percentage).toBe(95.1320370612319);
  expect(karambitPercentages[412].percentage).toBe(100);
  expect(karambitPercentages[763].percentage).toBe(80);
  expect(karambitPercentages[999].percentage).toBe(93.08311985704788);

  const bayonetPercentages = FadeCalculator.getFadePercentages('Bayonet');

  expect(karambitPercentages[999].seed).toBe(999);
  expect(bayonetPercentages[0].percentage).toBe(84.8679629387681);
  expect(bayonetPercentages[412].percentage).toBe(80);
  expect(bayonetPercentages[763].percentage).toBe(100);
  expect(bayonetPercentages[999].percentage).toBe(86.91688014295212);
});

test('Get all fade percentages for all weapons', () => {
  const weaponFadePercentages = FadeCalculator.getAllFadePercentages();

  const awp = weaponFadePercentages.find((weaponFadePercentage) => weaponFadePercentage.weapon === 'AWP');

  expect(awp!.percentages[0].percentage).toBe(95.1320370612319);
});
