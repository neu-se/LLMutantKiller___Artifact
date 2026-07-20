import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate cosh', () => {
    const complex = new Complex(1000, 0);
    const result = complex.cosh();
    expect(result.re).toBeGreaterThan(0);
    expect(result.im).toBe(0);
    expect(() => {
      const complex2 = new Complex(1000, 0);
      complex2.cosh();
    }).not.toThrow();
  });
});