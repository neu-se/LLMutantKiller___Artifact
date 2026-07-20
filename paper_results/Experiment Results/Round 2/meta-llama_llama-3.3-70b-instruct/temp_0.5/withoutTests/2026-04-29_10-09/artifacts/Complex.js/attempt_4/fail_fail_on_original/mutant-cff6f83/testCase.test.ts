import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex acsch for a specific input', () => {
    const complex = new Complex(2, 3);
    const result = complex.acsch();
    const originalResult = complex.clone();
    originalResult.re = 0.6636123605477749;
    originalResult.im = -2.437587736496052;
    expect(result.re).toBeCloseTo(originalResult.re, 10);
    expect(result.im).toBeCloseTo(originalResult.im, 10);
  });
});