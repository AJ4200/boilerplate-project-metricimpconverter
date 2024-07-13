// controllers/convertHandler.js

function ConvertHandler() {
  this.getNum = function (input) {
    let result;
    let number = input.match(/[.\d\/]+/g) || ["1"];

    if (number.length > 1 || number[0].split("/").length > 2) {
      return "invalid number";
    }

    try {
      result = eval(number[0]);
    } catch (e) {
      return "invalid number";
    }

    return result;
  };

  this.getUnit = function (input) {
    let result;
    let unit = input.match(/[a-zA-Z]+/g);
    if (!unit) {
      return "invalid unit";
    }
    unit = unit[0].toLowerCase();
    switch (unit) {
      case "gal":
      case "l":
      case "mi":
      case "km":
      case "lbs":
      case "kg":
        result = unit === "l" ? "L" : unit;
        break;
      default:
        result = "invalid unit";
    }
    return result;
  };

  this.getReturnUnit = function (initUnit) {
    let result;
    switch (initUnit) {
      case "gal":
        result = "L";
        break;
      case "L":
        result = "gal";
        break;
      case "mi":
        result = "km";
        break;
      case "km":
        result = "mi";
        break;
      case "lbs":
        result = "kg";
        break;
      case "kg":
        result = "lbs";
        break;
    }
    return result;
  };

  this.spellOutUnit = function (unit) {
    let result;
    switch (unit) {
      case "gal":
        result = "gallons";
        break;
      case "L":
        result = "liters";
        break;
      case "mi":
        result = "miles";
        break;
      case "km":
        result = "kilometers";
        break;
      case "lbs":
        result = "pounds";
        break;
      case "kg":
        result = "kilograms";
        break;
    }
    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    switch (initUnit) {
      case "gal":
        result = initNum * galToL;
        break;
      case "L":
        result = initNum / galToL;
        break;
      case "mi":
        result = initNum * miToKm;
        break;
      case "km":
        result = initNum / miToKm;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;
    }
    return result;
  };
}

module.exports = ConvertHandler;
