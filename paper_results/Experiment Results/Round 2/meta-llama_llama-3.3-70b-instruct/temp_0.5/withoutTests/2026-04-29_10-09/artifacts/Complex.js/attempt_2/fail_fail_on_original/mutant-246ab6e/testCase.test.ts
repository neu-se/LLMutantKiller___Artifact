import { Complex } from './complex.js';

describe('Complex', () => {
  it('should calculate cosh correctly', () => {
    const complex = new Complex(1, 0);
    const result = complex.cosh();
    expect(result.re).toBeCloseTo(Math.cosh(1));
    expect(result.im).toBeCloseTo(0);

    // Test the mutated code by checking the cosh function with a negative value
    const complexNegative = new Complex(-1, 0);
    const resultNegative = complexNegative.cosh();
    expect(resultNegative.re).toBeCloseTo(Math.cosh(-1));
    expect(resultNegative.im).toBeCloseTo(0);

    // Test the mutated code by checking the cosh function with a small value
    const complexSmall = new Complex(1e-10, 0);
    const resultSmall = complexSmall.cosh();
    expect(resultSmall.re).toBeCloseTo(1);
    expect(resultSmall.im).toBeCloseTo(0);
  });
});