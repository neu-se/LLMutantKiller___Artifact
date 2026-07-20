import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should calculate expm1 correctly for small values', () => {
    const x = 0.00001;
    const complex = new Complex(x);
    const result = Math.expm1(x);
    const complexResult = complex.expm1().re;
    expect(complexResult).toBeCloseTo(result, 10);
  });
});