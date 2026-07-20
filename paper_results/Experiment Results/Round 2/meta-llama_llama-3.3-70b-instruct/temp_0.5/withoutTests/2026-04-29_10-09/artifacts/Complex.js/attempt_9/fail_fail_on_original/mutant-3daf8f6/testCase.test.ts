import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate logHypot correctly for boundary values', () => {
    const complex = new Complex(3000, 0);
    const result = complex.log().re;
    const expected = Math.log(3000);
    expect(result).toBeCloseTo(expected, 10);
  });
});