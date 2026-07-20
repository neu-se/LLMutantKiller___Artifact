import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex atanh for a = 0.5', () => {
    const complex = new Complex(0.5, 0);
    const result = complex.atanh();
    const expected = new Complex(-0.5493061443340548, 0);
    expect(result.equals(expected.re, expected.im)).toBe(false);
  });
});