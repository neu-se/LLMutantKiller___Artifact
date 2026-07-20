import { Complex } from '../complex.js';

describe('Complex.js', () => {
  it('should throw an error when parsing complex numbers with incorrect scientific notation', () => {
    expect(() => new Complex('1.23e4+5.67e1i')).toThrowError(SyntaxError);
  });
});