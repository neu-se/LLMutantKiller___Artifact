import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should return a valid result for acot when d is not zero', () => {
    const complex = new Complex(1, 2);
    const result = complex.acot();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    expect(result.re).not.toBe(Infinity);
    expect(result.im).not.toBe(Infinity);
    const complex2 = new Complex(1, 1);
    const result2 = complex2.acot();
    expect(result2.re).not.toBeNaN();
    expect(result2.im).not.toBeNaN();
    expect(result2.re).not.toBe(Infinity);
    expect(result2.im).not.toBe(Infinity);
  });
});