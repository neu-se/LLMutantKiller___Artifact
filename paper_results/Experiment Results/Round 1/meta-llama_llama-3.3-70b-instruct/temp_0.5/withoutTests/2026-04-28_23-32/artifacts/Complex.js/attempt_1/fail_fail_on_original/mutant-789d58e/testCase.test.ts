import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should calculate cos(x) - 1 correctly', () => {
    const complex = new Complex(0.1);
    const result = complex.exp().sub(1);
    const expected = new Complex(Math.exp(0.1) - 1, 0);
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});