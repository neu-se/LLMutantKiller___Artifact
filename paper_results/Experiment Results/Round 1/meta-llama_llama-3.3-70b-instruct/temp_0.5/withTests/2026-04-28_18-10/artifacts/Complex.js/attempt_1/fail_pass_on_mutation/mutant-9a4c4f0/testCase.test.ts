import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate the correct cos(x) - 1 using Taylor series', () => {
    const complex = new Complex(0.1);
    const result = complex.cos().sub(1);
    const expected = new Complex(Math.cos(0.1) - 1, 0);
    expect(result.equals(expected.re, expected.im)).toBe(true);
  });
});