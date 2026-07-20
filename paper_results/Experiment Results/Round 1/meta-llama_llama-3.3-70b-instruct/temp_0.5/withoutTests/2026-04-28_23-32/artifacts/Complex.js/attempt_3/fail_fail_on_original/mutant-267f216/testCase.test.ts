import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct result for acsch', () => {
    const complex = new Complex(2, 2);
    const result = complex.acsch();
    const originalResult = new Complex(0.48121182505960347, -0.8964764813821068);
    expect(result.re).toBeCloseTo(originalResult.re, 5);
    expect(result.im).toBeCloseTo(originalResult.im, 5);
  });
});