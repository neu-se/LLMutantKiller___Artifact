import { Complex } from './complex.js';

describe('Complex', () => {
  it('should throw an error when calculating atanh with invalid input', () => {
    const complex = new Complex(1, 1);
    expect(() => complex.atanh()).toThrowError();
  });
});