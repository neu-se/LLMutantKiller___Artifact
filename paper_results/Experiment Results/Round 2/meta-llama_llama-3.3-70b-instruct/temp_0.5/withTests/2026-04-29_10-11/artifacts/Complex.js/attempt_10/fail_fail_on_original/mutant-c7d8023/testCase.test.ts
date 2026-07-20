import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return correct result for acsch when b is zero and a is not zero, and check the condition in the mutated code', () => {
    const complex = new Complex(1, 0);
    const result = complex.acsch();
    expect(complex.im === 0).toBe(true);
    expect(result.im).not.toBeCloseTo(0, 10);
  });
});