require("babel-core").transform("code");

module.exports = {

  frontBackLabeler: function* (frontLabel=null, backLabel=null, startWith="front") {
    let labels = [ frontLabel, backLabel ];
    if (startWith == "back") {
      labels.reverse();
    }
    var labeler = cycle(labels)
    while (true)
      yield labeler.next().value;
  }

}

function* cycle(arr) {
  while (true) {
    let nxt = arr.shift();
    arr.push(nxt);
    yield nxt;
  }
}
