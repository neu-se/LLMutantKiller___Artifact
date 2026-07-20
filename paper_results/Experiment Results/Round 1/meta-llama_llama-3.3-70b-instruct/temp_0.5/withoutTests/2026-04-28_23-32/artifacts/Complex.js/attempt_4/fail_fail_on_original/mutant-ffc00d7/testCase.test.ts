import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should throw an error when parsing a complex number string with an "i" or "I" without a preceding number', () => {
    expect(() => new Complex('i')).toThrowError(SyntaxError);
    expect(() => new Complex('I')).toThrowError(SyntaxError);
  });
});