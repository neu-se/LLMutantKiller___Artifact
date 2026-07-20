import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should throw an error when an empty object is provided as the first argument', () => {
    expect(() => new Complex({})).toThrowError(SyntaxError);
  });
});