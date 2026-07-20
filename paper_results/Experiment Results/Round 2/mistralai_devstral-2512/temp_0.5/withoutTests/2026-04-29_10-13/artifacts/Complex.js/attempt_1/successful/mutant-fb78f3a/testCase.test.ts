// Test case to detect the mutation in the asec method
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asec method', () => {
  it('should return Infinity for asec(0, 0)', () => {
    const result = new Complex(0, 0).asec();
    expect(result.isInfinite()).toBe(true);
  });
});