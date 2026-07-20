import { Complex } from './complex.js';

describe('Complex', () => {
  it('should correctly calculate the complex asinh and not throw an error when accessing re property', () => {
    const complex = new Complex(1, 2);
    const originalRe = complex.re;
    complex.re = -complex.im;
    complex.im = originalRe;
    expect(() => complex.asinh()).not.toThrowError();
  });
});