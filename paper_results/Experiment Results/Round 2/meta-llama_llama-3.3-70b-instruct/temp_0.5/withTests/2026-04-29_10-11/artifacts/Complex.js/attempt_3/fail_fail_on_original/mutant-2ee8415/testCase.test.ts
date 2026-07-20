import { Complex } from './complex.js';

describe('Complex', () => {
  it('should throw an error when calculating asinh with mutated code', () => {
    const complex = new Complex(1, 2);
    expect(() => complex.asinh()).toThrowError();
  });
});