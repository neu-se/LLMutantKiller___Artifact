import { Complex } from './complex.js';

describe('Complex', () => {
  it('should not throw an error when calculating asinh with original code', () => {
    const complex = new Complex(1, 2);
    expect(() => complex.asinh()).not.toThrowError();
  });
});