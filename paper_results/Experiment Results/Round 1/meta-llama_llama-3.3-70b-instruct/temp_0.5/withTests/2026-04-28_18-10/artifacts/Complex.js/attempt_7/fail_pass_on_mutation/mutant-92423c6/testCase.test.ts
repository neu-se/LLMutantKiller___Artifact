import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct value for the logHypot function with large numbers', () => {
    const a = 1e10;
    const b = 1e-10;
    const complex = new Complex(a, b);
    const result = complex.log().re;
    const expected = Math.log(a * a + b * b) / 2;
    expect(result).toBeCloseTo(expected, 5);
  });
});