import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct result for the acsc method', () => {
    const complex = new Complex(2, 2);
    const originalResult = complex.acsc();
    const complexMutated = new Complex(2, 2);
    const mutatedResult = complexMutated.acsc();
    expect(mutatedResult.re).not.toBeCloseTo(originalResult.re, 10);
    expect(mutatedResult.im).not.toBeCloseTo(originalResult.im, 10);
  });
});