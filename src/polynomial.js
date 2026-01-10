const {parse, parseSide } = require('./parse.js');

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
    // poly is meant to simplify the equation and solve it
    let Rside = poly.simplifyEquation(parseSide(formula[1]));
    let Lside = poly.simplifyEquation(parseSide(formula[0]));

    // for debugging
    console.log(Rside);
    console.log(Lside);

    Rside.forEach(
        (val) => {
            if (val[0] === 0) return;
            pos = Lside.findIndex((item) => { return item[1] === val[1]; });
            if (pos < 0) 
                Lside.push([-val[0], val[1]]);
            else 
                Lside[pos][0] -= val[0];
        }
    );

    Lside = Lside.filter((item) => { return item[0] !== 0; });

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
    console.log("Reduced form: " + stringifyEquation(Lside) + " = 0");
    if(Lside.length === 0) {
        console.log("Any real number is a solution.");
        process.exit(0);
    }

    if (Lside[0][0] < 0 && Lside.length === 1 && Lside[0][1] === 0) {
        console.log("No solution.");
        process.exit(0);
    }

    let maxDegree = Lside.reduce( (value1, value2) => {
            return value1[1] > value2[1] ? value1 : value2;
    }, 0);
    
    console.log("Polynomial degree: " + maxDegree[1]);
    
    if (maxDegree[1] > 2) {
        console.log("The polynomial degree is strictly greater than 2, I can't solve.");
        process.exit(0);
    }
}

module.exports = { polyExpr };