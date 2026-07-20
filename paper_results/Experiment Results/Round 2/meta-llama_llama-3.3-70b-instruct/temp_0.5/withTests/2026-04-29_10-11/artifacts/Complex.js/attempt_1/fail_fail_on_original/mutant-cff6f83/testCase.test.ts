import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct result for acsch', () => {
    const complex = new Complex(2, 3);
    const result = complex.acsch();
    expect(result.re).not.toBeCloseTo(2 * (complex.re * complex.re + complex.im * complex.im) / (complex.re * complex.re + complex.im * complex.im));
  });
});