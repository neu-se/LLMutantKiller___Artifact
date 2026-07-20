import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate cosh', () => {
    const complex = new Complex(2, 0);
    const result = complex.cosh();
    expect(result.re).toBeCloseTo((Math.exp(2) + Math.exp(-2)) / 2);
    expect(result.im).toBe(0);
  });
});