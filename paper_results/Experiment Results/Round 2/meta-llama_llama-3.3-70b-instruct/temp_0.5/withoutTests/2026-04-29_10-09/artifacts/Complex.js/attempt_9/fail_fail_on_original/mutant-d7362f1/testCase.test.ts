import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly handle multiplication of two complex numbers', () => {
    const c1 = new Complex(1, 2);
    const c2 = new Complex(3, 0);
    const result = c1.mul(c2);
    expect(result.re).toBe(3);
    expect(result.im).toBe(6);
    const c3 = new Complex(1, 0);
    const c4 = new Complex(0, 0);
    const result2 = c3.mul(c4);
    expect(result2.re).toBe(0);
    expect(result2.im).toBe(0);
  });
});