import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should throw an error when parsing a null string', () => {
    expect(() => new Complex(null)).toThrowError(SyntaxError);
  });
});