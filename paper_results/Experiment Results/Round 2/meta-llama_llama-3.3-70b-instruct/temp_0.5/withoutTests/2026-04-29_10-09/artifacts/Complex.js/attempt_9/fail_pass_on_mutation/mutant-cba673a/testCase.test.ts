import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate cosh', () => {
    const complex = new Complex(0, 0);
    const result = complex.cosh();
    expect(result.re).toBeCloseTo(1);
    expect(result.im).toBe(0);
  });
});