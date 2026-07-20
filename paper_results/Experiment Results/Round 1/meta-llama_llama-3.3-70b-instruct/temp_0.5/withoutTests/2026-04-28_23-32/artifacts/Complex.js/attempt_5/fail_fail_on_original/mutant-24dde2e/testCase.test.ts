import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate the complex arcus secant correctly', () => {
    const complex = new Complex(1, 1);
    const originalResult = new Complex(1, 1).asec();
    const result = complex.asec();
    expect(result.re).not.toBeCloseTo(originalResult.re, 10);
    expect(result.im).not.toBeCloseTo(originalResult.im, 10);
  });
});