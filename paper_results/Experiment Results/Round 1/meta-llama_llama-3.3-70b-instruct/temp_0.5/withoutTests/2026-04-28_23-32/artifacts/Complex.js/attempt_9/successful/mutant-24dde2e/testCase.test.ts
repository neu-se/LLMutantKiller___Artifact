import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate the complex arcus secant correctly', () => {
    const complex = new Complex(1.5, 1.5);
    const originalResult = new Complex(1.5, 1.5).asec();
    const result = complex.asec();
    expect(result.re).toBeCloseTo(originalResult.re, 10);
    expect(result.im).toBeCloseTo(originalResult.im, 10);
  });
});