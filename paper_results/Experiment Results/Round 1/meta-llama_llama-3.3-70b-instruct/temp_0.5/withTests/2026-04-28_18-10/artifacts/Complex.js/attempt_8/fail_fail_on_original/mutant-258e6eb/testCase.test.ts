import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should handle atanh for specific input', () => {
    const complex = new Complex(2, 0);
    const result = complex.atanh();
    const expectedRe = 0.5493061443340548;
    const expectedIm = 0;
    expect(result.re).toBeCloseTo(expectedRe);
    expect(result.im).toBeCloseTo(expectedIm);
  });
});