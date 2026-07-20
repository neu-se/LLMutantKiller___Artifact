import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should handle asech correctly', () => {
    const complex = new Complex(0.5, 0);
    const result = complex.asech();
    expect(result.re).not.toBe(0);
    expect(result.im).toBeCloseTo(0);
    expect(result.re).toBeFinite();
  });
});