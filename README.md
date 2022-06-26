# CS:GO Fade Percentage Calculator

Calculate the Fade percentage of a CS:GO skin based on a given seed value. Supporting all
[Fade skins](https://csgoskins.gg/families/fade) except for gloves. Easily convert every paint seed
(also called pattern index) into a fade percentage value, or get a full list of all paint seeds and
the corresponding fade percentages.

## 🚀 Installation

In order to install the latest package version from NPM, simply run:

```bash
npm install csgo-fade-percentage-calculator
```

## 🛠 Usage

```js
const { FadeCalculator } = require('csgo-fade-percentage-calculator');

// Get a list of all fade percentages for all available weapons.
const allFadePercentages = FadeCalculator.getAllFadePercentages();

// Get a list of fade percentages for the Karambit.
const karambitFadePercentages = FadeCalculator.getFadePercentages('Karambit');

// Get the fade percentage for the AWP and the seed 123.
const awpFadePercentage = FadeCalculator.getFadePercentage('AWP', 123);
```

## 📜 How It Works

Each CS:GO weapon skin has a random paint seed value between 0 and 999. This paint seed value, sometimes also
called pattern index, determines the positioning of the pattern on the gun. Specifically, the paint seed determines
the X offset, Y offset, and rotation value for the pattern position. Those three values can be calculated using
an algorithm which has been open-sourced by Valve.

Luckily, all Fade skins have the same X and Y offsets, and only the rotation value changes with each paint index.
This package simply converts paint indexes to rotation values, and then assigns each rotation value a fade percentage
between 80 and 100, where the lowest rotation value is a 100% Fade, and the highest rotation where is an 80% Fade.

The whole process just involves simple math, and it is superior to any image pixel color analysis for various reasons:

- The resulting Fade percentage values are 100% accurate
- The methodology can be easily verified and reproduced
- The algorithm is simple and fast

## 🌎 Platform Support

There are already a few platforms that use the open-source algorithm implemented by this package to generate
fade percentage values for Fade skins from paint seed values, namely:

- [CSGOSKINS.GG](https://csgoskins.gg/)
- [Skinport](https://skinport.com/)

Other sites that are currently known to use their own algorithms, probably based on image analysis:

- [BUFF163](https://buff.163.com/)
- [CS.MONEY](https://cs.money/)
- [BroSkins](https://broskins.com/)
