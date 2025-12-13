# ComputorV1

The project based on mathematical formula of polynomials considering the principles that validates the equation. There are 3 steps in solving the equation using codes, firstly simplify the equation based on divisibility or common factors which can be directly solved for less than 2 roots, secondly finding the roots, and then the answer.

## Features

- Parse polynomial equations in various formats
- Display equations in reduced form
- Compute polynomial degree
- Handle equations with terms on both sides

## Usage

Run the program with a polynomial equation as an argument:

```bash
python3 computor.py "equation"
```

### Examples

```bash
# Quadratic equation
python3 computor.py "5 * X^0 + 4 * X^1 - 9.3 * X^2 = 1 * X^0"
# Output:
# Reduced form: - 9.3 * X^2 + 4 * X + 4 = 0
# Polynomial degree: 2

# Linear equation
python3 computor.py "5 * X^0 + 4 * X^1 = 4 * X^0"
# Output:
# Reduced form: 4 * X + 1 = 0
# Polynomial degree: 1

# Simplified notation
python3 computor.py "X^2 + 2*X + 1 = 0"
# Output:
# Reduced form: 1 * X^2 + 2 * X + 1 = 0
# Polynomial degree: 2
```

## Testing

Run the test suite to verify the implementation:

```bash
python3 test_computor.py
```

## Input Format

The program accepts polynomial equations in the following format:
- Terms can be written with or without spaces
- Use `X` or `x` for the variable
- Use `^` to denote exponents (e.g., `X^2`)
- Use `*` for multiplication (e.g., `5 * X^2`)
- The equation must contain an `=` sign
- Both sides of the equation can have multiple terms
