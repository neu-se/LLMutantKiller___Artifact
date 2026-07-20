import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should calculate atanh correctly', () => {
    const complex = new Complex(2, 1);
    const result = complex.atanh();
    expect(result.re).toBeCloseTo(-0.5493061443340549);
    expect(result.im).toBeCloseTo(-0.7853981633974483);
  });
});