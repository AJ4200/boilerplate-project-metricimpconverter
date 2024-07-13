// routes/api.js

"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.route("/api/convert").get(function (req, res) {
    let input = req.query.input;
    let initNum = convertHandler.getNum(input);
    let initUnit = convertHandler.getUnit(input);
    if (initNum === "invalid number" && initUnit === "invalid unit") {
      res.json({ error: "invalid number and unit" });
      return;
    }
    if (initNum === "invalid number") {
      res.json({ error: "invalid number" });
      return;
    }
    if (initUnit === "invalid unit") {
      res.json({ error: "invalid unit" });
      return;
    }
    let returnNum = convertHandler.convert(initNum, initUnit);
    let returnUnit = convertHandler.getReturnUnit(initUnit);
    let spelledOutInitUnit = convertHandler.spellOutUnit(initUnit);
    let spelledOutReturnUnit = convertHandler.spellOutUnit(returnUnit);

    res.json({
      initNum: initNum,
      initUnit: initUnit,
      returnNum: returnNum,
      returnUnit: returnUnit,
      string: `${initNum} ${spelledOutInitUnit} converts to ${returnNum} ${spelledOutReturnUnit}`,
    });
  });
};
