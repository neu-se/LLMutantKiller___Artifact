import { Complex } from '../../complex.js';

describe('Complex', () => {
  it('should throw an error when calculating acsch with undefined imaginary part', () => {
    const complex = new Complex(1);
    expect(() => complex.acsch()).toThrowError();
  });
});