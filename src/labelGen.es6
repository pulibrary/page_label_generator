require("babel-core").transform("code");

module.exports = {

  /**
   * Generator for front and back of leaf labels.
   * @param {string} [frontLabel=null]  - The label for the front of a leaf.
   * @param {string} [backLabel=null] - The label for the back of a leaf.
   * @param {string} [startWith=front] - If set to "back", backLabel is yielded first.
   */
  frontBackLabeler: function* (frontLabel=null, backLabel=null, startWith="front") {
    let labels = [ frontLabel, backLabel ];
    if (startWith == "back")
      labels.reverse();
    let labeler = cycle(labels);
    while (true)
      yield labeler.next().value;
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
