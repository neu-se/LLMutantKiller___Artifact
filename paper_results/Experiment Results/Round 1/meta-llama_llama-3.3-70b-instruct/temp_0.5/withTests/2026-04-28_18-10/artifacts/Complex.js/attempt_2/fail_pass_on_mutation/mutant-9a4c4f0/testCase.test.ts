import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate the correct cos(x) - 1 using Taylor series', () => {
    const x = 0.01;
    const complex = new Complex(x);
    const result = complex.cos().sub(1);
    const expected = new Complex(Math.cos(x) - 1, 0);
    expect(Math.abs(result.re - expected.re) < 1e-10).toBe(true);
    expect(Math.abs(result.im - expected.im) < 1e-10).toBe(true);
  });
});