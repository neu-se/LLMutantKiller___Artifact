import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should return the correct acot value for a complex number', () => {
    const complex = new Complex(1, 1);
    const acot = complex.acot();
    const expected = new Complex(Math.atan2(1, 2), 0);
    expect(acot.re).toBeCloseTo(expected.re, 10);
    expect(acot.im).toBeCloseTo(expected.im, 10);
  });
});