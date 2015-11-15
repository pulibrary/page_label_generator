import install from 'jasmine-es6';
install();

var lg = require('../src/labelGen.es6')

describe("frontBackLabeler", function() {

  it("alternates between the given values", function() {
    var frontLabel = "r",
        backLabel = "v",
        labeler = lg.frontBackLabeler(frontLabel, backLabel);

    expect(labeler.next().value).toEqual(frontLabel);
    expect(labeler.next().value).toEqual(backLabel);
    expect(labeler.next().value).toEqual(frontLabel);
  });

  it("can start with the back", function() {
    var frontLabel = "r",
        backLabel = "v",
        labeler = lg.frontBackLabeler(frontLabel, backLabel, "back");

    expect(labeler.next().value).toEqual(backLabel);
    expect(labeler.next().value).toEqual(frontLabel);
    expect(labeler.next().value).toEqual(backLabel);
  });

});
