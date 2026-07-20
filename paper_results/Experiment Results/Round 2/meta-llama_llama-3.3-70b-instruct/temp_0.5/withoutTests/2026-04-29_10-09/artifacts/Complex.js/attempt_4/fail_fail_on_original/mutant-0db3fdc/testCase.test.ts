import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should calculate expm1 correctly', () => {
    const x = 0.1;
    const complex = new Complex(x);
    const result = Math.exp(x) - 1;
    const complexResult = complex.expm1().re;
    expect(complexResult).toBeCloseTo(result, 10);
  });
});