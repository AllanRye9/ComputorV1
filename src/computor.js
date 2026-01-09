// const find = require('array.prototype.find');
// const findindex = require('array.prototype.findindex');
const {parse, parseSide} = require('./parse.js');
const {polynomial} = require('./polynomial.js');

let formula = process.argv.slice(2).join("").toUpperCase().split(" ").join("").split("=");
parse(formula);

poly.polynomial();
