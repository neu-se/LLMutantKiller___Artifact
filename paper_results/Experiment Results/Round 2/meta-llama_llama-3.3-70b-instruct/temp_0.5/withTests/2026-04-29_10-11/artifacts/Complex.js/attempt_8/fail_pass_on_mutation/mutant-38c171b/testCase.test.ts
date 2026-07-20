import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate acsch for non-zero imaginary part', () => {
    const complex = new Complex(0, 2);
    const result = complex.acsch();
    const complex2 = new Complex(0, 2);
    const result2 = complex2.acsch();
    expect(result.im).toBeCloseTo(result2.im, 10);
  });
});