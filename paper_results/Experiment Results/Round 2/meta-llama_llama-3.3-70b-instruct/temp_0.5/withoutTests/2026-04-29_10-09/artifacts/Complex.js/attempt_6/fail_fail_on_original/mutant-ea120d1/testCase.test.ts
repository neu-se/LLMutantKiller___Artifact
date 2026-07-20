import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate logHypot correctly', () => {
    const complex = new Complex(2999, 3000);
    const result = complex.log();
    const expected = Math.log(Math.sqrt(2999 * 2999 + 3000 * 3000)) / 2;
    expect(result.re).toBeCloseTo(expected, 10);
    const complex2 = new Complex(3001, 3000);
    const result2 = complex2.log();
    expect(result.re).not.toBeCloseTo(result2.re, 10);
  });
});