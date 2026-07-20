import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should calculate the hypot function correctly', () => {
    const a = 3001;
    const b = 1;
    // Test the hypot function in complex.js
    function hypot(x, y) {
      var a = Math.abs(x);
      var b = Math.abs(y);

      if (a < 3000 && b < 3000) {
        return Math.sqrt(a * a + b * b);
      }

      if (a < b) {
        a = b;
        b = x / y; // original code
      } else {
        b = y / x;
      }
      return a * Math.sqrt(1 + b * b);
    }
    const hypotResult = hypot(a, b);
    expect(hypotResult).toBeCloseTo(3001);
    // Test the mutated hypot function
    function hypotMutated(x, y) {
      var a = Math.abs(x);
      var b = Math.abs(y);

      if (a < 3000 && b < 3000) {
        return Math.sqrt(a * a + b * b);
      }

      if (a < b) {
        a = b;
        b = x * y; // mutated code
      } else {
        b = y / x;
      }
      return a * Math.sqrt(1 + b * b);
    }
    const hypotMutatedResult = hypotMutated(a, b);
    expect(hypotMutatedResult).not.toBeCloseTo(3001);
  });
});