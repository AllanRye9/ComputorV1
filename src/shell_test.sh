#!/bin/bash

echo "========================================"
echo "Testing Computor with 6 Example Cases"
echo "========================================"

# Test 1
echo -e "\nTest 1/6: Quadratic with positive discriminant"
echo "Input: 5 * X^0 + 4 * X^1 - 9.3 * X^2 = 1 * X^0"
output=$(./computor "5 * X^0 + 4 * X^1 - 9.3 * X^2 = 1 * X^0")
expected=$'Reduced form: 4 * X^0 + 4 * X^1 - 9.3 * X^2 = 0\nPolynomial degree: 2\nDiscriminant is strictly positive, the two solutions are:\n0.905239\n-0.475131'
if [ "$output" = "$expected" ]; then
    echo "✓ PASS"
else
    echo "✗ FAIL"
    echo "Expected:"
    echo "$expected"
    echo "Got:"
    echo "$output"
fi

# Test 2
echo -e "\nTest 2/6: Linear equation"
echo "Input: 5 * X^0 + 4 * X^1 = 4 * X^0"
output=$(./computor "5 * X^0 + 4 * X^1 = 4 * X^0")
expected=$'Reduced form: 1 * X^0 + 4 * X^1 = 0\nPolynomial degree: 1\nThe solution is:\n-0.25'
if [ "$output" = "$expected" ]; then
    echo "✓ PASS"
else
    echo "✗ FAIL"
    echo "Expected:"
    echo "$expected"
    echo "Got:"
    echo "$output"
fi

# Test 3
echo -e "\nTest 3/6: Cubic equation (degree > 2)"
echo "Input: 8 * X^0 - 6 * X^1 + 0 * X^2 - 5.6 * X^3 = 3 * X^0"
output=$(./computor "8 * X^0 - 6 * X^1 + 0 * X^2 - 5.6 * X^3 = 3 * X^0")
# Using $'...' for string with apostrophe
expected=$'Reduced form: 5 * X^0 - 6 * X^1 + 0 * X^2 - 5.6 * X^3 = 0\nPolynomial degree: 3\nThe polynomial degree is strictly greater than 2, I can'"'"'t solve.'
if [ "$output" = "$expected" ]; then
    echo "✓ PASS"
else
    echo "✗ FAIL"
    echo "Expected:"
    echo "$expected"
    echo "Got:"
    echo "$output"
fi

# Test 4
echo -e "\nTest 4/6: Identity (all real solutions)"
echo "Input: 6 * X^0 = 6 * X^0"
output=$(./computor "6 * X^0 = 6 * X^0")
expected=$'Reduced form: 0 * X^0 = 0\nAny real number is a solution.'
if [ "$output" = "$expected" ]; then
    echo "✓ PASS"
else
    echo "✗ FAIL"
    echo "Expected:"
    echo "$expected"
    echo "Got:"
    echo "$output"
fi

# Test 5
echo -e "\nTest 5/6: Contradiction (no solution)"
echo "Input: 10 * X^0 = 15 * X^0"
output=$(./computor "10 * X^0 = 15 * X^0")
expected=$'Reduced form: -5 * X^0 = 0\nNo solution.'
if [ "$output" = "$expected" ]; then
    echo "✓ PASS"
else
    echo "✗ FAIL"
    echo "Expected:"
    echo "$expected"
    echo "Got:"
    echo "$output"
fi

# Test 6
echo -e "\nTest 6/6: Quadratic with complex solutions"
echo "Input: 1 * X^0 + 2 * X^1 + 5 * X^2 = 0"
output=$(./computor "1 * X^0 + 2 * X^1 + 5 * X^2 = 0")
expected=$'Reduced form: 1 * X^0 + 2 * X^1 + 5 * X^2 = 0\nPolynomial degree: 2\nDiscriminant is strictly negative, the two complex solutions are:\n-1/5 + 2i/5\n-1/5 - 2i/5'
if [ "$output" = "$expected" ]; then
    echo "✓ PASS"
else
    echo "✗ FAIL"
    echo "Expected:"
    echo "$expected"
    echo "Got:"
    echo "$output"
fi

echo -e "\n========================================"
echo "Tests completed"
echo "========================================"