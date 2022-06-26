import FadeCalculator from '../../src/modules/FadeCalculator';

test('Fade Calculator', () => {
  const fadeCalculator = new FadeCalculator();

  const percentages = fadeCalculator.calculateFadePercentages('Karambit');

  expect(percentages[412]).toBe(100);
  expect(percentages[763]).toBe(80);
});
