import { Complex } from './complex';

describe('Complex', () => {
  it('should not throw an error when calculating the complex asinh with original code', () => {
    const complex = new Complex(1, 2);
    complex.re = -complex.im;
    expect(() => complex.asinh()).not.toThrowError();
  });
});