import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate complex exponent correctly', () => {
    const complex = new Complex(1, 1);
    const result = complex.exp();
    expect(result.re).toBeCloseTo(Math.exp(1) * Math.cos(1), 10);
    expect(result.im).toBeCloseTo(Math.exp(1) * Math.sin(1), 10);
  });
});