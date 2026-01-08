const {parse} = require('./parse.js');
const {polynomial} = require('./polynomial.js');

const data = parse();

polynomial(data);