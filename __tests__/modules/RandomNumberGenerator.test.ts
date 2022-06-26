import RandomNumberGenerator from '../../src/modules/RandomNumberGenerator';

test('Random Number Generator Float', () => {
  const randomNumberGenerator = new RandomNumberGenerator();

  randomNumberGenerator.setSeed(72);

  const expectedResults = [
    0.5430997952553909,
    0.4063182856917001,
    62.14721345442683,
    0.05899016096209649,
  ];

  const actualResults = [
    randomNumberGenerator.randomFloat(0, 1),
    randomNumberGenerator.randomFloat(0, 1),
    randomNumberGenerator.randomFloat(0, 100),
    randomNumberGenerator.randomFloat(0, 1),
  ];

  actualResults.forEach((actualResult, i) => {
    const expectedResult = expectedResults[i];

    expect(actualResult).toBe(expectedResult);
  });
});
