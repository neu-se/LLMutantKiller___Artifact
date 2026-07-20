import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct result for atanh function', () => {
    const complex = new Complex(1, 0);
    const result = complex.atanh();
    const complex2 = new Complex(1.000000000000001, 0);
    const result2 = complex2.atanh();
    expect(result2.re).not.toBeCloseTo(result.re);
  });
});