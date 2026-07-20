import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should handle atanh correctly for a non-zero, non-negative, and non-one value', () => {
    const complex = new Complex(2, 0);
    const result = complex.atanh();
    expect(result.re).not.toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});