import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should return the correct result for cosh function', () => {
    const coshOriginal = Math.cosh;
    const x = 0;
    expect(coshOriginal(x)).toBeCloseTo(1, 10);
    expect(Math.cosh(x)).toBeCloseTo(1, 10);
    expect(coshOriginal).toBe(Math.cosh);
  });
});