#!/usr/bin/env python3
"""
Test script for ComputorV1
Tests various polynomial equations to ensure correct parsing and display.
"""

import subprocess
import sys


def run_test(equation, expected_in_output=None):
    """Run a test case."""
    print(f"\nTesting: {equation}")
    try:
        result = subprocess.run(
            ['python3', 'computor.py', equation],
            capture_output=True,
            text=True,
            timeout=5
        )
        print(result.stdout)
        if result.returncode != 0:
            print(f"ERROR: {result.stderr}")
            return False
        if expected_in_output:
            for expected in expected_in_output:
                if expected not in result.stdout:
                    print(f"ERROR: Expected '{expected}' not found in output")
                    return False
        return True
    except subprocess.TimeoutExpired:
        print("ERROR: Test timed out")
        return False
    except Exception as e:
        print(f"ERROR: {e}")
        return False


def main():
    """Run all tests."""
    print("=" * 60)
    print("ComputorV1 Test Suite")
    print("=" * 60)
    
    tests = [
        ("5 * X^0 + 4 * X^1 - 9.3 * X^2 = 1 * X^0", 
         ["Reduced form:", "Polynomial degree: 2"]),
        
        ("5 * X^0 + 4 * X^1 = 4 * X^0",
         ["Reduced form:", "Polynomial degree: 1"]),
        
        ("X^2 + 2*X + 1 = 0",
         ["Reduced form:", "Polynomial degree: 2"]),
        
        ("42 * X^0 = 42 * X^0",
         ["Reduced form: 0 = 0", "Polynomial degree: 0"]),
        
        ("8 * X^0 - 6 * X^1 + 0 * X^2 - 5.6 * X^3 = 3 * X^0",
         ["Reduced form:", "Polynomial degree: 3"]),
        
        ("2 * X^2 - 4 * X + 2 = 0",
         ["Reduced form:", "Polynomial degree: 2"]),
    ]
    
    passed = 0
    failed = 0
    
    for equation, expected in tests:
        if run_test(equation, expected):
            passed += 1
        else:
            failed += 1
    
    print("\n" + "=" * 60)
    print(f"Tests passed: {passed}")
    print(f"Tests failed: {failed}")
    print("=" * 60)
    
    return 0 if failed == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
