import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate the complex acsch correctly', () => {
    const complex = new Complex(2, 1);
    const originalResult = new Complex(-0.48121182505960347, -0.8964765786616346);
    const result = complex.acsch();
    expect(result.re).toBeCloseTo(originalResult.re, 5);
    expect(result.im).toBeCloseTo(originalResult.im, 5);
  });
});