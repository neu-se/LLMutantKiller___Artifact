import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should return the correct value for acot when a is zero and b is zero', () => {
    const complex = new Complex(0, 0);
    const result = complex.acot();
    expect(result.re).toBeCloseTo(Math.atan2(1, 0), 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});