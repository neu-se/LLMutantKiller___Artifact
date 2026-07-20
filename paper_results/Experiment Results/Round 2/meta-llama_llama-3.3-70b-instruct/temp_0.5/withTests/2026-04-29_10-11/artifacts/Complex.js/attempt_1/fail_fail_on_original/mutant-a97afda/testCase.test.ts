import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should handle the case when b is 1 in the atan function', () => {
    const complex = new Complex(0, 1);
    const result = complex.atan();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(Infinity, 10);
  });
});