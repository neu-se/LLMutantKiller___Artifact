import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate logHypot correctly for values around 3000', () => {
    const a = 3000;
    const b = 0;
    const complex = new Complex(a, b);
    const result = complex.log().re;
    const expected = Math.log(Math.sqrt(a * a + b * b));
    expect(result).toBeCloseTo(expected, 10);
  });
});