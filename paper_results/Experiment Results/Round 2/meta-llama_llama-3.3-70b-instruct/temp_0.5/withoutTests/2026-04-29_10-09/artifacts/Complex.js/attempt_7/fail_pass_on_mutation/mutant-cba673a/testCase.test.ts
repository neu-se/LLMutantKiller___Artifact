import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate cosh', () => {
    const complex = new Complex(1, 0);
    const result = complex.cosh();
    expect(result.re).toBeGreaterThan(1);
    expect(result.im).toBe(0);
  });
});