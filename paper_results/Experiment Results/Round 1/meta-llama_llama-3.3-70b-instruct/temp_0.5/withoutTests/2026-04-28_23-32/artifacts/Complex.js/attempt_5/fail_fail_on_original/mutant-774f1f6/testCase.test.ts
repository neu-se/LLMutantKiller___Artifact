import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should throw an error when an undefined first argument is provided', () => {
    expect(() => new Complex(undefined)).toThrowError(SyntaxError);
  });
});