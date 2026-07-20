import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate acsch for non-zero imaginary part', () => {
    const complex = new Complex(0, 2);
    const result = complex.acsch();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(-Math.asinh(1/2), 10);
    const complex2 = new Complex(0, 2);
    const result2 = complex2.acsch();
    expect(result2).not.toEqual(Complex.ZERO);
  });
});