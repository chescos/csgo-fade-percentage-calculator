import * as path from 'path';
import * as fs from 'fs';
import { FadeCalculator } from './src';

const weaponFadePercentages = FadeCalculator.getAllFadePercentages();

const fileContent = JSON.stringify(weaponFadePercentages, null, 2);
const filePath = path.join(__dirname, './generated/fade-percentages.json');

fs.writeFileSync(filePath, fileContent);
