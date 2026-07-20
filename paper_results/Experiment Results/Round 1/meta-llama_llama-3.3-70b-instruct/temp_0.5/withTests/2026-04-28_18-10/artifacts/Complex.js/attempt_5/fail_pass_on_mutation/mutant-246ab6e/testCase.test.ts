import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate cosh correctly for a specific negative complex input', () => {
    const complex = new Complex(-1, 1);
    const result = complex.cosh();
    const expectedRe = Math.cosh(-1) * Math.cos(1);
    const expectedIm = Math.sinh(-1) * Math.sin(1);
    expect(result.re).toBeCloseTo(expectedRe);
    expect(result.im).toBeCloseTo(expectedIm);
  });
});