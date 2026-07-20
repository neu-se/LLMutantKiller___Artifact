import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should throw an error when calculating asinh', () => {
    const complex = new Complex(1, 2);
    expect(() => complex.asinh()).toThrowError();
  });
});