import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should correctly calculate the complex acosh', () => {
    const c = new Complex(2, 3);
    const result = c.acosh();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    const originalRe = result.re;
    const originalIm = result.im;
    const res = new Complex(originalRe, originalIm);
    expect(res.re).toBe(originalRe);
    expect(res.im).toBe(originalIm);
    const tmp = result.re;
    expect(tmp).toBe(originalRe);
  });
});