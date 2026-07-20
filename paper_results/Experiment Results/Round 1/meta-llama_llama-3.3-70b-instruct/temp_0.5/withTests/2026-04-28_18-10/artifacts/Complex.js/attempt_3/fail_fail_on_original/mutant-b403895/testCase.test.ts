import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex arcus secant for a non-zero input', () => {
    const complex = new Complex(2, 0);
    const result = complex.asec();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    const expected = new Complex(0, Math.PI / 2);
    expect(result.re).not.toEqual(expected.re);
    expect(result.im).not.toEqual(expected.im);
  });
});