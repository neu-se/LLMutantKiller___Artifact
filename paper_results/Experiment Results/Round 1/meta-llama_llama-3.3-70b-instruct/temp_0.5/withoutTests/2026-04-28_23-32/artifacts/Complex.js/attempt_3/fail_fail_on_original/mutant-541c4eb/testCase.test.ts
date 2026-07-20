import { Complex } from './complex.js';

describe('Complex', () => {
  it('should throw an error when trying to access an undefined property in asinh', () => {
    const complex = new Complex(1, 2);
    const originalRe = complex.re;
    const originalIm = complex.im;
    complex.re = -complex.im;
    complex.im = originalRe;
    expect(() => complex.asinh()).toThrowError();
  });
});