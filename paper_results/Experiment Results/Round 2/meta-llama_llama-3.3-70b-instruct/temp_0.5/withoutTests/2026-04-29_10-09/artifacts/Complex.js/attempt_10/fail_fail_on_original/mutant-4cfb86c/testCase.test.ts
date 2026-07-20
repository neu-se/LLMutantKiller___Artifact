import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should return the correct acot value for a complex number when a is not zero', () => {
    const complex = new Complex(1, 1);
    const acot = complex.acot();
    expect(acot.re).toBeCloseTo(Math.atan2(1, 2), 10);
    expect(acot.im).toBeCloseTo(0, 10);
  });
});