import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return Infinity for acsch when denominator is zero in the original code', () => {
    const complex = new Complex(0, 0);
    const result = complex.acsch();
    expect(result.re).toBe(Infinity);
    expect(result.im).toBe(0);
  });
});