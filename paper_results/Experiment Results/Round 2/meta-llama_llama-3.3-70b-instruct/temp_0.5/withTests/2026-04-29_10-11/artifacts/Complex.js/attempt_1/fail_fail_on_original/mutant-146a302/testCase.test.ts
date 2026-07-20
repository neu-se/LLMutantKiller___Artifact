import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate the complex secant correctly', () => {
    const complex = new Complex(1, 1);
    const result = complex.sec();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    // Check if the result is close to the expected value
    const expected = new Complex(0.2717525853198426, 0.2717525853198426);
    expect(Math.abs(result.re - expected.re)).toBeLessThan(1e-6);
    expect(Math.abs(result.im - expected.im)).toBeLessThan(1e-6);
  });
});