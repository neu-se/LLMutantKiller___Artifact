import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate the complex secant correctly', () => {
    const complex = new Complex(1, 1);
    const result = complex.sec();
    expect(result.re).toBeCloseTo(0.2718281828459045);
    expect(result.im).toBeCloseTo(0.2718281828459045);
  });
});