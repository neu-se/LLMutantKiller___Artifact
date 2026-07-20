import { Complex } from './complex.js';

describe('Complex', () => {
  it('should throw an error when calculating cosecans with incorrect property access', () => {
    const complex = new Complex(1, 1);
    const originalIm = complex.im;
    complex[''] = 1;
    expect(() => complex.csc()).toThrowError();
    complex.im = originalIm;
  });
});