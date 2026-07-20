import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate acoth', () => {
    const complex = new Complex(2, 3);
    const result = complex.acoth();
    const expected = new Complex(0.267949192, -0.0465739);
    expect(result.equals(expected.re, expected.im)).toBe(true);
  });
});