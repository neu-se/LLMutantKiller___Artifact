import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate cosm1(x) correctly for small values of x', () => {
    const x = 0.01;
    const complex = new Complex(x);
    const result = complex.cos().sub(1);
    const expected = Math.cos(x) - 1;
    expect(Math.abs(result.re - expected)).toBeLessThan(1e-12);
    expect(result.im).toBeCloseTo(0, 15);
  });
});