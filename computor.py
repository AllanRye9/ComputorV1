#!/usr/bin/env python3
"""
ComputorV1 - Polynomial Equation Solver
This program parses, simplifies, and displays polynomial equations.
"""

import sys
import re
from typing import Dict


class PolynomialEquation:
    """Class to represent and manipulate polynomial equations."""
    
    def __init__(self, equation_str: str):
        """Initialize with equation string."""
        self.original_equation = equation_str
        self.coefficients = {}
        self.parse_equation(equation_str)
    
    def parse_equation(self, equation_str: str) -> None:
        """Parse the equation string and extract coefficients."""
        # Remove spaces
        equation_str = equation_str.replace(' ', '')
        
        # Split by '='
        if '=' not in equation_str:
            raise ValueError("Invalid equation: missing '=' sign")
        
        left, right = equation_str.split('=', 1)
        
        # Parse both sides
        left_coeffs = self._parse_side(left)
        right_coeffs = self._parse_side(right)
        
        # Move everything to the left side (subtract right from left)
        self.coefficients = left_coeffs.copy()
        for power, coeff in right_coeffs.items():
            self.coefficients[power] = self.coefficients.get(power, 0) - coeff
        
        # Remove zero coefficients
        self.coefficients = {k: v for k, v in self.coefficients.items() if v != 0}
        
        # If no coefficients remain, add 0 constant term
        if not self.coefficients:
            self.coefficients[0] = 0
    
    def _parse_side(self, side: str) -> Dict[int, float]:
        """Parse one side of the equation and return coefficients by power."""
        coeffs = {}
        
        # Add a '+' at the beginning if the first character is not '+' or '-'
        if side and side[0] not in ['+', '-']:
            side = '+' + side
        
        # Find all terms (coefficient * X^power)
        # Pattern matches: optional sign, optional coefficient, optional X^power
        pattern = r'([+-]?)(\d*\.?\d+|\d+)?(\*?[Xx])?(\^(\d+))?'
        
        pos = 0
        while pos < len(side):
            match = re.match(pattern, side[pos:])
            if not match or match.group(0) == '':
                pos += 1
                continue
            
            sign_str = match.group(1) or '+'
            coeff_str = match.group(2)
            x_str = match.group(3)
            power_str = match.group(5)
            
            # Skip if this is just a sign with nothing following
            if not coeff_str and not x_str:
                pos += len(match.group(0))
                continue
            
            # Determine coefficient
            if coeff_str:
                coeff = float(coeff_str)
            else:
                coeff = 1.0 if x_str else 0.0
            
            # Apply sign
            if sign_str == '-':
                coeff = -coeff
            
            # Determine power
            if x_str:
                if power_str:
                    power = int(power_str)
                else:
                    power = 1
            else:
                power = 0
            
            # Add to coefficients
            if coeff != 0:
                coeffs[power] = coeffs.get(power, 0) + coeff
            
            pos += len(match.group(0))
        
        return coeffs
    
    def get_reduced_form(self) -> str:
        """Return the reduced form of the equation."""
        if not self.coefficients:
            return "0 = 0"
        
        # Sort powers in descending order
        sorted_powers = sorted(self.coefficients.keys(), reverse=True)
        
        terms = []
        for i, power in enumerate(sorted_powers):
            coeff = self.coefficients[power]
            
            # Determine absolute coefficient value
            abs_coeff = abs(coeff)
            is_integer = float(coeff).is_integer()
            coeff_display = str(int(abs_coeff)) if is_integer else str(abs_coeff)
            
            # Handle special case of coefficient = 1 or -1 for X terms
            if power > 0 and abs_coeff == 1:
                coeff_str_value = ""
            else:
                coeff_str_value = coeff_display
            
            # Format sign and coefficient
            if i == 0:
                # First term
                if coeff < 0:
                    if coeff_str_value:
                        coeff_str = f"- {coeff_str_value}"
                    else:
                        coeff_str = "-"
                else:
                    if coeff_str_value:
                        coeff_str = coeff_str_value
                    else:
                        coeff_str = ""
            else:
                # Subsequent terms
                if coeff < 0:
                    if coeff_str_value:
                        coeff_str = f"- {coeff_str_value}"
                    else:
                        coeff_str = "-"
                else:
                    if coeff_str_value:
                        coeff_str = f"+ {coeff_str_value}"
                    else:
                        coeff_str = "+"
            
            # Format power
            if power == 0:
                power_str = ""
            elif power == 1:
                power_str = " * X" if coeff_str_value else "X"
            else:
                power_str = f" * X^{power}" if coeff_str_value else f"X^{power}"
            
            # Handle spacing
            if coeff_str and power_str and not power_str.startswith(" "):
                term = f"{coeff_str} {power_str}"
            else:
                term = f"{coeff_str}{power_str}"
            
            terms.append(term)
        
        return " ".join(terms) + " = 0"
    
    def get_degree(self) -> int:
        """Return the degree of the polynomial."""
        if not self.coefficients:
            return 0
        return max(self.coefficients.keys())
    
    def display(self) -> None:
        """Display the polynomial equation information."""
        print(f"Reduced form: {self.get_reduced_form()}")
        print(f"Polynomial degree: {self.get_degree()}")


def main():
    """Main function to run the polynomial equation solver."""
    if len(sys.argv) != 2:
        print("Usage: python computor.py \"equation\"")
        print("Example: python computor.py \"5 * X^0 + 4 * X^1 - 9.3 * X^2 = 1 * X^0\"")
        sys.exit(1)
    
    equation_str = sys.argv[1]
    
    try:
        poly = PolynomialEquation(equation_str)
        poly.display()
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
