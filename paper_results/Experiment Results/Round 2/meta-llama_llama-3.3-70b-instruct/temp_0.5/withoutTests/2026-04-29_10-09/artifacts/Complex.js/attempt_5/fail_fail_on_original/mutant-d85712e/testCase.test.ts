import { Complex } from '../../../complex.js';

describe('Complex', () => {
  it('should throw an error when parsing a complex number with invalid imaginary part', () => {
    expect(() => new Complex('1+Stryker was here!i')).toThrowError(SyntaxError);
  });
});