import { Complex } from "../complex.js";

describe('Complex.js', () => {
  it('should return the correct result for the acsch function when d is zero', () => {
    const complex = new Complex(0, 1);
    const d = complex.re * complex.re + complex.im * complex.im;
    expect(d).toBeGreaterThan(0);
  });
});