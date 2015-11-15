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

describe("pageNumberGenerator", function() {

  it("paginates with integers starting from 1 by default", function() {
    var gen = lg.pageNumberGenerator();
    expect(gen.next().value).toEqual(1);
    expect(gen.next().value).toEqual(2);
    expect(gen.next().value).toEqual(3);
  });

  it("can paginate starting with other integers", function() {
    var gen = lg.pageNumberGenerator(5);
    expect(gen.next().value).toEqual(5);
    expect(gen.next().value).toEqual(6);
    expect(gen.next().value).toEqual(7);
  });

  it("will paginate with roman numerals", function() {
    var gen = lg.pageNumberGenerator('i');
    expect(gen.next().value).toEqual('i');
    expect(gen.next().value).toEqual('ii');
    expect(gen.next().value).toEqual('iii');
  });

  it("will paginate with roman numerals starting from other than 'i'", function() {
    var gen = lg.pageNumberGenerator('xlii');
    expect(gen.next().value).toEqual('xlii');
    expect(gen.next().value).toEqual('xliii');
    expect(gen.next().value).toEqual('xliv');
    expect(gen.next().value).toEqual('xlv');
  });

  it("will foliate", function() {
    var gen = lg.pageNumberGenerator(1, "foliate");
    expect(gen.next().value).toEqual(1);
    expect(gen.next().value).toEqual(1);
    expect(gen.next().value).toEqual(2);
    expect(gen.next().value).toEqual(2);
  });

  it("will foliate starting with the back", function() {
    var gen = lg.pageNumberGenerator(1, "foliate", "back");
    expect(gen.next().value).toEqual(1);
    expect(gen.next().value).toEqual(2);
    expect(gen.next().value).toEqual(2);
    expect(gen.next().value).toEqual(3);
    expect(gen.next().value).toEqual(3);
  });

  it("will foliate with roman numerals", function() {
    var gen = lg.pageNumberGenerator('i', "foliate");
    expect(gen.next().value).toEqual('i');
    expect(gen.next().value).toEqual('i');
    expect(gen.next().value).toEqual('ii');
    expect(gen.next().value).toEqual('ii');
  });

  it("will foliate with roman numerals starting with the back", function() {
    var gen = lg.pageNumberGenerator('i', "foliate", "back");
    expect(gen.next().value).toEqual('i');
    expect(gen.next().value).toEqual('ii');
    expect(gen.next().value).toEqual('ii');
    expect(gen.next().value).toEqual('iii');
    expect(gen.next().value).toEqual('iii');
  });

 it("will foliate starting with any number", function() {
   var gen = lg.pageNumberGenerator(42, "foliate");
   expect(gen.next().value).toEqual(42);
   expect(gen.next().value).toEqual(42);
   expect(gen.next().value).toEqual(43);
   expect(gen.next().value).toEqual(43);
 });

 it("will foliate starting with any number starting with the back", function() {
   var gen = lg.pageNumberGenerator(42, "foliate", "back");
   expect(gen.next().value).toEqual(42);
   expect(gen.next().value).toEqual(43);
   expect(gen.next().value).toEqual(43);
   expect(gen.next().value).toEqual(44);
   expect(gen.next().value).toEqual(44);
 });

 it("will foliate starting with any roman numeral", function() {
   var gen = lg.pageNumberGenerator('xlii', "foliate");
   expect(gen.next().value).toEqual('xlii');
   expect(gen.next().value).toEqual('xlii');
   expect(gen.next().value).toEqual('xliii');
   expect(gen.next().value).toEqual('xliii');
 });

 it("will foliate starting with any roman numeral starting with the back", function() {
   var gen = lg.pageNumberGenerator('xlii', "foliate", "back");
   expect(gen.next().value).toEqual('xlii');
   expect(gen.next().value).toEqual('xliii');
   expect(gen.next().value).toEqual('xliii');
   expect(gen.next().value).toEqual('xliv');
   expect(gen.next().value).toEqual('xliv');
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
