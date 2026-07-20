import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should throw an error when parsing an invalid input', () => {
    expect(() => new Complex({})).toThrow(SyntaxError);
  });
});