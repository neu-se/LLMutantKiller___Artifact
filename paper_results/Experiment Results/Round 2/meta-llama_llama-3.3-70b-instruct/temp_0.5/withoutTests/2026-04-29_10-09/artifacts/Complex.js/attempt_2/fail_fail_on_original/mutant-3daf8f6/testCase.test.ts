import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should calculate logHypot correctly for large values', () => {
    const a = 3000;
    const b = 3000;
    const resultOriginal = Math.log(a * a + b * b) * 0.5;
    const complex = new Complex(a, b);
    const result = complex.log().re;
    expect(result).toBeCloseTo(resultOriginal, 10);
  });
});