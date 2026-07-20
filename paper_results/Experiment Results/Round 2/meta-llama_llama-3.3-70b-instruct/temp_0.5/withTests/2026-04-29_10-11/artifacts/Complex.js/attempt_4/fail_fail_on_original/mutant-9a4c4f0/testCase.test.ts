import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate expm1 correctly for small values', () => {
    const c = new Complex(0.000001);
    const result = c.expm1();
    const expected = c.exp().sub(1);
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});