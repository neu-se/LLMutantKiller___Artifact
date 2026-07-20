import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should calculate the hypot correctly', () => {
    const a = 3;
    const b = 4;
    const result = Math.sqrt(a * a + b * b);
    const complexNumber = new Complex(a, b);
    const originalResult = complexNumber.abs();
    expect(originalResult).toBeCloseTo(result);

    // Test the mutated hypot function
    const mutatedHypot = function(x, y) {
      if (x >= y) {
        return Math.sqrt(x * x + y * y);
      } else {
        return y * Math.sqrt(1 + (x / y) * (x / y));
      }
    };
    const mutatedResult = mutatedHypot(a, b);
    expect(mutatedResult).not.toBeCloseTo(originalResult);
  });
});