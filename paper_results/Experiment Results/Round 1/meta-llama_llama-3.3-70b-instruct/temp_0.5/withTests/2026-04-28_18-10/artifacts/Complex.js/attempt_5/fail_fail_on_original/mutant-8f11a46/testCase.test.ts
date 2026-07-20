import { Complex } from "./complex.js";

describe('Complex.js', () => {
  it('should throw an error when parsing an invalid string', () => {
    expect(() => new Complex('1+')).toThrowError(SyntaxError);
  });
});