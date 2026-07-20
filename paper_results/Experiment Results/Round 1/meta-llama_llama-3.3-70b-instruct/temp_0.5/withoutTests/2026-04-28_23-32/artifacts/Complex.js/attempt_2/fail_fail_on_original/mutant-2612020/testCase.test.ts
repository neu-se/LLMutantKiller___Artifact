import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should throw an error when trying to parse a complex number with an empty string', () => {
    expect(() => new Complex('')).toThrowError(SyntaxError);
  });
});