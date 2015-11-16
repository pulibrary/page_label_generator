# Page Label Generator

Study to implement https://github.com/pulibrary/plum/issues/7

## Requires

Node >= 4.2.2

## Install

```
$ npm install
```

You might also want to install babel-cli globally:

```
$ npm install --global babel-cli
```

## Test

```
$ npm test
```

## Transpile to es5

```
babel src --out-dir lib
```

## Example in the babel-node shell

```
$ babel src --out-dir lib
$ babel-node
```

```node

> let mod = require("./lib/labelGen");

> let gen = mod.pageLabelGenerator();
> gen.next().value;
'1'
> gen.next().value;
'2'
> gen.next().value;
'3'

> let gen = mod.pageLabelGenerator(5, "paginate", "", "", "", "p. ", true);
> gen.next().value;
'[p. 5]'
> gen.next().value;
'[p. 6]'
> gen.next().value;
'[p. 7]'
> gen.next().value;
'[p. 8]'

> let gen = mod.pageLabelGenerator(42, "foliate", " r", " v", "", "f. ", false);
> gen.next().value;
'f. 42 r'
> gen.next().value;
'f. 42 v'
> gen.next().value;
'f. 43 r'
> gen.next().value;
'f. 43 v'

> let gen = mod.pageLabelGenerator(42, "foliate", "r", "v", "back", "f. ", true);
'use strict'
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

> // AND...
> let gen = mod.pageLabelGenerator('i', "paginate", "", "", "", "p. ", false);
> gen.next().value;
'p. i'
> gen.next().value;
'p. ii'
> gen.next().value;
'p. iii'
> gen.next().value;
'p. iv'

> let gen = mod.pageLabelGenerator('xlii', "foliate", "", " (verso)", "back", "f. ", true);
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
```
