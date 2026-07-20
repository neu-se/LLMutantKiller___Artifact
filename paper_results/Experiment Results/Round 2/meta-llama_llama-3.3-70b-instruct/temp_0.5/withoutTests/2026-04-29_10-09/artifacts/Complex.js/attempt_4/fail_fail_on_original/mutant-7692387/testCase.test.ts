import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate asinh correctly and not change the original object', () => {
    const complex = new Complex(1, 2);
    const originalIm = complex.im;
    const result = complex.asinh();
    expect(complex.im).toBe(originalIm);
  });
});