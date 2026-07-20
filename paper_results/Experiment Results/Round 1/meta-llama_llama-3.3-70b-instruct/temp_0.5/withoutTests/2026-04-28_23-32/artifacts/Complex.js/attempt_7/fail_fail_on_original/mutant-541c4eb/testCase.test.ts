import { Complex } from './complex.js';

describe('Complex', () => {
  it('should throw an error when calculating the complex asinh with mutated code', () => {
    const complex = new Complex(1, 2);
    complex.re = -complex[""];
    expect(() => complex.asinh()).toThrowError();
  });
});