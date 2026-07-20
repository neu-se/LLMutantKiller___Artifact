import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should handle asec correctly for zero values', () => {
    const complex = new Complex(0, 1);
    const result = complex.asec();
    expect(isFinite(result.re)).toBe(true);
  });
});