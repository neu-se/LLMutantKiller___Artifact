import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate atanh for complex numbers', () => {
    const complex = new Complex(1, 1);
    const result = complex.atanh();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    const originalCodeResult = new Complex(0.5493061443340548, -0.5493061443340548);
    expect(Math.abs(result.re - originalCodeResult.re) <= Complex.EPSILON).toBe(true);
    expect(Math.abs(result.im - originalCodeResult.im) <= Complex.EPSILON).toBe(true);
  });
});