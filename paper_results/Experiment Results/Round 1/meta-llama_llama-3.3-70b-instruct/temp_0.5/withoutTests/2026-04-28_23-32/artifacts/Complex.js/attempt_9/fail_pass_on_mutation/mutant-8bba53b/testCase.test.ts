import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate expm1 correctly for small values', () => {
    const complex = new Complex(1e-9, 1e-9);
    const result = complex.expm1();
    const expected = new Complex(Math.expm1(1e-9) * Math.cos(1e-9) + Math.cos(1e-9) - 1, Math.exp(1e-9) * Math.sin(1e-9));
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});