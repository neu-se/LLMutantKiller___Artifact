import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should handle atanh correctly', () => {
    const complex = new Complex(0.5, 0);
    const result = complex.atanh();
    expect(result.re).toBeCloseTo(0.5493061443340548);
    expect(result.im).toBeCloseTo(0);
  });
});