import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate acoth', () => {
    const complex = new Complex(1, 2);
    const result = complex.acoth();
    const expectedRe = result.re;
    const expectedIm = -1 * (2 / (1 * 1 + 2 * 2));
    expect(result.re).toBeCloseTo(expectedRe);
    expect(result.im).toBeCloseTo(expectedIm);
  });
});