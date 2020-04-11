'use strict';

import test from 'tape';
import lg from '../labelGen.es6';

test('labelGen just counts up from 1 by default', function (assert) {

  var gen = lg.pageLabelGenerator();

  assert.plan(3);

  assert.equal(gen.next().value, '1', 'should generate 1');
  assert.equal(gen.next().value, '2', 'should generate 2');
  assert.equal(gen.next().value, '3', 'should generate 3');

  assert.end();
});

test('labelGen brackets', function (assert) {

  var opts = {
    unitLabel: '',
    bracket: true
  };

  var gen = lg.pageLabelGenerator(opts)

  assert.plan(3);

  assert.equal(gen.next().value, '[1]', 'should bracket the first value');
  assert.equal(gen.next().value, '[2]', 'should bracket the second value');
  assert.equal(gen.next().value, '[3]', 'should bracket the third value');

  assert.end();
});

test('labelGen takes a unit label', function (assert) {

  var opts = { unitLabel: 'p. '},
      gen = lg.pageLabelGenerator(opts)

  assert.plan(3);

  assert.equal(gen.next().value, 'p. 1', 'should equal p. 1');
  assert.equal(gen.next().value, 'p. 2', 'should equal p. 2');
  assert.equal(gen.next().value, 'p. 3', 'should equal p. 3');

  assert.end();
});

test('labelGen foliates with the correct front and back labels', function (assert) {

  var opts = {
    method: 'foliate',
    frontLabel: 'r',
    backLabel: 'v',
  };

  var gen = lg.pageLabelGenerator(opts)

  assert.plan(4);

  assert.equal(gen.next().value, '1r', 'should equal 1r');
  assert.equal(gen.next().value, '1v', 'should equal 1v');
  assert.equal(gen.next().value, '2r', 'should equal 2r');
  assert.equal(gen.next().value, '2v', 'should equal 2v');

  assert.end();
});

test('labelGen respects changes to everything', function (assert) {

  var opts = {
    start: 'vi',
    method: 'foliate',
    frontLabel: ' (recto)',
    backLabel: ' (verso)',
    startWith: 'back',
    unitLabel: 'f. ',
    bracket: true
  };

  var gen = lg.pageLabelGenerator(opts)

  assert.plan(3);

  assert.equal(gen.next().value, '[f. vi (verso)]', 'should equal [f. vi (verso)]');
  assert.equal(gen.next().value, '[f. vii (recto)]', 'should equal [f. vii (recto)]');
  assert.equal(gen.next().value, '[f. vii (verso)]', 'should equal [f. vii (verso)]');

  assert.end();
});

test('labelGen does 2-ups', function (assert) {

  var opts = { twoUp: true };
  var gen = lg.pageLabelGenerator(opts)

  assert.plan(3);

  assert.equal(gen.next().value, '1/2', 'should equal 1/2');
  assert.equal(gen.next().value, '3/4', 'should equal 3/4');
  assert.equal(gen.next().value, '5/6', 'should equal 5/6');

  assert.end();
});

test('labelGen does rtl 2-ups', function (assert) {

  var opts = {
    unitLabel: 'pp. ',
    twoUp: true,
    twoUpSeparator: '-',
    twoUpDir: 'rtl'
  };

  var gen = lg.pageLabelGenerator(opts)

  assert.plan(3);

  assert.equal(gen.next().value, 'pp. 2-1', 'should equal 2-1');
  assert.equal(gen.next().value, 'pp. 4-3', 'should equal 4-3');
  assert.equal(gen.next().value, 'pp. 6-5', 'should equal 6-5');

  assert.end();
});

test('labelGen does maddeningly complicated combinations', function (assert) {

  var opts = {
    method: 'foliate',
    frontLabel: 'a',
    backLabel: 'b',
    startWith: 'back',
    unitLabel: 'f. ',
    bracket: true,
    twoUp: true,
    twoUpDir: 'rtl'
  };

  var gen = lg.pageLabelGenerator(opts)

  assert.plan(3);

  assert.equal(gen.next().value, '[f. 2a/1b]', 'should equal [f. 2a/1b]');
  assert.equal(gen.next().value, '[f. 3a/2b]', 'should equal [f. 3a/2b]');
  assert.equal(gen.next().value, '[f. 4a/3b]', 'should equal [f. 4a/3b]');

  assert.end();
});

test('frontBackLabeler alternates between the given values', function (assert) {

  var opts = {
    frontLabel: ' (recto)',
    backLabel: ' (verso)',
    startWith: 'back'
  }

  var labeler = lg.frontBackLabeler(opts);

  assert.plan(3);

  assert.equal(labeler.next().value, opts.backLabel, 'should equal the back label');
  assert.equal(labeler.next().value, opts.frontLabel, 'should equal the front label');
  assert.equal(labeler.next().value, opts.backLabel, 'should equal the back label');

  assert.end();
});

test('frontBackLabeler is OK with only a backLabel', function (assert) {

  var opts = { 'backLabel': 'v' },
  labeler = lg.frontBackLabeler(opts);

  assert.plan(3);

  assert.equal(labeler.next().value, '', 'should equal the front label');
  assert.equal(labeler.next().value, opts.backLabel, 'should equal the back label');
  assert.equal(labeler.next().value, '', 'should equal the front label');

  assert.end();
});

test('pageNumberGenerator paginates with integers starting from 1 by default', function (assert) {

  var gen = lg.pageNumberGenerator();

  assert.plan(3);

  assert.equal(gen.next().value, 1, 'should generate 1');
  assert.equal(gen.next().value, 2, 'should generate 2');
  assert.equal(gen.next().value, 3, 'should generate 3');

  assert.end();
});

test('pageNumberGenerator can paginate starting with other integers', function (assert) {

  var gen = lg.pageNumberGenerator({ start: 5 });

  assert.plan(3);

  assert.equal(gen.next().value, 5, 'should generate 1');
  assert.equal(gen.next().value, 6, 'should generate 2');
  assert.equal(gen.next().value, 7, 'should generate 3');

  assert.end();
});

test('pageNumberGenerator will paginate with roman numerals', function (assert) {

  var gen = lg.pageNumberGenerator({ start: 'i' });

  assert.plan(3);

  assert.equal(gen.next().value, 'i', 'should generate "i"');
  assert.equal(gen.next().value, 'ii', 'should generate "ii"');
  assert.equal(gen.next().value, 'iii', 'should generate "iii"');

  assert.end();
});

test('pageNumberGenerator will paginate with roman numerals starting from other than "i"', function (assert) {

  var gen = lg.pageNumberGenerator({ start: 'xlii' });

  assert.plan(4);

  assert.equal(gen.next().value, 'xlii', 'should generate "xlii"');
  assert.equal(gen.next().value, 'xliii', 'should generate "xliii"');
  assert.equal(gen.next().value, 'xliv', 'should generate "xliv"');
  assert.equal(gen.next().value, 'xlv', 'should generate "xlv"');

  assert.end();
});

test('pageNumberGenerator will foliate', function (assert) {

  var gen = lg.pageNumberGenerator({ start: 1, method: 'foliate' });

  assert.plan(4);

  assert.equal(gen.next().value, 1, 'should generate 1');
  assert.equal(gen.next().value, 1, 'should generate 1');
  assert.equal(gen.next().value, 2, 'should generate 2');
  assert.equal(gen.next().value, 2, 'should generate 2');

  assert.end();
});

test('pageNumberGenerator will foliate starting with the back', function (assert) {

  var opts = { start: 1, method: 'foliate', startWith: 'back'},
      gen = lg.pageNumberGenerator(opts);

  assert.plan(5);

  assert.equal(gen.next().value, 1, 'should generate 1');
  assert.equal(gen.next().value, 2, 'should generate 2');
  assert.equal(gen.next().value, 2, 'should generate 2');
  assert.equal(gen.next().value, 3, 'should generate 3');
  assert.equal(gen.next().value, 3, 'should generate 3');

  assert.end();
});

test('pageNumberGenerator will foliate with roman numerals', function (assert) {

  var opts = { start: 'i', method: 'foliate' },
      gen = lg.pageNumberGenerator(opts);

  assert.plan(4);

  assert.equal(gen.next().value, 'i', 'should generate "i"');
  assert.equal(gen.next().value, 'i', 'should generate "i"');
  assert.equal(gen.next().value, 'ii', 'should generate "ii"');
  assert.equal(gen.next().value, 'ii', 'should generate "ii"');

  assert.end();
});

test('pageNumberGenerator will foliate starting with the back', function (assert) {

  var opts = { start: 'i', method: 'foliate', startWith: 'back'},
      gen = lg.pageNumberGenerator(opts);

  assert.plan(5);

  assert.equal(gen.next().value, 'i', 'should generate "i"');
  assert.equal(gen.next().value, 'ii', 'should generate "ii"');
  assert.equal(gen.next().value, 'ii', 'should generate "ii"');
  assert.equal(gen.next().value, 'iii', 'should generate "iii"');
  assert.equal(gen.next().value, 'iii', 'should generate "iii"');

  assert.end();
});

test('pageNumberGenerator will foliate starting with any number', function (assert) {

  var opts = { start: 42, method: 'foliate' },
      gen = lg.pageNumberGenerator(opts);

  assert.plan(4);

  assert.equal(gen.next().value, 42, 'should generate 42');
  assert.equal(gen.next().value, 42, 'should generate 42');
  assert.equal(gen.next().value, 43, 'should generate 43');
  assert.equal(gen.next().value, 43, 'should generate 43');

  assert.end();
});

test('pageNumberGenerator will foliate starting with any number starting with the back', function (assert) {

  var opts = { start: 42, method: 'foliate', startWith: 'back'},
      gen = lg.pageNumberGenerator(opts);

  assert.plan(5);

  assert.equal(gen.next().value, 42, 'should generate 42');
  assert.equal(gen.next().value, 43, 'should generate 43');
  assert.equal(gen.next().value, 43, 'should generate 43');
  assert.equal(gen.next().value, 44, 'should generate 44');
  assert.equal(gen.next().value, 44, 'should generate 44');

  assert.end();
});

test('pageNumberGenerator will foliate starting with any roman numeral', function (assert) {

  var opts = { start: 'xlii', method: 'foliate' },
      gen = lg.pageNumberGenerator(opts);

  assert.plan(4);

  assert.equal(gen.next().value, 'xlii', 'should generate "xlii"');
  assert.equal(gen.next().value, 'xlii', 'should generate "xlii"');
  assert.equal(gen.next().value, 'xliii', 'should generate "xliii"');
  assert.equal(gen.next().value, 'xliii', 'should generate "xliii"');

  assert.end();
});

test('pageNumberGenerator will foliate starting with any roman numeral starting with the back', function (assert) {

  var opts = { start: 'xlii', method: 'foliate', startWith: 'back'},
      gen = lg.pageNumberGenerator(opts);

  assert.plan(5);

  assert.equal(gen.next().value, 'xlii', 'should generate "xlii"');
  assert.equal(gen.next().value, 'xliii', 'should generate "xliii"');
  assert.equal(gen.next().value, 'xliii', 'should generate "xliii"');
  assert.equal(gen.next().value, 'xliv', 'should generate "xliv"');
  assert.equal(gen.next().value, 'xliv', 'should generate "xliv"');

  assert.end();
});

test('pageNumberGenerator respects case for roman numerals', function (assert) {

  var opts = { start: 'V' },
      gen = lg.pageNumberGenerator(opts);

  assert.plan(3);

  assert.equal(gen.next().value, 'V', 'should generate "V"');
  assert.equal(gen.next().value, 'VI', 'should generate "VI"');
  assert.equal(gen.next().value, 'VII', 'should generate "VII"');

  assert.end();
});

test('romanize seems to work', function (assert) {

  assert.plan(3);

  assert.equal(lg.romanize(1), 'i', 'should be "i"');
  assert.equal(lg.romanize(42), 'xlii', 'should be "xlii"');
  assert.equal(lg.romanize(100), 'c', 'should be "c"');

  assert.end();
});

test('deromanize seems to work', function (assert) {

  assert.plan(3);

  assert.equal(lg.deromanize('i'), 1, 'should be 1');
  assert.equal(lg.deromanize('xlii'), 42, 'should be 42');
  assert.equal(lg.deromanize('c'), 100, 'should be 100');

  assert.end();
});
