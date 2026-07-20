import { Complex } from './complex';

describe('Complex', () => {
  it('should throw an error when parsing a complex number with mutated code', () => {
    expect(() => new Complex('1+2i')).toThrowError(SyntaxError);
  });
});