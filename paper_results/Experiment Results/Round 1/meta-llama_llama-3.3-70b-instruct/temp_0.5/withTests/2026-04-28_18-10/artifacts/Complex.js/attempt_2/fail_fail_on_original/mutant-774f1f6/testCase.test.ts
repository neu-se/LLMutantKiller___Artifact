import { Complex } from "./complex.js";

describe('Complex.js', () => {
  it('should throw an error when trying to parse a complex number with an invalid format', () => {
    expect(() => new Complex({})).toThrow(SyntaxError);
  });
});