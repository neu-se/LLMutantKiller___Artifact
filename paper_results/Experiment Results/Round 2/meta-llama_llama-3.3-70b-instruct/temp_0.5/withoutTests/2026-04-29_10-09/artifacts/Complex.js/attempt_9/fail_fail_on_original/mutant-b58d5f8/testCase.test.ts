import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should throw an error when parsing null input', () => {
    expect(() => {
      const complex = new Complex(null);
      if (complex.re !== 0 || complex.im !== 0) {
        throw new Error('Expected complex number to be 0 0i');
      }
    }).toThrowError();
  });
});