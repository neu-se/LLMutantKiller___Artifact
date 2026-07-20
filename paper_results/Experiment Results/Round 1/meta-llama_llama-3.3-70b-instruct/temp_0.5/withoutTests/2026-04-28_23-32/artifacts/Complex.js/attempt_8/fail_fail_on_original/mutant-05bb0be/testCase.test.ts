import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex atanh for a = 2', () => {
    const complex = new Complex(2, 0);
    const result = complex.atanh();
    const expected = new Complex(-0.5493061443340548, 0);
    expect(result.equals(expected.re, expected.im)).toBe(false);
  });
});