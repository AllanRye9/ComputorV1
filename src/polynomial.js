/**
 * Polynomial Solver Module
 * Core logic for solving polynomial equations
 */

const { validateEquation, parseEquationSide } = require('./parse.js');
const { squareRoot, formatFraction, greatestCommonDivisor } = require('./utils.js');

// Parse command-line arguments
const rawFormula = process.argv
    .slice(2)
    .join('')
    .toUpperCase()
    .split(' ')
    .join('')
    .split('=');

// Validate the equation format
validateEquation(rawFormula);

/**
 * Simplifies one side of the equation by combining like terms
 * @param {Array} terms - Array of [coefficient, degree] pairs
 * @returns {Array} Simplified array of terms
 */
const simplifyEquationSide = (terms) => {
    if (!terms || !Array.isArray(terms)) {
        console.log('Error: Invalid input format');
        process.exit(0);
    }

    return terms
        .reduce((accumulator, [coefficient, degree]) => {
            // Validate coefficient and degree
            if (
                degree < 0 ||
                !Number.isInteger(degree) ||
                (!Number.isInteger(coefficient) && !parseFloat(coefficient))
            ) {
                console.log('Error: Invalid degree or coefficient');
                process.exit(0);
            }

            if (coefficient == null || degree == null) {
                return accumulator;
            }

            // Combine like terms
            accumulator[degree] = (accumulator[degree] ?? 0) + coefficient;
            return accumulator;
        }, [])
        .map((coefficient, degree) => (coefficient != null ? [coefficient, degree] : null))
        .filter(Boolean);
};

/**
 * Moves all terms to the left side of the equation
 * @param {Array} leftSide - Left side terms
 * @param {Array} rightSide - Right side terms
 * @returns {Array} Combined terms on left side
 */
const moveTermsToLeft = (leftSide, rightSide) => {
    rightSide.forEach(([coefficient, degree]) => {
        if (coefficient === 0) return;

        const existingIndex = leftSide.findIndex((item) => item[1] === degree);

        if (existingIndex < 0) {
            leftSide.push([-coefficient, degree]);
        } else {
            leftSide[existingIndex][0] -= coefficient;
        }
    });

    return leftSide.filter((item) => item != null);
};

/**
 * Converts equation terms to string format
 * @param {Array} terms - Array of [coefficient, degree] pairs
 * @returns {string} Formatted equation string
 */
const stringifyEquation = (terms) => {
    if (terms.length === 0) {
        return '0 * X^0';
    }

    let equationString = `${terms[0][0]} * X^${terms[0][1]}`;

    terms.forEach((term, index) => {
        if (index === 0) return;

        const [coefficient, degree] = term;
        const sign = coefficient < 0 ? ' - ' : ' + ';
        const absCoefficient = coefficient < 0 ? -coefficient : coefficient;

        equationString += `${sign}${absCoefficient} * X^${degree}`;
    });

    return equationString;
};

/**
 * Finds the maximum degree in the equation
 * @param {Array} terms - Array of terms
 * @returns {Object} Term with maximum degree
 */
const findMaxDegree = (terms) => {
    return terms.reduce((max, current) => {
        return max[1] > current[1] ? max : current;
    }, [0, 0]);
};

/**
 * Extracts coefficient for a specific degree
 * @param {Array} terms - Array of terms
 * @param {number} degree - Degree to find
 * @returns {number} Coefficient value
 */
const getCoefficient = (terms, degree) => {
    const term = terms.find((x) => x[1] === degree);
    return term ? term[0] : 0;
};

/**
 * Solves a linear equation (degree 1)
 * @param {number} b - Coefficient of X^1
 * @param {number} c - Coefficient of X^0
 */
const solveLinear = (b, c) => {
    console.log('The solution is:');
    console.log(-c / b);
    process.exit(0);
};

/**
 * Solves a quadratic equation (degree 2)
 * @param {number} a - Coefficient of X^2
 * @param {number} b - Coefficient of X^1
 * @param {number} c - Coefficient of X^0
 */
const solveQuadratic = (a, b, c) => {
    const discriminant = b * b - 4 * a * c;

    if (discriminant > 0) {
        // Two distinct real solutions
        console.log('Discriminant is strictly positive, the two solutions are:');
        
        const sqrtDiscriminant = squareRoot(discriminant);
        const solution1 = (-b - sqrtDiscriminant) / (2 * a);
        const solution2 = (-b + sqrtDiscriminant) / (2 * a);

        console.log(solution1.toFixed(6));
        console.log(solution2.toFixed(6));
    } else if (discriminant === 0) {
        // One repeated real solution
        console.log('Discriminant is zero, the solution is:');
        console.log(-b / (2 * a));
    } else {
        // Two complex solutions
        solveComplexQuadratic(a, b, c, discriminant);
    }
};

/**
 * Solves quadratic with complex solutions
 * @param {number} a - Coefficient of X^2
 * @param {number} b - Coefficient of X^1
 * @param {number} c - Coefficient of X^0
 * @param {number} discriminant - Discriminant value
 */
const solveComplexQuadratic = (a, b, c, discriminant) => {
    console.log('Discriminant is strictly negative, the two complex solutions are:');

    let sqrtNegDiscriminant = squareRoot(-discriminant);
    
    // Check for perfect square
    const intValue = sqrtNegDiscriminant | 0;
    if ((intValue + 1) * (intValue + 1) === -discriminant) {
        sqrtNegDiscriminant = intValue + 1;
    } else if (intValue * intValue === -discriminant) {
        sqrtNegDiscriminant = intValue;
    }

    const denominator = 2 * a;
    const realPart = formatFraction(-b, denominator);

    /**
     * Formats imaginary part as fraction
     * @param {number} numerator - Numerator
     * @param {number} denominator - Denominator
     * @returns {string} Formatted imaginary part
     */
    const formatImaginaryPart = (numerator, denominator) => {
        const divisor = greatestCommonDivisor(numerator, denominator);
        numerator /= divisor;
        denominator /= divisor;

        if (denominator < 0) {
            numerator = -numerator;
            denominator = -denominator;
        }

        return denominator === 1 ? `${numerator}i` : `${numerator}i/${denominator}`;
    };

    const imaginaryPart = formatImaginaryPart(sqrtNegDiscriminant, denominator);

    console.log(`${realPart} + ${imaginaryPart}`);
    console.log(`${realPart} - ${imaginaryPart}`);
};

/**
 * Main solver function
 */
const solvePolynomial = () => {
    // Parse and simplify both sides
    const rightSide = simplifyEquationSide(parseEquationSide(rawFormula[1]));
    let leftSide = simplifyEquationSide(parseEquationSide(rawFormula[0]));

    // Move all terms to left side
    leftSide = moveTermsToLeft(leftSide, rightSide);

    // Display reduced form
    console.log(`Reduced form: ${stringifyEquation(leftSide)} = 0`);

    // Handle edge cases
    if (leftSide.length === 0) {
        console.log('Any real number is a solution.');
        process.exit(0);
    }

    if (leftSide[0][0] < 0 && leftSide.length === 1 && leftSide[0][1] === 0) {
        console.log('No solution.');
        process.exit(0);
    }

    // Find polynomial degree
    const maxDegreeTerm = findMaxDegree(leftSide);
    const degree = maxDegreeTerm[1];

    // Don't print degree for zero equation (0 * X^0 = 0)
    if (!(leftSide[0][0] === 0 && leftSide[0][1] === 0)) {
        console.log(`Polynomial degree: ${degree}`);
    }

    // Check if degree is supported
    if (degree > 2) {
        console.log("The polynomial degree is strictly greater than 2, I can't solve.");
        process.exit(0);
    }

    // Extract coefficients
    const a = getCoefficient(leftSide, 2);
    const b = getCoefficient(leftSide, 1);
    const c = getCoefficient(leftSide, 0);

    // Solve based on degree
    if (degree === 0) {
        const message = a !== 0 ? 'No solution.' : 'Any real number is a solution.';
        console.log(message);
        process.exit(0);
    }

    if (degree === 1) {
        solveLinear(b, c);
    }

    if (degree === 2) {
        solveQuadratic(a, b, c);
    }
};

module.exports = {
    solvePolynomial
};