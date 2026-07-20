import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex atanh method', () => {
  it('should correctly compute atanh for a complex number with real part 0.5 and imaginary part 0', () => {
    const c = new Complex(0.5, 0);
    const result = c.atanh();
    const expectedRe = 0.5493061443340548;
    const expectedIm = 0;
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});