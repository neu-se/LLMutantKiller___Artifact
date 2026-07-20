import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate expm1 for a specific complex number', () => {
    const x = new Complex(0.1, 0.1);
    const result = x.expm1();
    const expectedRe = Math.expm1(0.1) * Math.cos(0.1) + Math.cos(0.1) - 1;
    const expectedIm = Math.exp(0.1) * Math.sin(0.1);
    expect(Math.abs(result.re - expectedRe) < 1e-9).toBe(true);
    expect(Math.abs(result.im - expectedIm) < 1e-9).toBe(true);
  });
});