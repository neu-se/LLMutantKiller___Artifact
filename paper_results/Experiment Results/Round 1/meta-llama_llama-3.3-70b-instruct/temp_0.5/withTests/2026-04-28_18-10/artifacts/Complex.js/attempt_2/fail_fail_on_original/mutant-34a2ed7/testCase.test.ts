import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should throw an error when parsing a string with an invalid character', () => {
    expect(() => new Complex('1+2a')).toThrowError(SyntaxError);
  });
});