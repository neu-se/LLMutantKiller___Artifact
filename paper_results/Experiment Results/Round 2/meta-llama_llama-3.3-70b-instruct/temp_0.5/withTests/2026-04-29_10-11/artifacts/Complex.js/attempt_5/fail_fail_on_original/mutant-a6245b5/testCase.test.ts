import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should throw an error when b is zero in atanh calculation', () => {
    const complex = new Complex(0, 0);
    expect(() => complex.atanh()).toThrowError();
  });
});