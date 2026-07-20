import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate acot correctly', () => {
    const complex = new Complex(1, 0);
    const result = complex.acot();
    const expected = new Complex(Math.atan2(1, 1), 0);
    expect(result.re).toBeCloseTo(expected.re, 4);
    expect(result.im).toBeCloseTo(expected.im, 4);
  });
});