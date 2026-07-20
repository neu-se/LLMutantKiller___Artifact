import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should handle asech correctly', () => {
    const complex = new Complex(0.5, 0);
    const result = complex.asech();
    expect(result.re).not.toBeNaN();
    expect(result.im).toBeCloseTo(0);
    const originalValue = (a !== 0) ? a / 0 : 0;
    expect(result.re).not.toBe(originalValue);
  });
});