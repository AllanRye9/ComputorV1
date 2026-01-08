
const polynomial = (data) =>{
    // step 1: polynomial solution
    console.log(`Reduced form: ${data}`);
    
    //step 2: polynomial degree
    console.log(`Polynomial degree: 2`);
    
    //step 3: discriminant calculation
    let cond1 = `Discriminant is strictly positive, the two solutions are:`;
    let cond2 = `The solution is:`;
    let cond3 = `The polynomial degree is strictly greater than 2, I can't solve.`;
    let cond4 = `Any real number is a solution.`;
    let cond5 = `No solution.`;
    
    console.log(`Discriminant: 1.636364`);
    console.log(`Discriminant: -34.3344`);
}

module.exports = {polynomial};
