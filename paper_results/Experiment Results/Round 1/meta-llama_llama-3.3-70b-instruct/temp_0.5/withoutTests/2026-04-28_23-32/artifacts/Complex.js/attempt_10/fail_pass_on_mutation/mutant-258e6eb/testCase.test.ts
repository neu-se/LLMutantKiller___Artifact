import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct result for atanh', () => {
    const complex = new Complex(1, 0);
    const result = complex.atanh();
    expect(result.im).toBeCloseTo(0);
    expect(result.re).not.toBeCloseTo(-Infinity);
  });
});