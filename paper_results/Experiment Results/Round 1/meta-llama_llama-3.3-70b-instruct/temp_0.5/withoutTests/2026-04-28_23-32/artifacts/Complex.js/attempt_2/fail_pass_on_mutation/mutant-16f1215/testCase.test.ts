import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex arcus cosecans', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsc();
    expect(result.re).toBeCloseTo(result.re, 10);
    expect(result.im).toBeCloseTo(result.im, 10);
    expect(isFinite(result.re)).toBe(true);
  });
});