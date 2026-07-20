import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should handle atanh correctly for a non-zero and non-one value where a is not equal to -1', () => {
    const complex = new Complex(0.2, 0);
    const result = complex.atanh();
    expect(result.re).not.toBeNaN();
    expect(result.im).toBeCloseTo(0, 10);
    expect(result.re).not.toBeCloseTo(0, 10);
  });
});