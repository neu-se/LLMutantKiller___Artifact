import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate logHypot correctly', () => {
    const complex = new Complex(10000, 10000);
    const result = complex.log();
    const expected = new Complex(Math.log(Math.sqrt(10000 * 10000 + 10000 * 10000)), Math.atan2(10000, 10000));
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});