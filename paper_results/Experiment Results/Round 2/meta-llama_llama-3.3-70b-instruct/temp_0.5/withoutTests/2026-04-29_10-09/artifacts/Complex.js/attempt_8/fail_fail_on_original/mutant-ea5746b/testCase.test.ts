import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate cos(x) - 1 correctly for small x', () => {
    const x = 0.01;
    const complex = new Complex(x);
    const result = complex.expm1();
    const expected = Math.exp(x) - 1;
    expect(Math.abs(result.re - expected)).toBeLessThan(1e-10);
    expect(Math.abs(result.im)).toBeLessThan(1e-10);
    expect(result.re).toBeCloseTo(expected, 10);
  });
});