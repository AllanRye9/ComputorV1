const abs = (a) => {
    return a < 0 ? -a : a;
}

const mySQRT = (a) => {
    let eps = 0.000001;
    let pred = a / 2;

    while (abs(pred * pred - a) > eps) {
        pred = (pred + a / pred) / 2;
    }

    let i = pred | 0;
    if ((i + 1) * (i + 1) === a) return i + 1;
    if (i * i === a) return i;

    return pred;
};

function gcd(a, b) {
    a = abs(a);
    b = abs(b);
    while (b !== 0) {
        let tmp = a % b;
        a = b;
        b = tmp;
    }
    return a;
}

function frac(num, den) {
    const g = gcd(num, den);
    num /= g;
    den /= g;
    if (den < 0) {
        num = -num;
        den = -den;
    }
    return num + "/" + den;
}

module.exports = { mySQRT, frac, gcd };