import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct result for atan when b is 1', () => {
    const complex = new Complex(0, 1);
    const result = complex.atan();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(Infinity);
  });
});