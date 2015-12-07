# Page Label Generator

Study to implement https://github.com/pulibrary/plum/issues/7

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
