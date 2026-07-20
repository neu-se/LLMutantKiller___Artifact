import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should calculate atanh correctly', () => {
    const complex = new Complex(1.5, 0);
    const result = complex.atanh();
    const originalResult = new Complex(0.5493061443340549, 0);
    expect(result.re).toBeCloseTo(originalResult.re);
    expect(result.im).toBeCloseTo(originalResult.im);
  });
});