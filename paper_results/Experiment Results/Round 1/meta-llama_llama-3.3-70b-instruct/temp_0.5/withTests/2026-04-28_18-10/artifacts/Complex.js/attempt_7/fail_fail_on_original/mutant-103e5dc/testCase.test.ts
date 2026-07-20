import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the cosecans of a complex number', () => {
    const complex = new Complex(1, 1);
    const result = complex.csc();
    const sinResult = complex.sin();
    const expectedRe = sinResult.re / (sinResult.re * sinResult.re + sinResult.im * sinResult.im);
    const expectedIm = -sinResult.im / (sinResult.re * sinResult.re + sinResult.im * sinResult.im);
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});