require("babel-core").transform("code");

module.exports = {

  /**
   * Generator for page numbers.
   * @param {(number|string)} [start=1] - A number or a roman numeral.
   * @param {string} [method=paginate] - If set to "foliate" each value is
   *   yielded twice.
   * @param {string} [startWith=front] - If set to "back" and method=foliate,
   *   the first value only yielded once.
   */
  // pageNumberEnumerator: function*(start=1, method="paginate", startWith="front") {
  //
  // },

  /**
   * Generator for front and back of leaf labels.
   * @param {string} [frontLabel=null]  - The label for the front of a leaf.
   * @param {string} [backLabel=null] - The label for the back of a leaf.
   * @param {string} [startWith=front] - If set to "back", backLabel is yielded first.
   */
  frontBackLabeler: function*(frontLabel=null, backLabel=null, startWith="front") {
    let labels = [ frontLabel, backLabel ];
    if (startWith == "back")
      labels.reverse();
    let labeler = this.cycle(labels);
    while (true)
      yield labeler.next().value;
  },

  /**
   * Generator to endlessly iterate through the members of an array, starting over
   * at the beginning when members run out.
   * @param {*[]} arr - An array of anything.
   */
  cycle: function*(arr) {
    while (true) {
      let nxt = arr.shift();
      arr.push(nxt);
      yield nxt;
    }
  },

  // Roman numeral helpers lifted from
  // http://blog.stevenlevithan.com/archives/javascript-roman-numeral-converter
  romanize: function(num) {
  	if (!+num)
  		return NaN;
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

  deromanize: function(str) {
  	var	str = str.toLowerCase(),
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
