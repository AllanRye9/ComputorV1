const { parse, parseSide } = require('./parse.js');
const { mySQRT, frac, gcd } = require('./utils.js');

let formula = process.argv.slice(2).join("").toUpperCase().split(" ").join("").split("=");
// parsing is meant to check for invalid inputs
parse(formula);

const poly = {
    simplifyEquation: (side) => {
        if (!side || !Array.isArray(side)) return ("Not array or invalid input");
        return side
            .reduce((acc, [coeff, degree]) => {
                if (degree < 0 || !Number.isInteger(degree) ||
                (!Number.isInteger(coeff) && !parseFloat(coeff))) {
                    console.log("Error: Invalid degree/coeff ");
                    process.exit(0);
                }
                if (coeff == null || degree == null) return acc;
                acc[degree] = (acc[degree] ?? 0) + coeff;
                return acc;
            }, [])
            .map((coeff, degree) => coeff != null ? [coeff, degree] : null)
            .filter(Boolean);
    }
}

const polyExpr = () => {
    let right = poly.simplifyEquation(parseSide(formula[1]));
    let left = poly.simplifyEquation(parseSide(formula[0]));

    right.forEach(
        (val) => {
            if (val[0] === 0) return;
            pos = left.findIndex((item) => { return item[1] === val[1]; });
            if (pos < 0)
                left.push([-val[0], val[1]]);
            else
                left[pos][0] -= val[0];
        }
    );
    
    left = left.filter(item => item != null); 
    const stringifyEquation = (side) => {
        if (side.length === 0) return "0 * X^0";
        let str = side[0][0] + " * X^" + side[0][1];
        side.forEach((item, index) => {
            if (index === 0) return;
            str += item[0] < 0 ? ' - ' : ' + ';
            str += item[0] < 0 ? -item[0] : item[0];
            str += " * X^" + item[1];
        });
        return str;
    }
    console.log("Reduced form: " + stringifyEquation(left) + " = 0");
    if (left.length === 0) {
        console.log("Any real number is a solution.");
        process.exit(0);
    }

    if (left[0][0] < 0 && left.length === 1 && left[0][1] === 0) {
        console.log("No solution.");
        process.exit(0);
    }

    let maxDegree = left.reduce((value1, value2) => {
        return value1[1] > value2[1] ? value1 : value2;
    }, 0);

    if (!(left[0][0]=== 0 && right[0][1] === 0))
        console.log("Polynomial degree: " + maxDegree[1]);

    if (maxDegree[1] > 2) {
        console.log("The polynomial degree is strictly greater than 2, I can't solve.");
        process.exit(0);
    }
    let a = left.find(x => { return x[1] == 2; });
    let b = left.find(x => { return x[1] == 1; });
    let c = left.find(x => { return x[1] == 0; });
    a = a ? a[0] : 0;
    b = b ? b[0] : 0;
    c = c ? c[0] : 0;

    if (maxDegree[1] === 0) {
        a != 0 ? console.log("No solution.") : console.log("Any real number is a solution.");
        process.exit(0);
    }
    if (maxDegree[1] === 1) {
        console.log("The solution is:\n" + (-c / b));
        process.exit(0);
    }
    if (maxDegree[1] === 2) {
        let discriminant = (b * b) - (4 * a * c);
        if (discriminant > 0) {
            console.log("Discriminant is strictly positive, the two solutions are:");

            const x = mySQRT(discriminant);
            const y = x;

            console.log(((-b - x) / (2 * a)).toFixed(6));
            console.log(((-b + y) / (2 * a)).toFixed(6));

        } else if (discriminant === 0) {
            console.log("Discriminant is zero, the solution is:\n");
            console.log(-b / (2 * a));
        } else {
            let sqrtDelta = mySQRT(-discriminant);
            let i = sqrtDelta | 0;
            if ((i + 1) * (i + 1) === -discriminant) sqrtDelta = i + 1;
            else if (i * i === -discriminant) sqrtDelta = i;

            const den = 2 * a;
            console.log("Discriminant is strictly negative, the two complex solutions are:");

            const realPart = frac(-b, den);

            function complexFrac(num, den) {
                const g = gcd(num, den);
                num /= g;
                den /= g;
                return num + "i/" + den;
            }
            const imagPart = complexFrac(sqrtDelta, den);
            console.log(realPart + " + " + imagPart);
            console.log(realPart + " - " + imagPart);
        }
    }
}

module.exports = { polyExpr };