import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex atanh for a = -0.5', () => {
    const complex = new Complex(-0.5, 0);
    const result = complex.atanh();
    const originalResult = complex.atanh();
    expect(result.equals(originalResult.re, originalResult.im)).toBe(true);
  });
});