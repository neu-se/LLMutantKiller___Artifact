import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should handle atanh correctly for a = -1', () => {
    const complex = new Complex(-1, 0);
    const result = complex.atanh();
    expect(result.re).toBeCloseTo(-Infinity, 10);
    const mutatedComplex = new Complex(-1, 0);
    const mutatedResult = mutatedComplex.atanh();
    expect(mutatedResult.re).not.toBeCloseTo(result.re, 10);
  });
});