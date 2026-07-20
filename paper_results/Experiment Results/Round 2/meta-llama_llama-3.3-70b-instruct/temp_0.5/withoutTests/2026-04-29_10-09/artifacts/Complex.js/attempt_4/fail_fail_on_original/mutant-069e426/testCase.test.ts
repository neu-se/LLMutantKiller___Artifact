import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should handle asec correctly for non-zero values', () => {
    const complex = new Complex(1, 0);
    const result = complex.asec();
    const expected = new Complex(Math.PI / 2, 0);
    expect(result.re).toBeCloseTo(expected.re);
    expect(result.im).toBeCloseTo(expected.im);
  });
});