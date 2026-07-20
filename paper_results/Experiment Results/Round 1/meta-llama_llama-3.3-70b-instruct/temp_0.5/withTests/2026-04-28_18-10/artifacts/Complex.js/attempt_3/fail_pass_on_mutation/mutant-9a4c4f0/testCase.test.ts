import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate the correct expm1(x) for small x', () => {
    const x = 0.000001;
    const complex = new Complex(x);
    const result = complex.expm1();
    const expected = new Complex(Math.expm1(x), 0);
    expect(Math.abs(result.re - expected.re) < 1e-10).toBe(true);
    expect(Math.abs(result.im - expected.im) < 1e-10).toBe(true);
  });
});