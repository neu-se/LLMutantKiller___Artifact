import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should not change the original object properties after asinh', () => {
    const c = new Complex(1, 2);
    const originalRe = c.re;
    const originalIm = c.im;
    c.asinh();
    expect(c.re).toBe(originalRe);
    expect(c.im).toBe(originalIm);
  });
});