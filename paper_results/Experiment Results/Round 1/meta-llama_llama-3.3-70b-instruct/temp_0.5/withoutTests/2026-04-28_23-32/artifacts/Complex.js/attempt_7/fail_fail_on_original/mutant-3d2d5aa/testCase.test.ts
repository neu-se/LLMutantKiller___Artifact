import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate acoth for complex numbers', () => {
    const complex = new Complex(1, 1);
    const result = complex.acoth();
    expect(result.re).toBeCloseTo(complex.re / (complex.re * complex.re + complex.im * complex.im));
  });
});