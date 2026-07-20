import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate cos(x) - 1 using Taylor series correctly for small values', () => {
    const x = 0.00001;
    const complex = new Complex(x);
    const result = complex.cos().sub(1);
    const expected = new Complex(Math.cos(x) - 1, 0);
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});