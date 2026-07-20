import { Complex } from './complex';

describe('Complex', () => {
  it('should throw an error when parsing an invalid string', () => {
    expect(() => new Complex('')).toThrowError(SyntaxError);
  });
});