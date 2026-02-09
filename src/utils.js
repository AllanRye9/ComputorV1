/**
 * Mathematical Utility Functions
 */

/**
 * Returns the absolute value of a number
 * @param {number} value - Input number
 * @returns {number} Absolute value
 */
const absoluteValue = (value) => {
    return value < 0 ? -value : value;
};

/**
 * Calculates square root using Newton-Raphson method
 * @param {number} value - Number to find square root of
 * @returns {number} Square root
 */
const squareRoot = (value) => {
    const epsilon = 0.000001;
    let prediction = value / 2;

    // Newton-Raphson iteration
    while (absoluteValue(prediction * prediction - value) > epsilon) {
        prediction = (prediction + value / prediction) / 2;
    }

    // Check if perfect square
    const intValue = prediction | 0;
    if ((intValue + 1) * (intValue + 1) === value) {
        return intValue + 1;
    }
    if (intValue * intValue === value) {
        return intValue;
    }

    return prediction;
};

/**
 * Calculates greatest common divisor using Euclidean algorithm
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} GCD
 */
function greatestCommonDivisor(a, b) {
    a = absoluteValue(a);
    b = absoluteValue(b);

    while (b !== 0) {
        const temp = a % b;
        a = b;
        b = temp;
    }

    return a;
}

/**
 * Formats a fraction in simplified form
 * @param {number} numerator - Numerator
 * @param {number} denominator - Denominator
 * @returns {string} Formatted fraction
 */
function formatFraction(numerator, denominator) {
    const divisor = greatestCommonDivisor(numerator, denominator);
    
    numerator /= divisor;
    denominator /= divisor;

    // Ensure denominator is positive
    if (denominator < 0) {
        numerator = -numerator;
        denominator = -denominator;
    }

    return `${numerator}/${denominator}`;
}

module.exports = {
    absoluteValue,
    squareRoot,
    greatestCommonDivisor,
    formatFraction
};