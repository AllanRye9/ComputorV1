function parse(formula) {
    if (process.argv.length < 3) {
        console.log("Format: ./computor \"equation\" = polynomial");
        process.exit(0);
    }
    if (formula.length != 2) {
        console.log("Error: Invalid Equation Format");
        process.exit(0);
    }
}

const comb = (a, b) => {
    return a.concat(b);
}

const callFunc = (index, value) => {
    return (item) => {
        return item[index].apply(item, value)
    }
}

const hasInvalidChars = (str) => /[^\d+\-Xx\^\*= ]/.test(str);

const parseSide = (side) => {
    let value = hasInvalidChars(side) ? (console.log("Error: Invalid characters in equation"), process.exit(0)) : side;

    return value.split('-').map((item, index) => {
        return index > 0 ? '-' + item : item;
    }).filter((item) => { return item !== ""; }).map(
        callFunc("split", ["+"])
    ).reduce(comb, []).map(callFunc("split", ['X'])).map(
        (elem) => {
            if (elem.length === 1)
                elem = [parseFloat(elem[0]), 0];
            else if (elem.length === 2) {
                elem[0] = elem[0] == "-1" ? -1 : elem[0];
                elem[0] = elem[0] == "" ? 1 : parseFloat(elem[0]);
                elem[1] = elem[1] == "" ? 1 : parseInt(elem[1].substr(1));
            }
            return elem;
        }
    );
}

module.exports = { parse, parseSide };