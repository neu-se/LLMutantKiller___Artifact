import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should throw an error when sech is called with invalid this.re', () => {
    const complex = new Complex(1, 0);
    const originalRe = complex.re;
    complex.re = undefined;
    expect(() => complex.sech()).toThrowError();
    complex.re = originalRe;
  });
});