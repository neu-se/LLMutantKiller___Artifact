import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should calculate logHypot correctly for values around 3000', () => {
    const complex = new Complex(3000, 0);
    const result = complex.log().re;
    const expected = Math.log(Math.sqrt(3000 * 3000));
    expect(result).toBeCloseTo(expected, 10);
  });
});