import { Complex } from '../../../complex.js';

describe('Complex', () => {
  it('should correctly parse a complex number from a string and throw an error for invalid input', () => {
    expect(() => new Complex('a')).toThrow(SyntaxError);
  });
});