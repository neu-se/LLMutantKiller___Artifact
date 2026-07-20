import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate the complex asinh and not change the original object', () => {
    const c = new Complex(1, 2);
    const originalRe = c.re;
    const originalIm = c.im;
    const result = c.asinh();
    expect(c.re).toBe(originalRe);
    expect(c.im).toBe(originalIm);
  });
});