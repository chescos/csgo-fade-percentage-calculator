import { FadeCalculator } from '../../src';

test('Get specific fade percentage for weapon', () => {
  const percentage = FadeCalculator.getFadePercentage('MP7', 5);

  expect(percentage.percentage).toBe(81.6511271761842);
  expect(percentage.seed).toBe(5);
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
