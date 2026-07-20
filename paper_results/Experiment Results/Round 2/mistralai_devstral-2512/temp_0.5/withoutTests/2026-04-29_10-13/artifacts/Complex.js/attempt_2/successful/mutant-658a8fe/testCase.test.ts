import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acsch function edge case', () => {
  it('should handle non-zero imaginary component correctly', () => {
    const c = new Complex(0, 1);
    const result = c.acsch();
    expect(result.isNaN()).toBe(false);
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(-1.5708, 4);
  });
});