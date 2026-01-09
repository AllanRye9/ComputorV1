class Polynomial {
    polyExprR = [];
    polyExprL = [];

    constructor(exprObjR, exprObjL) {
        this.polyExprR = exprObjR || [];
        this.polyExprL = exprObjL || [];
    }

    simplifyEquation(side) {
        if (!side || !Array.isArray(side)) return [];
        
        return side
            .reduce((acc, [coeff, degree]) => {
                if (coeff == null || degree == null) return acc;
                acc[degree] = (acc[degree] ?? 0) + coeff;
                return acc;
            }, [])
            .map((coeff, degree) => coeff != null ? [coeff, degree] : null)
            .filter(Boolean);
    }

    // Should be called to prepare the polynomial
    reduce() {
        this.polyExprL = this.simplifyEquation(this.polyExprL);
        this.polyExprR = this.simplifyEquation(this.polyExprR);

        this.polyExprR.forEach((elem) => {
            if (elem[0] === 0) return;
            let found = this.polyExprL.findIndex(item => item[1] === elem[1]);
            if (found < 0)
                this.polyExprL.push([-elem[0], elem[1]]);
            else
                this.polyExprL[found][0] -= elem[0];
        });
        
        this.polyExprL = this.polyExprL
            .filter(elem => elem[0] !== 0)
            .sort((a, b) => b[1] - a[1]); // Sort by degree descending
    }

    stringifyEquation(pole) {
        if (!pole || pole.length === 0)
            return "0 * X^0";

        let str = "";
        pole.forEach((elem, index) => {
            const coeff = elem[0];
            const degree = elem[1];
            
            if (index > 0) {
                str += coeff >= 0 ? " + " : " - ";
            } else if (coeff < 0) {
                str += "-";
            }
            
            const absCoeff = Math.abs(coeff);
            str += `${absCoeff} * X^${degree}`;
        });
        return str;
    }

    printEquation() {
        // Reduce first to ensure we print the simplified form
        this.reduce();
        console.log("Reduced form: " + this.stringifyEquation(this.polyExprL) + " = 0");
        console.log("Polynomial degree: " + this.getDegree());
    }

    // Step 2: Get polynomial degree
    getDegree() {
        if (this.polyExprL.length === 0) return 0;
        return Math.max(...this.polyExprL.map(term => term[1]));
    }

    // Step 3: Discriminant calculation (for quadratic equations)
    getDiscriminant() {
        const degree = this.getDegree();
        if (degree !== 2) {
            throw new Error("Discriminant is only defined for quadratic equations (degree 2)");
        }

        // Find coefficients for ax² + bx + c = 0
        let a = 0, b = 0, c = 0;
        
        this.polyExprL.forEach(([coeff, deg]) => {
            if (deg === 2) a = coeff;
            else if (deg === 1) b = coeff;
            else if (deg === 0) c = coeff;
        });

        return b * b - 4 * a * c;
    }

    // Additional method to solve the polynomial
    solve() {
        const degree = this.getDegree();
        
        if (degree > 2) {
            console.log("The polynomial degree is strictly greater than 2, I can't solve.");
            return;
        }
        
        if (degree === 0) {
            // Constant polynomial
            const constant = this.polyExprL[0] ? this.polyExprL[0][0] : 0;
            if (constant === 0) {
                console.log("All real numbers are solutions.");
            } else {
                console.log("No solution.");
            }
            return;
        }
        
        if (degree === 1) {
            // Linear equation: ax + b = 0
            let a = 0, b = 0;
            this.polyExprL.forEach(([coeff, deg]) => {
                if (deg === 1) a = coeff;
                else if (deg === 0) b = coeff;
            });
            
            if (a === 0) {
                console.log("No solution.");
            } else {
                const solution = -b / a;
                console.log(`The solution is:\n${solution}`);
            }
            return;
        }
        
        if (degree === 2) {
            // Quadratic equation
            let a = 0, b = 0, c = 0;
            this.polyExprL.forEach(([coeff, deg]) => {
                if (deg === 2) a = coeff;
                else if (deg === 1) b = coeff;
                else if (deg === 0) c = coeff;
            });
            
            const discriminant = this.getDiscriminant();
            
            if (discriminant > 0) {
                const sqrtD = Math.sqrt(discriminant);
                const x1 = (-b - sqrtD) / (2 * a);
                const x2 = (-b + sqrtD) / (2 * a);
                console.log(`Discriminant is strictly positive, the two solutions are:\n${x1}\n${x2}`);
            } else if (discriminant === 0) {
                const x = -b / (2 * a);
                console.log(`Discriminant is zero, the solution is:\n${x}`);
            } else {
                const realPart = -b / (2 * a);
                const imaginaryPart = Math.sqrt(-discriminant) / (2 * a);
                console.log(`Discriminant is strictly negative, the two complex solutions are:\n${realPart} + ${imaginaryPart}i\n${realPart} - ${imaginaryPart}i`);
            }
        }
    }
}

module.exports = { Polynomial };