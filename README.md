# CS:GO Fade Percentage Calculator

Calculate the Fade percentage of a CS:GO skin based on a given seed value.


## Installation

In order to install the latest package version from NPM, simply run:

```bash
npm install csgo-fade-percentage-calculator
```

## Usage

```js
const { FadeCalculator } = require('csgo-fade-percentage-calculator');

// Get a list of all fade percentages for all available weapons.
const allFadePercentages = FadeCalculator.getAllFadePercentages();

// Get a list of fade percentages for the Karambit.
const karambitFadePercentages = FadeCalculator.getFadePercentages('Karambit');

// Get the fade percentage for the AWP and the seed 123.
const awpFadePercentage = FadeCalculator.getFadePercentage('AWP', 123);
```
