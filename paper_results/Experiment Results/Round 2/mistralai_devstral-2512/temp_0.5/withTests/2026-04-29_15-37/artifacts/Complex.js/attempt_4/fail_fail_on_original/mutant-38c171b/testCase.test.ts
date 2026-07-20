import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.acsch()', () => {
  it('should correctly handle non-zero imaginary part with zero real part', () => {
    const c = new Complex(0, 2);
    const result = c.acsch();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(-Math.PI / 2, 10);
  });
});