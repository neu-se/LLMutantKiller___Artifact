import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should throw an error when acsch is called on a complex number', () => {
    const complex = new Complex(1, 0);
    expect(() => complex.acsch()).toThrowError();
  });
});