import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex arcus secant for asec', () => {
    const complex = new Complex(1, 0);
    const result = complex.asec();
    const expected = new Complex(0, Math.PI / 2);
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});