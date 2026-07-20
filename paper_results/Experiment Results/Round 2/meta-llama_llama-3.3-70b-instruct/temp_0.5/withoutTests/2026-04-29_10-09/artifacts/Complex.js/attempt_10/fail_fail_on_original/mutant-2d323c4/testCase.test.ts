import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex acsch for a non-zero complex number', () => {
    const complex = new Complex(1, 2);
    const result = complex.acsch();
    const expected = new Complex(0.481213824758897, -0.398465063440241);
    expect(result.re).toBeCloseTo(expected.re, 5);
    expect(result.im).toBeCloseTo(expected.im, 5);
  });
});