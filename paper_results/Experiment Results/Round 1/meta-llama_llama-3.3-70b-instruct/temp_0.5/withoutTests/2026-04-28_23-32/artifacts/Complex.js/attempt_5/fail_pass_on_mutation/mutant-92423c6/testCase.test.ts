import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct value for logHypot function with large numbers', () => {
    const complex = new Complex(1000000000, 1000000000);
    const result = complex.log();
    const expected = new Complex(Math.log(Math.sqrt(2000000000000000000)), Math.PI / 4);
    expect(result.re).toBeCloseTo(expected.re, 6);
    expect(result.im).toBeCloseTo(expected.im, 6);
  });
});