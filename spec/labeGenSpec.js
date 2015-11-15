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

  it("is OK with null as a label", function() {
    var frontLabel = null,
        backLabel = "v",
        labeler = lg.frontBackLabeler(null, backLabel);

    expect(labeler.next().value).toEqual(frontLabel);
    expect(labeler.next().value).toEqual(backLabel);
    expect(labeler.next().value).toEqual(frontLabel);
  });

});

describe("romanize", function() {

  it("works", function() {
    expect(lg.romanize(1)).toEqual('i');
    expect(lg.romanize(42)).toEqual('xlii');
    expect(lg.romanize(100)).toEqual('c');
  });

});

describe("deromanize", function() {

  it("works", function() {
    expect(lg.deromanize('i')).toEqual(1);
    expect(lg.deromanize('xlii')).toEqual(42);
    expect(lg.deromanize('c')).toEqual(100);
  });

});
