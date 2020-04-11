'use strict';

const name = 'page-label-generator',
      version = '1.1.0';

const labelGen = {

  /**
   * Generator for page labels.
   * @param {(number|string)} [start=1] - A number or a roman numeral.
   * @param {string} [method=paginate] - If set to "foliate" each value is
   * @param {string} [frontLabel=""]  - The label for the front of a leaf.
   * @param {string} [backLabel=""] - The label for the back of a leaf.
   *   yielded twice.
   * @param {string} [startWith=front] - If set to "back" and method=foliate,
   *   the first value only yielded once.
   * @param {string} [unitLabel=""] - A label for the unit, like "p. " or "f. ".
   * @param {boolean} [bracket=false] - If true add brackets ('[]') around the
   *   label.
   * @param {boolean} [twoUp=false] - If true, yield two values as a time
   * @param {string} [twoUpSeparator="/"] - If twoUp, separate the values
   *   with this string.
   * @param {string} [twoUpDir="ltr"] - ltr or rtl. If twoUp and "rtl", the
   *   the larger value with be on the left of the separator
   */

  pageLabelGenerator: function*({
    start = 1,
    method = 'paginate',
    frontLabel = '',
    backLabel = '',
    startWith ='front',
    unitLabel ='',
    bracket = false,
    twoUp  = false,
    twoUpSeparator = '/',
    twoUpDir = 'ltr'
  } = {}) {
    let numberer = this.pageNumberGenerator(arguments[0]),
        frontBackLabeler = this.frontBackLabeler(arguments[0]),
        [bracketOpen, bracketClose] = bracket ? ['[',']'] : ['',''];
    while (true) {
      let openLabel = `${bracketOpen}${unitLabel}`,
          num1 = numberer.next().value,
          side1 = frontBackLabeler.next().value;
      if (!twoUp) {
          yield `${openLabel}${num1}${side1}${bracketClose}`
      } else {
        let num2 = numberer.next().value,
            side2 = frontBackLabeler.next().value,
            sep = twoUpSeparator;
        if (twoUpDir=="rtl") {
            yield `${openLabel}${num2}${side2}${sep}${num1}${side1}${bracketClose}`;
        } else {
            yield `${openLabel}${num1}${side1}${sep}${num2}${side2}${bracketClose}`;
        }
      }
    }
  },

  /**
   * Generator for page numbers.
   * @param {(number|string)} [start=1] - A number or a roman numeral.
   * @param {string} [method=paginate] - If set to "foliate" each value is
   *   yielded twice.
   * @param {string} [startWith=front] - If set to "back" and method=foliate,
   *   the first value only yielded once.
   */
  pageNumberGenerator: function*({
    start = 1,
    method = "paginate",
    startWith = "front"
  } = {}) {
    let roman = false,
        capital = false,
        counter = start,
        changeFolio = false;

    if (!isInt(start)) {
      roman = true
      capital = start == start.toUpperCase()
      start.toLowerCase()
      counter = this.deromanize(start) // TODO: need an error if deromanize fails
    }

    if (startWith == "back") changeFolio = !changeFolio

    while(true) {
      if (roman) {
        let val = this.romanize(counter);
        if (capital) val = val.toUpperCase()
        yield val;
      }
      else yield counter;

      if (method == "foliate") {
        if (changeFolio) counter++;
        changeFolio = !changeFolio
      }
      else counter++
    }
  },

  /**
   * Generator for front and back of leaf labels.
   * @param {string} [frontLabel=""]  - The label for the front of a leaf.
   * @param {string} [backLabel=""] - The label for the back of a leaf.
   * @param {string} [startWith=front] - If set to "back", backLabel is yielded first.
   */
  frontBackLabeler: function*({
    frontLabel = "",
    backLabel = "",
    startWith = "front"
  } = {}) {
    let labels = [ frontLabel, backLabel ];
    if (startWith == "back") labels.reverse();
    let labeler = cycle(labels);
    while (true)
      yield labeler.next().value;
  },

  /**
   * Roman numeral helpers lifted from
   * http://blog.stevenlevithan.com/archives/javascript-roman-numeral-converter
   * with only slight modifications
   */
  romanize: function(num) {
  	if (!+num)
      return false;
  	var	digits = String(+num).split(""),
  		key = ["","c","cc","ccc","cd","d","dc","dcc","dccc","cm",
  		       "","x","xx","xxx","xl","l","lx","lxx","lxxx","xc",
  		       "","i","ii","iii","iv","v","vi","vii","viii","ix"],
  		roman = "",
  		i = 3;
  	while (i--)
  		roman = (key[+digits.pop() + (i * 10)] || "") + roman;
  	return Array(+digits.join("") + 1).join("m") + roman;
  },

  /**
   * Roman numeral helpers lifted from
   * http://blog.stevenlevithan.com/archives/javascript-roman-numeral-converter
   * with only slight modifications
   */
  deromanize: function(str) {
    var str = str.toLowerCase(),
  	    validator = /^m*(?:d?c{0,3}|c[md])(?:l?x{0,3}|x[cl])(?:v?i{0,3}|i[xv])$/,
        token = /[mdlv]|c[md]?|x[cl]?|i[xv]?/g,
        key = {m:1000,cm:900,d:500,cd:400,c:100,xc:90,l:50,xl:40,x:10,ix:9,v:5,iv:4,i:1},
        num = 0, m;
  	if (!(str && validator.test(str)))
  		return false;
  	while (m = token.exec(str))
  		num += key[m[0]];
  	return num;
  }
}

/**
 * Generator to endlessly iterate through the members of an array, starting over
 * at the beginning when members run out.
 * @param {*[]} arr - An array of anything.
 */
function* cycle(arr) {
  while (true) {
    let nxt = arr.shift();
    arr.push(nxt);
    yield nxt;
  }
}

function isInt(n){
  return Number(n) === n && n % 1 === 0;
}

export default labelGen;
