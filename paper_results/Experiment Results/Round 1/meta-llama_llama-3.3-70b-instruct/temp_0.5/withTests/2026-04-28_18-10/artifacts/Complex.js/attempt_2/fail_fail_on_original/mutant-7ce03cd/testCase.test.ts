import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should return NaN when multiplying infinity by zero', () => {
    const complex = new Complex(Infinity, 0);
    const zero = new Complex(0, 0);
    const result = complex.mul(zero, 0);
    expect(result.re).toBeNaN();
    expect(result.im).toBeNaN();
  });
});