import { Complex } from "../complex.js";

describe('Complex.js', () => {
  it('should calculate atanh correctly', () => {
    const complex = new Complex(2, 0);
    const result = complex.atanh();
    const expected = new Complex(0.5493061443340549, 0);
    expect(result.re).toBeCloseTo(expected.re, 5);
    expect(result.im).toBeCloseTo(expected.im, 5);
  });
});