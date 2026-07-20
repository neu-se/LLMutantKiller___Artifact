import { Complex } from "./complex";

describe('Complex', () => {
  it('should calculate logHypot correctly for boundary values', () => {
    const complex = new Complex(2999, 0);
    const result = complex.log().re;
    const expected = Math.log(2999);
    expect(result).toBeCloseTo(expected, 10);
  });
});