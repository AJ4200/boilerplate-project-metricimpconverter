// tests/1_unit-tests.js

const chai = require("chai");
const assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  test("convertHandler should correctly read a whole number input", function (done) {
    let input = "32L";
    assert.equal(convertHandler.getNum(input), 32);
    done();
  });

  test("convertHandler should correctly read a decimal number input", function (done) {
    let input = "3.2L";
    assert.equal(convertHandler.getNum(input), 3.2);
    done();
  });

  test("convertHandler should correctly read a fractional input", function (done) {
    let input = "1/2L";
    assert.equal(convertHandler.getNum(input), 0.5);
    done();
  });

  test("convertHandler should correctly read a fractional input with a decimal", function (done) {
    let input = "5.4/3L";
    assert.equal(convertHandler.getNum(input), 1.8);
    done();
  });

  test("convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3)", function (done) {
    let input = "3/2/3L";
    assert.equal(convertHandler.getNum(input), "invalid number");
    done();
  });

  test("convertHandler should correctly default to a numerical input of 1 when no numerical input is provided", function (done) {
    let input = "L";
    assert.equal(convertHandler.getNum(input), 1);
    done();
  });

  test("convertHandler should correctly read each valid input unit", function (done) {
    let input = "32g";
    assert.equal(convertHandler.getUnit(input), "invalid unit");
    done();
  });

  test("convertHandler should correctly return an error for an invalid input unit", function (done) {
    let input = "32kilomegagram";
    assert.equal(convertHandler.getUnit(input), "invalid unit");
    done();
  });

  test("convertHandler should return the correct return unit for each valid input unit", function (done) {
    let input = "gal";
    assert.equal(convertHandler.getReturnUnit(input), "L");
    done();
  });

  test("convertHandler should correctly return the spelled-out string unit for each valid input unit", function (done) {
    let input = "gal";
    assert.equal(convertHandler.spellOutUnit(input), "gallons");
    done();
  });

  test("convertHandler should correctly convert gal to L", function (done) {
    let input = "10gal";
    let initNum = convertHandler.getNum(input);
    let initUnit = convertHandler.getUnit(input);
    assert.approximately(
      convertHandler.convert(initNum, initUnit),
      37.8541,
      0.1
    );
    done();
  });

  test("convertHandler should correctly convert L to gal", function (done) {
    let input = "10L";
    let initNum = convertHandler.getNum(input);
    let initUnit = convertHandler.getUnit(input);
    assert.approximately(
      convertHandler.convert(initNum, initUnit),
      2.64172,
      0.1
    );
    done();
  });

  test("convertHandler should correctly convert mi to km", function (done) {
    let input = "5mi";
    let initNum = convertHandler.getNum(input);
    let initUnit = convertHandler.getUnit(input);
    assert.approximately(
      convertHandler.convert(initNum, initUnit),
      8.0467,
      0.1
    );
    done();
  });

  test("convertHandler should correctly convert km to mi", function (done) {
    let input = "5km";
    let initNum = convertHandler.getNum(input);
    let initUnit = convertHandler.getUnit(input);
    assert.approximately(
      convertHandler.convert(initNum, initUnit),
      3.10686,
      0.1
    );
    done();
  });

  test("convertHandler should correctly convert lbs to kg", function (done) {
    let input = "10lbs";
    let initNum = convertHandler.getNum(input);
    let initUnit = convertHandler.getUnit(input);
    assert.approximately(
      convertHandler.convert(initNum, initUnit),
      4.53592,
      0.1
    );
    done();
  });

  test("convertHandler should correctly convert kg to lbs", function (done) {
    let input = "10kg";
    let initNum = convertHandler.getNum(input);
    let initUnit = convertHandler.getUnit(input);
    assert.approximately(
      convertHandler.convert(initNum, initUnit),
      22.0462,
      0.1
    );
    done();
  });
});
