import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should throw an error when parsing invalid input', () => {
    expect(() => new Complex('a')).toThrowError(SyntaxError);
  });
});