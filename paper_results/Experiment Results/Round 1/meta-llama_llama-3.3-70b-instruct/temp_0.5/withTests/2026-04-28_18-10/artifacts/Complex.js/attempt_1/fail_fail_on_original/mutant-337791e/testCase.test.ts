import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate the complex exponent correctly', () => {
    const complex = new Complex(1, 0);
    const result = complex.exp();
    expect(result.re).toBeCloseTo(Math.E, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});