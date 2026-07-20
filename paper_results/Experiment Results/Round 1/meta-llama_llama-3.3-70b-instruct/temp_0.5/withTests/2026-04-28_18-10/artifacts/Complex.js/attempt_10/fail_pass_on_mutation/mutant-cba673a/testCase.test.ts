import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate cosh correctly', () => {
    const complex = new Complex(2, 0);
    const result = complex.cosh();
    expect(result).not.toBeUndefined();
    expect(result.re).toBeCloseTo((Math.exp(2) + Math.exp(-2)) / 2);
    expect(result.im).toBeCloseTo(0);
    expect(complex.cosh.toString()).not.toBe('function () {}');
    expect(complex.cosh.toString()).toContain('cosh');
  });
});