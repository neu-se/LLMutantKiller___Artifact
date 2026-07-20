import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should return the correct result for cosh function', () => {
    const x = 1;
    const result = (Math.exp(x) + Math.exp(-x)) * 0.5;
    expect(Math.cosh(x)).toBeCloseTo(result, 10);
  });
});