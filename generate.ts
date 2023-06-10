import * as path from 'path';
import * as fs from 'fs';
import {
  FadeCalculator, AmberFadeCalculator, AcidFadeCalculator, BerriesAndCherriesCalculator,
} from './src';

const config = [
  {
    percentages: FadeCalculator.getAllFadePercentages(),
    type: 'fade',
  },
  {
    percentages: AmberFadeCalculator.getAllFadePercentages(),
    type: 'amber-fade',
  },
  {
    percentages: AcidFadeCalculator.getAllFadePercentages(),
    type: 'acid-fade',
  },
  {
    percentages: BerriesAndCherriesCalculator.getAllFadePercentages(),
    type: 'berries-and-cherries',
  },
];

config.forEach((entry) => {
  const fileContent = JSON.stringify(entry.percentages, null, 2);
  const filePath = path.join(__dirname, `./generated/${entry.type}-percentages.json`);

  fs.writeFileSync(filePath, fileContent);
});
