/* eslint-disable no-console */
import FadeCalculatorModule from './modules/FadeCalculator';
import AmberFadeCalculatorModule from './modules/AmberFadeCalculator';
import AcidFadeCalculatorModule from './modules/AcidFadeCalculator';
import BerriesAndCherriesCalculatorModule from './modules/BerriesAndCherriesCalculator';

export const FadeCalculator = new FadeCalculatorModule();
export const AmberFadeCalculator = new AmberFadeCalculatorModule();
export const AcidFadeCalculator = new AcidFadeCalculatorModule();
export const BerriesAndCherriesCalculator = new BerriesAndCherriesCalculatorModule();
