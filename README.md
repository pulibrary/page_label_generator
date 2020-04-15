# Page Label Generator

[![CircleCI](https://circleci.com/gh/pulibrary/page_label_generator.svg?style=svg)](https://circleci.com/gh/pulibrary/page_label_generator)

The Page Label Generator is a module that automatically generates page labels
for "book-like" objects in a variety of ways. See the example usage section below
to see the variety of page labeling options such as roman numberals, back-to-front,
foliation, and starting numbers.

The Page Label Generator was originally written by [Jon Stroop](https://github.com/jpstroop/page_label_generator)
for [Plum](https://github.com/pulibrary/plum). This project cleans up some code, adds tape as a testing framework, and publishes it
as a npm module for easy inclusion into browser-based apps.

## Requires

If you want to run this code in the browser as part of your app, you will need webpack
and you will need to add the babel polyfill at the top of your entry script like so:
```
import babelPolyfill from 'babel-polyfill'
```

## Install

```
$ npm install
```

## Test and Lint

```
$ npm test
$ npm run lint
```

## Compile (Transpile to es5)

```
npm run compile
```

## Example usage in web app

See the [Webpack Demo project](https://github.com/sdellis/page_label_generator_webpack_demo) and the [Tonic notebook](https://tonicdev.com/sdellis/page-label-generator).

## Try it in the babel shell:

Start a shell session:

```bash
 $ babel-node
```

### Basic Numbering

```javascript

> let mod = require("./src/labelGen").default;
> let gen = mod.pageLabelGenerator();
> gen.next().value;
'1'
> gen.next().value;
'2'
> gen.next().value;
'3'

> let opts = { start: 1, unitLabel: "p. ", bracket: true}
> let gen = mod.pageLabelGenerator(opts);
> gen.next().value;
'[p. 5]'
> gen.next().value;
'[p. 6]'
> gen.next().value;
'[p. 7]'
> gen.next().value;
'[p. 8]'



```

### Foliation

```javascript

> let mod = require("./src/labelGen").default;
> let opts = { start: 42, method: "foliate", frontLabel: " r", backLabel: " v", unitLabel: "f. "};
> let gen = mod.pageLabelGenerator(opts);
> gen.next().value;
'f. 42 r'
> gen.next().value;
'f. 42 v'
> gen.next().value;
'f. 43 r'
> gen.next().value;
'f. 43 v'

> let opts = { start: 42, method: "foliate", frontLabel: "r", backLabel: "v", startWith: "back", unitLabel: "f. ", bracket: true};
> let gen = mod.pageLabelGenerator(opts);
> gen.next().value;
'[f. 42v]'
> gen.next().value;
'[f. 43r]'
> gen.next().value;
'[f. 43v]'
> gen.next().value;
'[f. 44r]'
> gen.next().value;
'[f. 44v]'
```

### Roman Numerals

```javascript

> let mod = require("./src/labelGen").default;
> let opts = { start: 'i', unitLabel: "p. "};
> let gen = mod.pageLabelGenerator(opts);
> gen.next().value;
'p. i'
> gen.next().value;
'p. ii'
> gen.next().value;
'p. iii'
> gen.next().value;
'p. iv'

> let opts = { start: 'xlii', method: "foliate", backLabel: " (verso)", startWith: "back", unitLabel: "f. ", bracket: true};
> let gen = mod.pageLabelGenerator(opts);
> gen.next().value;
'[f. xlii (verso)]'
> gen.next().value;
'[f. xliii]'
> gen.next().value;
'[f. xliii (verso)]'
> gen.next().value;
'[f. xliv]'
> gen.next().value;
'[f. xliv (verso)]'
> gen.next().value;
'[f. xlv]'

> let opts = { unitLabel: 'p. ', bracketOdds: true };
> let gen = mod.pageLabelGenerator(opts);
> gen.next().value
'[p. 1]'
> gen.next().value
'p. 2'
> gen.next().value
'[p. 3]'
> gen.next().value
'p. 4'

> let opts = { unitLabel: 'p. ', bracketEvens: true };
> let gen = mod.pageLabelGenerator(opts);
> gen.next().value
'p. 1'
> gen.next().value
'[p. 2]'
> gen.next().value
'p. 3'
> gen.next().value
'[p. 4]'
```

### 2 Ups

```javascript

> let mod = require("./src/labelGen").default;
> let opts = { start: 42, twoUp: true}
> let gen = mod.pageLabelGenerator(opts);
> gen.next().value
'42/43'
> gen.next().value
'44/45'
> gen.next().value
'46/47'
> gen.next().value
'48/49'

> let opts = { start: 42, unitLabel: "p. ", twoUp: true, twoUpSeparator: "-"}
> let gen = mod.pageLabelGenerator(opts);
> gen.next().value
'p. 43-42'
> gen.next().value
'p. 45-44'
> gen.next().value
'p. 47-46'
> gen.next().value
'p. 49-48'

> let opts = { start: 42, method: "foliate", frontLabel: "a", backLabel: "b", startWith: "back", unitLabel: "f. ", bracket: true, twoUp: true, twoUpDir: "rtl"}
> let gen = mod.pageLabelGenerator(opts);
> gen.next().value
'[f. 43a/42b]'
> gen.next().value
'[f. 44a/43b]'
> gen.next().value
'[f. 45a/44b]'
> gen.next().value
'[f. 46a/45b]'

> let opts = { twoUp: true, twoUpBracketRightOnly: true };
> let gen = mod.pageLabelGenerator(opts);
> gen.next().value
'1/[2]'
> gen.next().value
'3/[4]'
> gen.next().value
'5/[6]'
> gen.next().value
'7/[8]'

> let opts = { twoUp: true, twoUpBracketLeftOnly: true };
> let gen = mod.pageLabelGenerator(opts);
> gen.next().value
'[1]/2'
> gen.next().value
'[3]/4'
> gen.next().value
'[5]/6'
> gen.next().value
'[7]/8'

```

🤯
