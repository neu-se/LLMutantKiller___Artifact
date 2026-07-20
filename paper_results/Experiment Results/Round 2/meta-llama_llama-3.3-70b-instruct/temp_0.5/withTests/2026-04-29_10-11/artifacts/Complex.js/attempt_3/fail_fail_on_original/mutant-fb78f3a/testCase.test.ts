import { Complex } from './complex.js';

describe('Complex', () => {
  it('should return the correct result for asec function when a is 0 and b is 0', () => {
    const complex = new Complex(0, 0);
    expect(() => complex.asec()).toThrowError('Cannot find module or its corresponding type declarations is not the error here, instead, the asec function should throw an error when a is 0 and b is 0');
  });
});