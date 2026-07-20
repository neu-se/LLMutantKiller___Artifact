import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly handle multiplication of two complex numbers', () => {
    const c1 = new Complex(1, 2);
    const c2 = new Complex(3, 0);
    const result = c1.mul(c2);
    expect(result.re).toBeCloseTo(3);
    expect(result.im).toBeCloseTo(6);
  });
});