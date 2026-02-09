/**
 * Parser Module
 * Handles equation parsing and validation
 */

/**
 * Validates the equation format
 * @param {Array} formula - Array containing left and right sides of equation
 */
function validateEquation(formula) {
    if (process.argv.length < 3) {
        console.log('Format: ./computor "equation" = polynomial');
        process.exit(0);
    }
    
    if (formula.length !== 2) {
        console.log('Error: Invalid Equation Format');
        process.exit(0);
    }
}

/**
 * Combines two arrays
 * @param {Array} a - First array
 * @param {Array} b - Second array
 * @returns {Array} Combined array
 */
const combineArrays = (a, b) => a.concat(b);

/**
 * Creates a function caller helper
 * @param {string} methodName - Name of the method to call
 * @param {Array} args - Arguments to pass
 * @returns {Function} Function that applies the method
 */
const createMethodCaller = (methodName, args) => {
    return (item) => item[methodName].apply(item, args);
};

/**
 * Checks if a string contains invalid characters
 * @param {string} str - String to validate
 * @returns {boolean} True if invalid characters found
 */
const hasInvalidCharacters = (str) => /[^\d+\-Xx\^\*=\. ]/.test(str);

/**
 * Parses one side of the equation
 * @param {string} side - One side of the equation
 * @returns {Array} Array of [coefficient, degree] pairs
 */
const parseEquationSide = (side) => {
    // Validate input
    if (hasInvalidCharacters(side)) {
        console.log('Error: Invalid characters in equation');
        process.exit(0);
    }

    // Split by minus signs and process
    const terms = side
        .split('-')
        .map((item, index) => (index > 0 ? '-' + item : item))
        .filter((item) => item !== '')
        .map(createMethodCaller('split', ['+']))
        .reduce(combineArrays, [])
        .map(createMethodCaller('split', ['X']))
        .map(parseTermElement);

    return terms;
};

/**
 * Parses individual term element
 * @param {Array} elem - Element to parse
 * @returns {Array} [coefficient, degree]
 */
const parseTermElement = (elem) => {
    // Constant term (no X)
    if (elem.length === 1) {
        return [parseFloat(elem[0]), 0];
    }
    
    // Term with X
    if (elem.length === 2) {
        let coefficient = elem[0];
        let degree = elem[1];

        // Handle special coefficient cases
        if (coefficient === '-1') {
            coefficient = -1;
        } else if (coefficient === '' || coefficient === '+') {
            coefficient = 1;
        } else {
            coefficient = parseFloat(coefficient);
        }

        // Handle degree
        degree = degree === '' ? 1 : parseInt(degree.substr(1));

        return [coefficient, degree];
    }

    return elem;
};

module.exports = {
    validateEquation,
    parseEquationSide
};