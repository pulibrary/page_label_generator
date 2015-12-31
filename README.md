# Page Label Generator

[![Build Status](https://travis-ci.org/sdellis/page_label_generator.svg?branch=master)](https://travis-ci.org/sdellis/page_label_generator)

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
